import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize SQLite database
const db = new Database(join(__dirname, 'messages.db'));

// Create messages table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_hash TEXT,
    user_agent TEXT
  )
`);

// Middleware
app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:5174',
            process.env.FRONTEND_URL || 'http://localhost:5173'
        ];
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            // Check if it matches exactly or is in the list
            return callback(null, true); // For development, let's be permissive or we can be strict
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-password']
}));
app.use(express.json());
// Serve admin dashboard
app.get('/admin', (req, res) => {
    res.sendFile(join(__dirname, 'admin.html'));
});

// Root route for status checking
app.get('/', (req, res) => {
    res.json({
        status: 'online',
        message: 'Backend API is running properly',
        endpoints: {
            admin: '/admin',
            health: '/api/health',
            messages: '/api/messages'
        }
    });
});

// Simple hash function for IP (for rate limiting, not for identification)
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(36);
}

// Rate limiting check (max 5 messages per IP per hour)
function checkRateLimit(ipHash) {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const stmt = db.prepare('SELECT COUNT(*) as count FROM messages WHERE ip_hash = ? AND created_at > ?');
    const result = stmt.get(ipHash, oneHourAgo);
    return result.count < 5;
}

// Authentication Middleware
const authenticateAdmin = (req, res, next) => {
    const password = req.headers['x-admin-password'];
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
        console.error('ADMIN_PASSWORD is not set in .env');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    if (password === adminPassword) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Admin Login Check
app.post('/api/login', (req, res) => {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
        return res.status(500).json({ error: 'Server configuration error' });
    }

    if (password === adminPassword) {
        res.json({ success: true });
    } else {
        res.status(401).json({ error: 'Invalid password' });
    }
});

// Submit anonymous message
app.post('/api/messages', (req, res) => {
    try {
        const { message } = req.body;

        // Validation
        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Message is required' });
        }

        if (message.trim().length === 0) {
            return res.status(400).json({ error: 'Message cannot be empty' });
        }

        if (message.length > 1000) {
            return res.status(400).json({ error: 'Message is too long (max 1000 characters)' });
        }

        // Get IP and user agent for rate limiting (hashed for privacy)
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
        const ipHash = simpleHash(ip);
        const userAgent = req.headers['user-agent'] || 'unknown';

        // Check rate limit
        if (!checkRateLimit(ipHash)) {
            return res.status(429).json({ error: 'Too many messages. Please try again later.' });
        }

        // Insert message
        const stmt = db.prepare('INSERT INTO messages (message, ip_hash, user_agent) VALUES (?, ?, ?)');
        const result = stmt.run(message.trim(), ipHash, userAgent);

        res.status(201).json({
            success: true,
            message: 'Message received successfully',
            id: result.lastInsertRowid
        });

    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ error: 'Failed to save message' });
    }
});

// Get all messages (protected)
app.get('/api/messages', authenticateAdmin, (req, res) => {
    try {
        const stmt = db.prepare('SELECT id, message, created_at FROM messages ORDER BY created_at DESC LIMIT 100');
        const messages = stmt.all();
        res.json({ messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

// Get message count
app.get('/api/messages/count', (req, res) => {
    try {
        const stmt = db.prepare('SELECT COUNT(*) as count FROM messages');
        const result = stmt.get();
        res.json({ count: result.count });
    } catch (error) {
        console.error('Error counting messages:', error);
        res.status(500).json({ error: 'Failed to count messages' });
    }
});

// Delete a message (protected)
app.delete('/api/messages/:id', authenticateAdmin, (req, res) => {
    try {
        const { id } = req.params;
        const stmt = db.prepare('DELETE FROM messages WHERE id = ?');
        const result = stmt.run(id);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Message not found' });
        }

        res.json({ success: true, message: 'Message deleted' });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ error: 'Failed to delete message' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    console.log(`📊 Database: ${join(__dirname, 'messages.db')}`);
    console.log(`🌐 Accepting requests from: ${process.env.FRONTEND_URL}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close();
    console.log('\n👋 Server shutting down...');
    process.exit(0);
});

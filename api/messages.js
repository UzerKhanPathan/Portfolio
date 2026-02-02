import { sql } from '@vercel/postgres';

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
async function checkRateLimit(ipHash) {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const result = await sql`
        SELECT COUNT(*) as count 
        FROM messages 
        WHERE ip_hash = ${ipHash} 
        AND created_at > ${oneHourAgo}
    `;
    return result.rows[0].count < 5;
}

// Initialize database table if it doesn't exist
async function initDatabase() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS messages (
                id SERIAL PRIMARY KEY,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                ip_hash TEXT,
                user_agent TEXT
            )
        `;
    } catch (error) {
        console.error('Database initialization error:', error);
    }
}

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-password');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Initialize database
    await initDatabase();

    // POST - Submit anonymous message
    if (req.method === 'POST') {
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
            const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
            const ipHash = simpleHash(ip);
            const userAgent = req.headers['user-agent'] || 'unknown';

            // Check rate limit
            const canSend = await checkRateLimit(ipHash);
            if (!canSend) {
                return res.status(429).json({ error: 'Too many messages. Please try again later.' });
            }

            // Insert message
            const result = await sql`
                INSERT INTO messages (message, ip_hash, user_agent) 
                VALUES (${message.trim()}, ${ipHash}, ${userAgent})
                RETURNING id
            `;

            return res.status(201).json({
                success: true,
                message: 'Message received successfully',
                id: result.rows[0].id
            });

        } catch (error) {
            console.error('Error saving message:', error);
            // Return detailed error for debugging
            return res.status(500).json({
                error: `Save failed: ${error.message} (Code: ${error.code})`
            });
        }
    }

    // GET - Get all messages (protected)
    if (req.method === 'GET') {
        try {
            const password = req.headers['x-admin-password'];
            const adminPassword = process.env.ADMIN_PASSWORD;

            if (!adminPassword) {
                return res.status(500).json({ error: 'Server configuration error' });
            }

            if (password !== adminPassword) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const result = await sql`
                SELECT id, message, created_at 
                FROM messages 
                ORDER BY created_at DESC 
                LIMIT 100
            `;

            return res.json({ messages: result.rows });
        } catch (error) {
            console.error('Error fetching messages:', error);
            return res.status(500).json({ error: 'Failed to fetch messages' });
        }
    }

    // DELETE - Delete a message (protected)
    if (req.method === 'DELETE') {
        try {
            const password = req.headers['x-admin-password'];
            const adminPassword = process.env.ADMIN_PASSWORD;

            if (!adminPassword) {
                return res.status(500).json({ error: 'Server configuration error' });
            }

            if (password !== adminPassword) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const { id } = req.query;

            const result = await sql`
                DELETE FROM messages 
                WHERE id = ${id}
            `;

            if (result.rowCount === 0) {
                return res.status(404).json({ error: 'Message not found' });
            }

            return res.json({ success: true, message: 'Message deleted' });
        } catch (error) {
            console.error('Error deleting message:', error);
            return res.status(500).json({ error: 'Failed to delete message' });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}

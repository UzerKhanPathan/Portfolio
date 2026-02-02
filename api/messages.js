import clientPromise from './db.js';
import { ObjectId } from 'mongodb';

// Simple hash function for IP
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(36);
}

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-password');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        if (!clientPromise) {
            return res.status(503).json({ error: 'Database not configured' });
        }
        const client = await clientPromise;
        const db = client.db('portfolio');
        const collection = db.collection('messages');

        // POST - Submit message
        if (req.method === 'POST') {
            const { message } = req.body;

            if (!message || !message.trim()) {
                return res.status(400).json({ error: 'Message cannot be empty' });
            }

            // Rate limiting
            const ip = req.headers['x-forwarded-for'] || 'unknown';
            const ipHash = simpleHash(ip);
            const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

            const count = await collection.countDocuments({
                ip_hash: ipHash,
                created_at: { $gt: oneHourAgo }
            });

            if (count >= 5) {
                return res.status(429).json({ error: 'Too many messages. Please try again later.' });
            }

            const result = await collection.insertOne({
                message: message.trim(),
                ip_hash: ipHash,
                user_agent: req.headers['user-agent'],
                created_at: new Date()
            });

            return res.status(201).json({
                success: true,
                message: 'Message sent',
                id: result.insertedId
            });
        }

        // GET - List messages (Admin)
        if (req.method === 'GET') {
            const password = req.headers['x-admin-password'];
            if (password !== process.env.ADMIN_PASSWORD) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const messages = await collection
                .find({})
                .sort({ created_at: -1 })
                .limit(100)
                .toArray();

            return res.json({ messages });
        }

        // DELETE
        if (req.method === 'DELETE') {
            const password = req.headers['x-admin-password'];
            if (password !== process.env.ADMIN_PASSWORD) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const { id } = req.query;
            await collection.deleteOne({ _id: new ObjectId(id) });
            return res.json({ success: true, message: 'Deleted' });
        }

    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: 'Internal Server Error: ' + error.message });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}

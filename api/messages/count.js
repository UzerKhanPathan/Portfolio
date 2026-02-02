import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'GET') {
        try {
            const result = await sql`SELECT COUNT(*) as count FROM messages`;
            return res.json({ count: parseInt(result.rows[0].count) });
        } catch (error) {
            console.error('Error counting messages:', error);
            return res.status(500).json({ error: 'Failed to count messages' });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}

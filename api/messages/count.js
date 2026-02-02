import clientPromise from '../db';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const client = await clientPromise;
        const db = client.db('portfolio');
        const count = await db.collection('messages').countDocuments();

        return res.json({ count });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to count' });
    }
}

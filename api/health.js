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
        return res.json({
            status: 'ok',
            message: 'Server is running',
            timestamp: new Date().toISOString()
        });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}

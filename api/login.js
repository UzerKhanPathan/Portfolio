export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
        try {
            const { password } = req.body;
            const adminPassword = process.env.ADMIN_PASSWORD;

            if (!adminPassword) {
                return res.status(500).json({ error: 'Server configuration error' });
            }

            if (password === adminPassword) {
                return res.json({ success: true });
            } else {
                return res.status(401).json({ error: 'Invalid password' });
            }
        } catch (error) {
            console.error('Login error:', error);
            return res.status(500).json({ error: 'Login failed' });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}

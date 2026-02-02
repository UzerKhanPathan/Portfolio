import clientPromise from './db';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const diagnostics = {
        status: 'online',
        timestamp: new Date().toISOString(),
        env: {
            hasMongoUri: !!process.env.MONGODB_URI,
            nodeEnv: process.env.NODE_ENV
        },
        database: {
            status: 'unknown',
            latency: null
        }
    };

    try {
        const start = Date.now();
        const client = await clientPromise;
        await client.db('portfolio').command({ ping: 1 });
        diagnostics.database.status = 'connected';
        diagnostics.database.latency = `${Date.now() - start}ms`;

        return res.json(diagnostics);
    } catch (error) {
        console.error('Health Check Error:', error);
        diagnostics.database.status = 'failed';
        diagnostics.database.error = error.message;

        // Return 500 but with JSON details so we can see WHAT failed
        return res.status(500).json(diagnostics);
    }
}

// API Configuration for different environments

const config = {
    development: {
        apiUrl: 'http://localhost:3001/api'
    },
    production: {
        // Use relative URL for Vercel deployment (same domain)
        apiUrl: '/api'
    }
};

// Automatically use production or development config based on environment
export const API_URL = import.meta.env.PROD
    ? config.production.apiUrl
    : config.development.apiUrl;

export default config;

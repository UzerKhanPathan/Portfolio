import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is missing from environment variables');
    // We don't throw here to avoid crashing the whole function on import.
    // The connection will fail later which we can catch found.
}

const options = {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
};

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;

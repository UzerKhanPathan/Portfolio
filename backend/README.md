# Portfolio Backend - Anonymous Messaging

Simple Express.js backend for handling anonymous messages.

## Features

- ✅ Anonymous message storage
- ✅ SQLite database (no external DB needed)
- ✅ Rate limiting (5 messages per hour per IP)
- ✅ CORS enabled
- ✅ Message CRUD operations
- ✅ Privacy-focused (IP addresses are hashed)

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Start the server:
```bash
npm run dev
```

The server will run on `http://localhost:3001`

## API Endpoints

### POST /api/messages
Submit an anonymous message
```json
{
  "message": "Your anonymous message here"
}
```

### GET /api/messages
Get all messages (for admin view)

### GET /api/messages/count
Get total message count

### DELETE /api/messages/:id
Delete a specific message

## Environment Variables

- `PORT` - Server port (default: 3001)
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:5174)

## Database

Messages are stored in `messages.db` (SQLite) with the following schema:
- id (auto-increment)
- message (text)
- created_at (timestamp)
- ip_hash (hashed IP for rate limiting)
- user_agent (browser info)

## Security Notes

- IP addresses are hashed for privacy
- Rate limiting prevents spam
- Messages are stored locally
- Add authentication for admin endpoints in production

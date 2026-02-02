# 🚀 Portfolio Website

A modern, interactive portfolio website built with React, Vite, and Express.js featuring an anonymous messaging system.

## ✨ Features

- 🎨 Modern, responsive design with Tailwind CSS
- 💬 Anonymous messaging system
- 📊 Admin dashboard for message management
- 🔐 Secure authentication and rate limiting
- 🎭 Interactive UI components
- 📱 Mobile-friendly design

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Lucide React** - Icons

### Backend
- **Express.js** - Web server
- **SQLite** (better-sqlite3) - Database
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd Portfolio
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd backend
npm install
cd ..
```

4. **Configure environment variables**
```bash
cd backend
cp .env.example .env
# Edit .env and set your admin password
```

### Running the Application

**Option 1: Use the startup script (Recommended)**
```powershell
.\start-all.ps1
```

**Option 2: Manual start (requires two terminals)**

Terminal 1 - Backend:
```bash
cd backend
npm start
```

Terminal 2 - Frontend:
```bash
npm run dev
```

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Admin Dashboard**: http://localhost:3001/admin
- **Integration Test**: http://localhost:3001/test-integration.html

## 📁 Project Structure

```
Portfolio/
├── src/                      # Frontend source code
│   ├── components/          # React components
│   │   ├── AnonymousChat.jsx
│   │   ├── Layout.jsx
│   │   └── ...
│   ├── pages/              # Page components
│   └── App.jsx             # Main app component
├── backend/                 # Backend server
│   ├── server.js           # Express server
│   ├── admin.html          # Admin dashboard
│   ├── .env                # Environment variables
│   └── messages.db         # SQLite database
├── public/                  # Static assets
├── start-all.ps1           # Startup script
├── INTEGRATION_GUIDE.md    # Integration documentation
└── package.json            # Frontend dependencies
```

## 🔐 Admin Access

**Default Credentials:**
- URL: http://localhost:3001/admin
- Password: `1924` (change this in `backend/.env`)

**Admin Features:**
- View all anonymous messages
- Delete messages
- View statistics (total messages, today's messages)
- Auto-refresh every 30 seconds

## 📡 API Endpoints

### Public Endpoints
- `GET /` - Server status
- `GET /api/health` - Health check
- `GET /api/messages/count` - Get message count
- `POST /api/messages` - Submit anonymous message

### Protected Endpoints (Require Admin Password)
- `POST /api/login` - Admin login
- `GET /api/messages` - Get all messages
- `DELETE /api/messages/:id` - Delete a message

## 🔒 Security Features

- **Rate Limiting**: Max 5 messages per IP per hour
- **IP Hashing**: IP addresses are hashed for privacy
- **Admin Authentication**: Password-protected admin routes
- **Input Validation**: Message length and content validation
- **CORS Protection**: Only allowed origins can access the API

## 🧪 Testing

### Test the Integration
Open http://localhost:3001/test-integration.html to test:
- Backend health check
- Message submission
- Message count
- CORS configuration

### Manual API Testing
```bash
# Health check
curl http://localhost:3001/api/health

# Get message count
curl http://localhost:3001/api/messages/count

# Submit a message (PowerShell)
Invoke-WebRequest -Uri "http://localhost:3001/api/messages" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body '{"message":"Test message"}' `
  -UseBasicParsing
```

## 📝 Development

### Frontend Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend Development
```bash
cd backend
npm start            # Start server
npm run dev          # Start with auto-reload
```

## 🐛 Troubleshooting

See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for detailed troubleshooting steps.

Common issues:
- **Backend not running**: `cd backend && npm start`
- **Port already in use**: Kill the process or change the port in `.env`
- **CORS errors**: Check allowed origins in `backend/server.js`

## 📚 Documentation

- [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) - Comprehensive integration guide
- [INTEGRATION_STATUS.md](./INTEGRATION_STATUS.md) - Current integration status

## 👤 Author

**Uzerkhan Pathan**

## 📄 License

MIT

---

**Status**: ✅ Fully Integrated and Working
**Last Updated**: February 2, 2026

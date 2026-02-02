# 🔗 Backend-Frontend Integration Guide

## ✅ Current Status

Your portfolio application is now fully integrated with the backend!

### Running Services:
- **Frontend**: http://localhost:5173 (Vite React App)
- **Backend**: http://localhost:3001 (Express API Server)
- **Admin Dashboard**: http://localhost:3001/admin

---

## 🚀 How to Start Both Servers

### Option 1: Manual Start (Two Terminals)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Option 2: Quick Start Script

Create a file `start-all.ps1` in the root directory:
```powershell
# Start backend in background
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm start"

# Wait a moment for backend to start
Start-Sleep -Seconds 2

# Start frontend in current window
npm run dev
```

Then run:
```bash
.\start-all.ps1
```

---

## 📡 API Endpoints

### Public Endpoints:
- `GET /` - Server status
- `GET /api/health` - Health check
- `POST /api/messages` - Submit anonymous message
- `GET /api/messages/count` - Get message count

### Protected Endpoints (Require Admin Password):
- `POST /api/login` - Admin login
- `GET /api/messages` - Get all messages
- `DELETE /api/messages/:id` - Delete a message

---

## 🔐 Admin Access

**Admin Dashboard**: http://localhost:3001/admin
**Password**: `1924` (configured in `backend/.env`)

To change the admin password, edit `backend/.env`:
```env
ADMIN_PASSWORD=your_new_password
```

---

## 🧪 Testing the Integration

### 1. Test Backend Health:
```bash
curl http://localhost:3001/api/health
```

Expected response:
```json
{"status":"ok","message":"Server is running"}
```

### 2. Test Message Submission:
```bash
curl -X POST http://localhost:3001/api/messages \
  -H "Content-Type: application/json" \
  -d "{\"message\":\"Test message from API\"}"
```

### 3. Test Frontend:
1. Open http://localhost:5173
2. Navigate to the "Anonymous Message" section
3. Type a message and click "Send Anonymous Message"
4. You should see a success confirmation

### 4. View Messages in Admin:
1. Open http://localhost:3001/admin
2. Enter password: `1924`
3. You should see all submitted messages

---

## 🔧 Configuration Files

### Backend Configuration (`backend/.env`):
```env
PORT=3001
FRONTEND_URL=http://localhost:5173
ADMIN_PASSWORD=1924
```

### Frontend API Configuration:
The frontend connects to the backend at `http://localhost:3001/api/messages` (configured in `src/components/AnonymousChat.jsx` line 17)

---

## 🐛 Troubleshooting

### Issue: "Failed to send message"
**Solution**: Make sure the backend server is running on port 3001
```bash
cd backend
npm start
```

### Issue: "CORS Error"
**Solution**: The backend is configured to accept requests from `http://localhost:5173`. If your frontend runs on a different port, update `backend/server.js` line 34-36.

### Issue: "Connection Refused"
**Solution**: 
1. Check if backend is running: `netstat -ano | findstr :3001`
2. If not running, start it: `cd backend && npm start`

### Issue: Port Already in Use
**Solution**: 
```bash
# Find process using port 3001
netstat -ano | findstr :3001

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

---

## 📊 Database

Messages are stored in SQLite database: `backend/messages.db`

### View Database Contents:
```bash
cd backend
sqlite3 messages.db "SELECT * FROM messages;"
```

### Database Schema:
```sql
CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  ip_hash TEXT,
  user_agent TEXT
)
```

---

## 🔒 Security Features

1. **Rate Limiting**: Max 5 messages per IP per hour
2. **IP Hashing**: IP addresses are hashed for privacy
3. **Admin Authentication**: Protected admin routes
4. **Input Validation**: Message length and content validation
5. **CORS Protection**: Only allowed origins can access the API

---

## 📝 Development Tips

### Hot Reload:
- Frontend: Automatically reloads on file changes (Vite)
- Backend: Use `npm run dev` for auto-restart on changes

### Viewing Logs:
- Frontend: Check browser console (F12)
- Backend: Check terminal where `npm start` is running

### Adding New Features:
1. Add API endpoint in `backend/server.js`
2. Update frontend component to call the new endpoint
3. Test with curl or Postman first
4. Integrate into React component

---

## 🚢 Production Deployment

### Environment Variables:
Update `backend/.env` for production:
```env
PORT=3001
FRONTEND_URL=https://your-domain.com
ADMIN_PASSWORD=strong_password_here
```

### Build Frontend:
```bash
npm run build
```

### Start Backend in Production:
```bash
cd backend
NODE_ENV=production npm start
```

---

## 📞 Support

If you encounter any issues:
1. Check both servers are running
2. Verify environment variables in `backend/.env`
3. Check browser console for errors
4. Check backend terminal for error logs
5. Test API endpoints with curl

---

**Last Updated**: February 2, 2026
**Status**: ✅ Fully Integrated and Working

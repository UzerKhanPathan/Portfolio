# 🚀 Setup Guide for New Users

If you've just cloned this repository from GitHub, follow these steps to get the application running.

---

## 📋 Prerequisites

Make sure you have these installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional, for cloning)

Check your versions:
```bash
node --version
npm --version
```

---

## 🔧 Installation Steps

### Step 1: Clone the Repository (if you haven't already)

```bash
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio
```

### Step 2: Install Frontend Dependencies

```bash
npm install
```

This will install all the React and Vite dependencies.

### Step 3: Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

This will install Express, SQLite, and other backend dependencies.

### Step 4: Set Up Environment Variables

Create a `.env` file in the `backend` folder:

```bash
cd backend
copy .env.example .env
```

Or on Mac/Linux:
```bash
cp .env.example .env
```

Then edit `backend/.env` and set your admin password:
```env
PORT=3001
FRONTEND_URL=http://localhost:5173
ADMIN_PASSWORD=your_secure_password_here
```

**Important**: Choose a strong password for `ADMIN_PASSWORD`!

---

## 🚀 Running the Application

### Option 1: Use the Startup Script (Windows - Easiest)

Simply double-click: **`START_APP.bat`**

This will automatically:
- Start the backend server
- Start the frontend server
- Open your browser

### Option 2: Manual Start (All Platforms)

You need **TWO terminal windows**:

**Terminal 1 - Backend Server:**
```bash
cd backend
npm start
```

You should see:
```
🚀 Backend server running on http://localhost:3001
📊 Database: C:\...\backend\messages.db
🌐 Accepting requests from: http://localhost:5173
```

**Terminal 2 - Frontend Server:**
```bash
npm run dev
```

You should see:
```
VITE v7.3.1  ready in 356 ms
➜  Local:   http://localhost:5173/
```

### Option 3: PowerShell Script (Windows)

```powershell
.\START_APP.ps1
```

---

## 🌐 Access the Application

Once both servers are running:

- **Frontend (Portfolio)**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Admin Dashboard**: http://localhost:3001/admin
- **API Test Page**: http://localhost:3001/test-integration.html

---

## 🔐 Admin Access

- **URL**: http://localhost:3001/admin
- **Password**: Whatever you set in `backend/.env` (default: `1924` in the example)

---

## 🛑 Stopping the Application

Press `Ctrl + C` in each terminal window to stop the servers.

---

## 📁 Project Structure

```
portfolio/
├── src/                    # Frontend React code
│   ├── components/        # React components
│   ├── pages/            # Page components
│   └── App.jsx           # Main app
├── backend/               # Backend server
│   ├── server.js         # Express server
│   ├── admin.html        # Admin dashboard
│   ├── .env              # Environment variables (YOU CREATE THIS)
│   ├── .env.example      # Template for .env
│   └── package.json      # Backend dependencies
├── public/                # Static assets
├── package.json           # Frontend dependencies
└── START_APP.bat         # Quick start script
```

---

## 🐛 Troubleshooting

### Problem: "Cannot find module"
**Solution**: Make sure you installed dependencies:
```bash
npm install
cd backend && npm install
```

### Problem: "Port 3001 already in use"
**Solution**: Kill the process using that port:
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3001 | xargs kill -9
```

### Problem: "ENOENT: no such file or directory, open '.env'"
**Solution**: Create the `.env` file in the backend folder:
```bash
cd backend
copy .env.example .env
```
Then edit it with your admin password.

### Problem: Backend won't start
**Solution**: Check if you're in the right directory:
```bash
cd backend
npm start
```

### Problem: Frontend shows "Failed to send message"
**Solution**: Make sure the backend is running on port 3001:
```bash
cd backend
npm start
```

---

## 🧪 Testing the Setup

### Test 1: Backend Health Check
Open http://localhost:3001/api/health

You should see:
```json
{"status":"ok","message":"Server is running"}
```

### Test 2: Frontend
Open http://localhost:5173

You should see your portfolio website.

### Test 3: Send a Test Message
1. Go to http://localhost:5173
2. Scroll to "Anonymous Message" section
3. Type a message and click "Send"
4. You should see a success confirmation

### Test 4: Admin Dashboard
1. Go to http://localhost:3001/admin
2. Enter your admin password
3. You should see the test message you just sent

---

## 📝 Development

### Frontend Development
```bash
npm run dev          # Start dev server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend Development
```bash
cd backend
npm start            # Start server
npm run dev          # Start with auto-reload (if configured)
```

---

## 🔄 Updating the Code

When you pull new changes from GitHub:

```bash
git pull

# Reinstall dependencies if package.json changed
npm install
cd backend && npm install
```

---

## 📚 Additional Documentation

- **`README.md`** - Main project documentation
- **`INTEGRATION_GUIDE.md`** - Backend-frontend integration details
- **`GITHUB_INTEGRATION.md`** - How to push to GitHub
- **`QUICK_START.md`** - Quick reference guide

---

## ✅ Setup Checklist

- [ ] Node.js and npm installed
- [ ] Repository cloned
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Backend dependencies installed (`cd backend && npm install`)
- [ ] `.env` file created in `backend/` folder
- [ ] Admin password set in `backend/.env`
- [ ] Backend server started (`cd backend && npm start`)
- [ ] Frontend server started (`npm run dev`)
- [ ] Opened http://localhost:5173 in browser
- [ ] Tested sending a message
- [ ] Tested admin dashboard

---

## 🎉 You're All Set!

Your portfolio application should now be running!

**Frontend**: http://localhost:5173  
**Admin**: http://localhost:3001/admin

**Need help?** Check the troubleshooting section above or open an issue on GitHub.

---

**Happy coding!** 🚀

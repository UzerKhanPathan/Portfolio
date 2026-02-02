# 🚀 Quick Start Guide

## Starting the Application

### Option 1: Double-Click to Start (Easiest)
Simply double-click: **`START_APP.bat`**

This will:
- ✅ Start the backend server
- ✅ Start the frontend server  
- ✅ Open your browser automatically

### Option 2: Manual Start (Two Terminals)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

---

## Access Your Application

Once started, open these URLs:

- **Portfolio Website**: http://localhost:5173
- **Admin Dashboard**: http://localhost:3001/admin (Password: `1924`)
- **API Test Page**: http://localhost:3001/test-integration.html

---

## Stopping the Application

Press `Ctrl + C` in each terminal window, or simply close the terminal windows.

---

## GitHub Integration

Follow the steps in **`GITHUB_INTEGRATION.md`** to push your project to GitHub.

### Quick Commands:
```bash
# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Portfolio with anonymous messaging"

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Push to GitHub
git push -u origin main
```

---

## Important Files

- **`.env`** - Contains your admin password (NEVER commit this!)
- **`messages.db`** - Contains user messages (NEVER commit this!)
- **`.gitignore`** - Protects sensitive files from being uploaded

---

## Need Help?

- **Integration Guide**: See `INTEGRATION_GUIDE.md`
- **GitHub Guide**: See `GITHUB_INTEGRATION.md`
- **Status**: See `INTEGRATION_STATUS.md`

---

**Everything is ready to go!** 🎉

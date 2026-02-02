# 🚀 GitHub Integration Guide

This guide will help you push your Portfolio project to GitHub.

## 📋 Prerequisites

- GitHub account (create one at https://github.com if you don't have one)
- Git installed on your computer (check with `git --version`)
- Your project is ready to push

---

## 🔐 Step 1: Verify Sensitive Files are Protected

**IMPORTANT**: Before pushing to GitHub, ensure these files are in `.gitignore`:

✅ **Already Protected:**
- `.env` (contains admin password)
- `messages.db` (contains user messages)
- `node_modules/` (dependencies)
- `*.log` (log files)

The `.gitignore` file has been updated to protect all sensitive data.

---

## 🌐 Step 2: Create a New GitHub Repository

1. Go to https://github.com/new
2. Fill in the details:
   - **Repository name**: `portfolio` (or any name you prefer)
   - **Description**: "Modern portfolio website with anonymous messaging system"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
3. Click **"Create repository"**

---

## 💻 Step 3: Configure Git (First Time Only)

If you haven't configured Git before, run these commands:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Replace with your actual name and email (use the same email as your GitHub account).

---

## 📦 Step 4: Prepare Your Repository

Open a terminal in your Portfolio directory and run:

```bash
# Check current status
git status

# Add all files (respecting .gitignore)
git add .

# Commit your changes
git commit -m "Initial commit: Portfolio with anonymous messaging system"
```

---

## 🔗 Step 5: Connect to GitHub

After creating your GitHub repository, you'll see commands like these. Run them:

```bash
# Add GitHub as remote origin (replace with YOUR repository URL)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Verify the remote was added
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

---

## 🎉 Step 6: Verify Upload

1. Go to your GitHub repository: `https://github.com/YOUR_USERNAME/portfolio`
2. You should see all your files
3. **Verify these files are NOT there** (they should be ignored):
   - ❌ `.env`
   - ❌ `messages.db`
   - ❌ `node_modules/`

---

## 📝 Step 7: Create GitHub Secrets (For Deployment)

If you plan to deploy your app, you'll need to set up secrets:

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add these secrets:
   - `ADMIN_PASSWORD`: Your admin password (from `.env`)
   - `PORT`: `3001`
   - `FRONTEND_URL`: Your deployed frontend URL

---

## 🚀 Future Updates

After making changes to your code, push updates with:

```bash
# Check what changed
git status

# Add changed files
git add .

# Commit with a descriptive message
git commit -m "Description of your changes"

# Push to GitHub
git push
```

---

## 📋 Common Git Commands

```bash
# Check status
git status

# View commit history
git log --oneline

# View remote repositories
git remote -v

# Pull latest changes (if working with others)
git pull

# Create a new branch
git checkout -b feature-name

# Switch branches
git checkout main

# Merge a branch
git merge feature-name
```

---

## 🔒 Security Checklist

Before pushing to GitHub, verify:

- ✅ `.env` is in `.gitignore`
- ✅ `messages.db` is in `.gitignore`
- ✅ No passwords in code
- ✅ No API keys in code
- ✅ `.env.example` exists (without actual secrets)

---

## 📁 What Will Be Pushed to GitHub

### ✅ Files that WILL be pushed:
- Source code (`src/`, `backend/server.js`)
- Configuration files (`package.json`, `vite.config.js`)
- Documentation (`README.md`, guides)
- `.env.example` (template without secrets)
- `.gitignore` (tells Git what to ignore)
- Public assets (`public/`)

### ❌ Files that will NOT be pushed (protected):
- `.env` (contains secrets)
- `messages.db` (contains user data)
- `node_modules/` (dependencies - too large)
- Build outputs (`dist/`)
- Log files

---

## 🌟 Optional: Add a GitHub README Badge

After pushing, you can add badges to your README:

```markdown
![GitHub repo size](https://img.shields.io/github/repo-size/YOUR_USERNAME/portfolio)
![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/portfolio?style=social)
![GitHub forks](https://img.shields.io/github/forks/YOUR_USERNAME/portfolio?style=social)
```

---

## 🐛 Troubleshooting

### Problem: "fatal: remote origin already exists"
**Solution:**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
```

### Problem: "Permission denied (publickey)"
**Solution:** Use HTTPS instead of SSH, or set up SSH keys:
```bash
# Use HTTPS URL instead
git remote set-url origin https://github.com/YOUR_USERNAME/portfolio.git
```

### Problem: "Updates were rejected"
**Solution:**
```bash
git pull origin main --rebase
git push origin main
```

### Problem: Accidentally committed `.env`
**Solution:**
```bash
# Remove from Git but keep locally
git rm --cached backend/.env
git commit -m "Remove .env from tracking"
git push

# Then add to .gitignore if not already there
```

---

## 📞 Quick Reference

**Repository URL Format:**
```
https://github.com/YOUR_USERNAME/portfolio.git
```

**Basic Workflow:**
```bash
git add .
git commit -m "Your message"
git push
```

**Check what will be committed:**
```bash
git status
git diff
```

---

## 🎯 Next Steps After Pushing

1. ✅ Verify files on GitHub
2. ✅ Add a nice README with screenshots
3. ✅ Set up GitHub Pages (for frontend deployment)
4. ✅ Add topics/tags to your repository
5. ✅ Consider setting up GitHub Actions for CI/CD

---

## 📚 Additional Resources

- [GitHub Docs](https://docs.github.com)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [GitHub Desktop](https://desktop.github.com) - GUI alternative to command line

---

**Ready to push?** Follow the steps above and your portfolio will be on GitHub! 🚀

**Questions?** Check the troubleshooting section or refer to GitHub's documentation.

# Anonymous Chat Setup Instructions

Your anonymous chat system has been upgraded to work with Vercel's Serverless infrastructure!

## 🚀 Critical Next Steps

To make the chat system work, you need to set up the database on Vercel:

1. **Go to your Vercel Dashboard**
   - Navigate to your deployed project.
   - Click on the **Storage** tab.
   - Click **Create Database** and select **Vercel Postgres** (it's free).
   - Accept the terms and click **Create**.

2. **Connect the Database**
   - Once created, click **Connect Project** within the database view to link it to your portfolio project.
   - This will automatically add environment variables like `POSTGRES_URL` to your project.

3. **Set the Admin Password**
   - Go to your project's **Settings** > **Environment Variables**.
   - Add a new variable:
     - **Key**: `ADMIN_PASSWORD`
     - **Value**: (Choose a strong password)
   - This password will be used to access `your-site.vercel.app/admin`.

4. **Deploy**
   - Push these changes to GitHub. Vercel will strict a new deployment.
   - The database tables will be created automatically the first time an API request is made.

## 🛠️ Local Development

To run the project locally with the full API support:

1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Link project: `vercel link`
4. Pull env vars: `vercel env pull .env.local`
5. Run: `vercel dev`

This will start both your React frontend and the serverless APIs locally.

## 🔑 Accessing Messages

Once deployed, visit `/admin` on your website (e.g., `https://your-portfolio.vercel.app/admin`) and enter the password you set in step 3.

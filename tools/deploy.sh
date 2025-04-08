#!/bin/bash

cd /var/www/resume-webserver || exit 1

echo "📦 Stashing local changes (if any)..."
git stash save "Auto-stash before pulling latest from GitHub"

echo "🔄 Pulling latest changes from GitHub (rebase)..."
git pull origin master --rebase || {
  echo "❌ Git pull failed. Resolve issues manually."
  exit 1
}

echo "📤 Reapplying local changes (if any)..."
git stash pop || echo "✅ No stashed changes to apply."

echo "📦 Installing updated dependencies..."
npm install --omit=dev

echo "🚀 Restarting PM2 process..."
pm2 restart resume-website

echo "🌐 Restarting Nginx..."
sudo systemctl restart nginx

echo "📖 Tailing logs..."
pm2 logs resume-website


# Deployment Guide - Digital Rift Luau Obfuscator

This guide provides step-by-step instructions for deploying the Digital Rift Luau Obfuscator to various hosting platforms.

## 📋 Prerequisites

- Git installed on your computer
- A GitHub account (for GitHub Pages and some other platforms)
- Basic terminal/command line knowledge

---

## 🌐 Deployment Options

### Option 1: GitHub Pages (Recommended - Free)

GitHub Pages is the easiest and most popular option for hosting static websites.

#### Steps:

1. **Create a GitHub Repository**
   ```bash
   cd /path/to/mido-obfuscator
   git init
   git add .
   git commit -m "Initial commit - Digital Rift Obfuscator"
   ```

2. **Push to GitHub**
   ```bash
   # Create a new repository on GitHub first
   git remote add origin https://github.com/yourusername/mido-obfuscator.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **main** branch and **/ (root)** folder
   - Click **Save**
   - Your site will be available at: `https://yourusername.github.io/mido-obfuscator/`

4. **Access Your Site**
   - Wait 1-2 minutes for deployment
   - Visit: `https://yourusername.github.io/mido-obfuscator/`

---

### Option 2: Netlify (Free with Advanced Features)

Netlify offers continuous deployment, custom domains, and more advanced features.

#### Steps:

1. **Sign up at [Netlify](https://www.netlify.com/)**

2. **Deploy via Drag & Drop**
   - Go to [Netlify Drop](https://app.netlify.com/drop)
   - Drag the entire `mido-obfuscator` folder
   - Get instant deployment URL (e.g., `random-name-123.netlify.app`)

3. **Deploy via Git (Recommended for Updates)**
   - Push your code to GitHub (see Option 1, steps 1-2)
   - Click "New site from Git" on Netlify dashboard
   - Connect your GitHub repository
   - Select your repository
   - Click "Deploy site"
   - Automatic deployments on every git push!

4. **Custom Domain (Optional)**
   - Go to **Site settings** → **Domain management**
   - Add your custom domain
   - Follow DNS configuration instructions

---

### Option 3: Vercel (Free with Fast CDN)

Vercel provides lightning-fast global CDN and automatic HTTPS.

#### Steps:

1. **Sign up at [Vercel](https://vercel.com/)**

2. **Install Vercel CLI (Optional)**
   ```bash
   npm install -g vercel
   ```

3. **Deploy via CLI**
   ```bash
   cd /path/to/mido-obfuscator
   vercel
   # Follow the prompts
   ```

4. **Deploy via GitHub**
   - Push code to GitHub
   - Import project from Vercel dashboard
   - Select repository
   - Click "Deploy"
   - Get instant URL (e.g., `mido-obfuscator.vercel.app`)

---

### Option 4: Cloudflare Pages (Free with Global CDN)

Cloudflare Pages offers unlimited bandwidth and excellent performance.

#### Steps:

1. **Sign up at [Cloudflare Pages](https://pages.cloudflare.com/)**

2. **Connect Git Repository**
   - Click "Create a project"
   - Connect your GitHub account
   - Select `mido-obfuscator` repository
   - Click "Begin setup"

3. **Configure Build Settings**
   - **Framework preset**: None (static site)
   - **Build command**: (leave empty)
   - **Build output directory**: `/`
   - Click "Save and Deploy"

4. **Access Your Site**
   - Get URL: `mido-obfuscator.pages.dev`
   - Add custom domain in settings if needed

---

### Option 5: Render (Free Tier Available)

#### Steps:

1. **Sign up at [Render](https://render.com/)**

2. **Create New Static Site**
   - Click "New" → "Static Site"
   - Connect your GitHub repository
   - Configure:
     - **Name**: mido-obfuscator
     - **Build Command**: (leave empty)
     - **Publish Directory**: `.`
   - Click "Create Static Site"

3. **Access Site**
   - Get URL: `mido-obfuscator.onrender.com`

---

## 🔧 Configuration

### Custom Domain Setup

Most platforms support custom domains. General steps:

1. **Purchase a domain** (from Namecheap, GoDaddy, Cloudflare, etc.)

2. **Add DNS Records** (example for `obfuscator.yourdomain.com`):
   ```
   Type: CNAME
   Name: obfuscator
   Value: [platform-provided-url]
   ```

3. **Verify in platform settings**
   - Each platform has a "Custom Domain" section
   - Add your domain and wait for DNS propagation (up to 48 hours)

### HTTPS/SSL

All recommended platforms provide **free automatic HTTPS** via Let's Encrypt. No configuration needed!

---

## 🚀 Performance Optimization

### Pre-deployment Checklist

- ✅ All file paths use relative paths (not absolute)
- ✅ No hardcoded localhost URLs
- ✅ Images optimized (if any added)
- ✅ CSS/JS files organized in `/assets` directory
- ✅ Tested locally in multiple browsers

### Optional Optimizations

1. **Enable Caching Headers**
   - Most platforms auto-configure this
   - For custom servers, set cache headers for static assets

2. **CDN Configuration**
   - Netlify, Vercel, Cloudflare automatically use CDN
   - No additional configuration needed

3. **Compression**
   - Modern platforms automatically enable Gzip/Brotli compression

---

## 🧪 Testing Deployment

After deployment, verify:

1. ✅ **Homepage loads correctly**
2. ✅ **All animations work** (particles, rift effects)
3. ✅ **Obfuscation works** (test with sample code)
4. ✅ **Copy/Download buttons work**
5. ✅ **No console errors** (check browser DevTools)
6. ✅ **Mobile responsive** (test on phone/tablet)

### Common Issues

| Issue | Solution |
|-------|----------|
| **404 errors for CSS/JS** | Check file paths in `index.html` are relative |
| **Animations not working** | Verify all `.js` files loaded (check Network tab) |
| **Blank page** | Check browser console for errors |
| **Mixed content errors** | Ensure all resources use HTTPS |

---

## 📱 Mobile Optimization

The site is already mobile-responsive, but you can further optimize:

1. **Add Web App Manifest** (for "Add to Home Screen")
2. **Add Service Worker** (for offline support)
3. **Optimize touch interactions** (already implemented)

---

## 🔄 Updating Your Deployment

### GitHub Pages / Netlify / Vercel / Cloudflare

With Git-based deployment, updates are automatic:

```bash
# Make changes to your code
git add .
git commit -m "Update obfuscator features"
git push

# Your site automatically rebuilds and deploys!
```

### Manual Deployments

For drag-and-drop deployments:
1. Make local changes
2. Delete old deployment
3. Drag new folder to platform

---

## 🛡️ Security Best Practices

1. **Use HTTPS** - All platforms provide this by default
2. **Keep dependencies updated** - Though this project has no external dependencies
3. **Monitor for vulnerabilities** - Enable GitHub Dependabot alerts
4. **Add security headers** - Some platforms allow custom headers

---

## 📊 Analytics (Optional)

To track visitors, add one of these:

1. **Google Analytics**
   ```html
   <!-- Add before closing </head> in index.html -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   ```

2. **Cloudflare Web Analytics** (Privacy-friendly)
3. **Plausible Analytics** (Open source)

---

## 💰 Cost Comparison

| Platform | Free Tier | Bandwidth | Custom Domain | Build Minutes |
|----------|-----------|-----------|---------------|---------------|
| **GitHub Pages** | ✅ Yes | 100GB/month | ✅ Free | Unlimited |
| **Netlify** | ✅ Yes | 100GB/month | ✅ Free | 300 min/month |
| **Vercel** | ✅ Yes | 100GB/month | ✅ Free | 6000 min/month |
| **Cloudflare Pages** | ✅ Yes | Unlimited | ✅ Free | 500 builds/month |
| **Render** | ✅ Yes | 100GB/month | ✅ Free | Limited |

All options are **completely free** for this project!

---

## 🆘 Support

If you encounter issues:

1. Check [Common Issues](#common-issues) section
2. Review platform-specific documentation
3. Check browser console for errors
4. Verify all files are in correct directories

---

## 🎉 Success!

Once deployed, share your obfuscator:
- Tweet about it
- Share on Discord/Reddit
- Add to your portfolio
- Help other developers protect their code!

---

**Happy Deploying! ⚡**

[← Back to README](../README.md)

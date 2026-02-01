# Agegator MVP - Deployment Guide

## ☁️ Deploy to Vercel (Recommended)

Vercel is the best platform for Next.js apps - deploys in under 5 minutes.

### Step 1: Prepare Code

```bash
# Initialize git if not done
git init
git add .
git commit -m "Initial Agegator MVP"

# Create GitHub repo
# Then push:
git remote add origin https://github.com/YOUR_USERNAME/agegator.git
git branch -M main
git push -u origin main
```

### Step 2: Create Vercel Account

Go to https://vercel.com and sign up (free tier works for MVP)

### Step 3: Import Project

1. Click "Add New..." → "Project"
2. Select "Import Git Repository"
3. Paste your GitHub repo URL
4. Click "Continue"

### Step 4: Set Environment Variables

Before deploying, add these environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Where to find these:**
1. Go to Supabase dashboard
2. Click your project
3. Go to Settings → API
4. Copy the keys

### Step 5: Deploy

Click the "Deploy" button and wait 2-3 minutes.

**Your app is now live!** 🎉

Access it at: `https://YOUR_PROJECT_NAME.vercel.app`

---

## 🌐 Custom Domain (Optional)

1. In Vercel project settings
2. Go to "Domains"
3. Add your custom domain
4. Follow DNS instructions
5. Takes 5-30 minutes to propagate

---

## 📊 Production Checklist

Before launching to the public:

### Security
- [ ] Privacy policy live on your site
- [ ] Terms of service live on your site
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Environment variables set correctly
- [ ] Database backups enabled (Supabase: Settings → Backups)

### Data
- [ ] Test database with production data
- [ ] Run seed.sql in production database
- [ ] Create first admin account
- [ ] Test entire signup flow
- [ ] Test search filters
- [ ] Test profile creation

### Performance
- [ ] Test search response time (<2s)
- [ ] Test on mobile devices
- [ ] Test on slow network (DevTools → Throttle)
- [ ] Check Core Web Vitals (Vercel Analytics)

### Legal
- [ ] Age verification (13+)
- [ ] Content moderation policy
- [ ] User data deletion policy
- [ ] GDPR/CCPA compliance

---

## 🔧 Post-Deployment Setup

### 1. Enable Analytics
In Vercel dashboard:
- Click your project
- Go to Analytics
- Turn on Web Analytics

### 2. Set Up Monitoring
```bash
# Install Sentry (optional, but recommended)
npm install @sentry/nextjs
```

### 3. Monitor Database
Supabase automatically monitors:
- Query performance
- Database size
- Replication lag
- Check: Dashboard → Monitoring

### 4. Set Up Backups
Supabase automatic backups (free tier):
- Daily backups
- 7 days retention
- Check: Settings → Backups

---

## 🚀 Production Tips

### 1. Monitor Errors
Check Vercel & Supabase logs daily:
- **Vercel:** Project → Deployments → Logs
- **Supabase:** Logs tab

### 2. Track Search Performance
Add analytics to search:
```typescript
// In search/page.tsx
useEffect(() => {
  const startTime = Date.now()
  fetchAthletes(1).then(() => {
    const duration = Date.now() - startTime
    console.log(`Search took ${duration}ms`)
  })
}, [filters])
```

### 3. Database Optimization
Monitor these metrics:
- Query count per day
- Connections active
- Database size
- Slow queries (>200ms)

### 4. Daily Tasks
- [ ] Check error logs
- [ ] Verify new profiles (admin)
- [ ] Respond to support emails
- [ ] Monitor database size

---

## 🔒 Security Checklist

### Before Launch
- [ ] Supabase RLS policies enabled
- [ ] Email verification required on signup
- [ ] Rate limiting on auth endpoints
- [ ] CORS configured (Supabase does this)
- [ ] SQL injection prevented (Supabase handles)

### After Launch
- [ ] Monitor for suspicious activity
- [ ] Review new athlete profiles daily
- [ ] Check for spam accounts
- [ ] Monitor for data leaks
- [ ] Update dependencies monthly

---

## 📈 Scaling Strategies

### When you hit 100 profiles
- Monitor database response times
- Check Supabase metrics
- Keep indexes healthy

### When you hit 1,000 profiles
- Add caching layer (Redis)
- Consider read replicas
- Archive old data

### When you hit 10,000 profiles
- Split by region/city
- Full-text search optimization
- Consider CDN for assets

**Supabase handles up to 100K profiles easily.**

---

## 🆘 Troubleshooting Deployment

### Issue: Environment variables not working
```
Error: NEXT_PUBLIC_SUPABASE_URL is undefined
```
**Solution:**
1. Redeploy after setting env vars
2. Check they have NEXT_PUBLIC_ prefix
3. Clear browser cache (Ctrl+Shift+Del)

### Issue: Database connection timeout
```
Error: connect ECONNREFUSED
```
**Solution:**
1. Check Supabase is running (Status page)
2. Verify database credentials
3. Check network access (Supabase allows all IPs by default)

### Issue: Search returns no results
**Solution:**
1. Run seed.sql in production database
2. Check filters aren't too restrictive
3. Verify sport names match exactly

### Issue: Admin dashboard shows "Access Denied"
**Solution:**
```sql
-- In Supabase SQL Editor:
UPDATE public.users SET role = 'admin' WHERE email = 'your@email.com';
```

### Issue: Slow search queries
**Solution:**
1. Check indexes exist:
```sql
SELECT * FROM pg_indexes WHERE tablename = 'athlete_profiles';
```
2. Check query performance:
```sql
EXPLAIN ANALYZE SELECT * FROM athlete_profiles WHERE city ILIKE 'NYC%' LIMIT 20;
```

---

## 📊 Monitoring Dashboards

### Vercel
```
https://vercel.com/your-username/agegator/analytics
```
Monitor: pageviews, response times, edge requests

### Supabase
```
https://supabase.com → Your Project → Monitoring
```
Monitor: database size, connections, query count

---

## 💾 Backup Strategy

### Automatic (Supabase does this)
- Daily backups, 7-day retention
- Point-in-time recovery available

### Manual (Do weekly)
```sql
-- Export athlete data
SELECT * FROM athlete_profiles 
INTO OUTFILE '/tmp/athletes_backup.csv'
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n';
```

---

## 🎯 Growth Metrics to Track

After launch, monitor:

1. **Signup Rate**
   - Athletes/day
   - Scouts/day
   - Total users

2. **Engagement**
   - Profiles searched/day
   - Average filters used
   - Profile views

3. **Verification**
   - Profiles submitted
   - Profiles verified
   - Verification time

4. **Technical**
   - Search response time
   - Error rate
   - Database size

---

## 📞 Getting Help

### Vercel Support
- https://vercel.com/support
- Email: support@vercel.com

### Supabase Support
- https://supabase.com/docs
- Discord: https://discord.supabase.com

### Next.js Help
- https://nextjs.org/docs
- GitHub: https://github.com/vercel/next.js/discussions

---

## ✅ Final Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables set
- [ ] Database deployed & tested
- [ ] First admin account created
- [ ] Search filters tested
- [ ] Profile creation tested
- [ ] Mobile responsive checked
- [ ] Privacy policy & ToS live
- [ ] Email confirmation working
- [ ] Analytics enabled
- [ ] Domain configured (if using custom)
- [ ] SSL certificate active
- [ ] Backups enabled

---

## 🎉 You're Live!

Your Agegator MVP is now **live in production**!

**Share with:** friends, athletes, coaches, scouts

**Track:** signups, searches, profiles created

**Monitor:** errors, performance, database

**Iterate:** based on user feedback

Good luck! 🚀

---

**Agegator MVP - Built for discovering athletic talent in 2026.**

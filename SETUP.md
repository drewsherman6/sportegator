# Agegator MVP - Setup & Deployment Guide

## 🚀 Quick Start (15 minutes)

### Prerequisites
- Node.js 18+
- npm or yarn
- A Supabase account (free tier works)
- A Vercel account (for hosting)

### Step 1: Create Supabase Project
1. Go to https://supabase.com
2. Click "New Project"
3. Fill in project details, create database
4. Copy your **Project URL** and **Anon Key** (from Settings → API)
5. Copy your **Service Role Key** (also in Settings → API)

### Step 2: Set Up Database
1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Paste contents of `database.sql`
4. Click **Run**
5. For test data, paste contents of `seed.sql` and run (optional)

### Step 3: Clone & Setup Project
```bash
# Clone the project
git clone <your-repo>
cd agegator

# Install dependencies
npm install

# Create .env.local file
cp .env.local.example .env.local

# Edit .env.local with your Supabase credentials:
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
# SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Step 4: Run Locally
```bash
npm run dev
```
Visit http://localhost:3000

### Step 5: Create Admin Account
1. Sign up as a Scout at http://localhost:3000/signup
2. In Supabase SQL Editor, run:
```sql
UPDATE public.users SET role = 'admin' WHERE email = 'your-email@example.com';
```
3. Visit http://localhost:3000/admin/dashboard

---

## 📦 Deployment to Vercel

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial Agegator MVP"
git remote add origin https://github.com/your-username/agegator.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Import your GitHub repo
4. Set environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Click "Deploy"

### Done! 🎉
Your app is live at `https://your-project.vercel.app`

---

## 📋 File Structure

```
agegator/
├── src/
│  ├── app/
│  │  ├── page.tsx                 # Homepage
│  │  ├── login/page.tsx           # Login page
│  │  ├── signup/page.tsx          # Signup page
│  │  ├── search/page.tsx          # Search & filter page
│  │  ├── athlete/[id]/page.tsx    # Athlete profile page
│  │  ├── dashboard/
│  │  │  └── profile/new/page.tsx  # Create athlete profile
│  │  ├── admin/
│  │  │  └── dashboard/page.tsx    # Admin verification
│  │  ├── api/
│  │  │  └── athletes/route.ts     # Search API
│  │  └── layout.tsx & globals.css
│  ├── components/
│  │  ├── Header.tsx               # Navigation header
│  │  └── AthleteCard.tsx          # Athlete card component
│  └── lib/
│     ├── supabase.ts              # Supabase client
│     └── constants.ts             # Sports, levels, positions
├── database.sql                   # Database schema
├── seed.sql                       # Test data
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

---

## 🔑 Key Features Implemented

✅ **User Authentication**
- Email/password signup & login
- User roles: athlete, scout, admin

✅ **Athlete Profiles**
- Create/edit profile with all sports (high school & college)
- Profile photo & highlights link
- Contact visibility controls

✅ **Search & Filters**
- Filter by city, sport, age, position, level
- Sort by age or newest
- Pagination (20 results/page)

✅ **Public Profiles**
- Verified badge
- Contact info visibility control
- Athlete bio and highlights

✅ **Admin Dashboard**
- View all athletes
- Toggle verification status
- Stats dashboard

---

## 🏃 High School Sports (17 total)

1. American Football
2. Baseball
3. Basketball
4. Cross Country
5. Field Hockey
6. Golf
7. Ice Hockey
8. Lacrosse
9. Soccer
10. Softball
11. Swimming & Diving
12. Tennis
13. Track & Field
14. Volleyball
15. Water Polo
16. Wrestling
17. Cheerleading

---

## 🎓 College Sports (24 total)

All high school sports PLUS:
- Bowling
- Gymnastics
- Rowing
- Rugby
- Equestrian
- Skiing
- Snowboarding
- Beach Volleyball
- Badminton
- Squash
- Handball

---

## 🔐 Row Level Security

All data is protected by Supabase RLS policies:
- Athlete profiles are public (read-only)
- Only athletes can create/edit own profiles
- Only admins can toggle verification
- Users can only see their own user record

---

## 📊 Database Schema

### users table
- `id` (UUID, PK)
- `email` (text, unique)
- `role` (athlete|scout|admin)
- `created_at`, `updated_at`

### athlete_profiles table
- `id` (UUID, PK)
- `user_id` (FK to users)
- `name`, `age`, `city`, `country`
- `sport`, `position`, `level`
- `height`, `weight`, `graduation_year`
- `highlights_url`, `photo_url`
- `is_verified` (boolean)
- `contact_email_visible`, `contact_phone_visible`
- `phone`, `bio`
- `created_at`, `updated_at`

**Indexes:**
- city, sport, level, age (for fast filtering)
- Composite: city+sport, city+level

---

## 🚀 Next Features (Post-MVP)

1. **Photo Upload**
   - Integration with Supabase Storage
   - Image optimization & CDN

2. **Email Notifications**
   - When profile is verified
   - Weekly highlight digest

3. **Messaging System**
   - In-app messaging between scouts and athletes
   - Email forwarding for privacy

4. **Analytics**
   - Profile view counts
   - Search analytics
   - City-by-city performance

5. **Mobile App**
   - React Native version
   - Push notifications

6. **Monetization**
   - Premium scout plans ($29/mo)
   - Priority verification for athletes
   - Sponsor listings

---

## ⚖️ Legal & Privacy (IMPORTANT)

### Before Launch:
1. **Create Privacy Policy**
   - How user data is used
   - GDPR/CCPA compliance

2. **Create Terms of Service**
   - Age verification (must be 13+)
   - Prohibited content
   - User responsibilities

3. **Moderation Policy**
   - How profiles are reviewed
   - Reporting process
   - Appeal process

4. **Contact Verification**
   - Consider verifying emails before display
   - Optional SMS verification for athletes

### Risk Mitigation:
- Age verification on signup (ask for DOB)
- Email verification required
- Manual admin review of first profile
- Flag accounts <13 years old
- DMCA notice system for disputed content

---

## 💰 Monetization Ideas

### Scout/Coach Plans
- **Free**: Search 5 athletes/month
- **Pro** ($29/mo): Unlimited search, export lists, messaging
- **Team** ($99/mo): Multiple users, team analytics

### Athlete Features (Freemium)
- **Free**: Create profile, basic info
- **Premium** ($4.99/mo): Photo gallery, video highlights embed, priority verification

### Team Sponsorships
- Feature logos on search results
- "Promoted" athlete listings

---

## 📞 Support & Issues

### Common Issues:

**"Supabase connection failed"**
- Check .env.local has correct URL and keys
- Verify NEXT_PUBLIC_ prefix on client vars

**"Row Level Security error"**
- Ensure you're logged in
- Check your user record exists in users table
- Verify RLS policies are enabled

**"Search returns no results"**
- Check filters aren't too restrictive
- Verify test data was seeded
- Check spelling of sport/city

---

## 🎯 Success Metrics (Launch)

- [ ] 100+ athlete profiles created
- [ ] 50+ scouts registered
- [ ] 10 cities represented
- [ ] 0 critical bugs reported
- [ ] <2s search response time
- [ ] Mobile fully responsive

---

## 📚 Resources

- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Vercel: https://vercel.com/docs

---

**Built with ❤️ for discovering athletic talent.**

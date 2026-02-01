# Agegator 🏃

**Find and recruit the best athletes in your city.**

A clean, fast MVP for discovering athlete talent by city and sport. Built for scouts, coaches, and recruiters to find their next prospect.

## ✨ Features

- 🔍 **Search Athletes** by city, sport, age, position, and level
- 👤 **Athlete Profiles** with verified badge, stats, and highlights
- 🎯 **Smart Filters** for high school, college, academy, and semi-pro levels
- ✓ **Verified Profiles** with admin verification system
- 🔐 **Privacy Controls** for athletes to manage contact visibility
- 📱 **Mobile-Friendly** UI built with Tailwind CSS
- ⚡ **Fast Performance** with PostgreSQL indexing and Next.js SSR

## 🚀 Quick Start

See [SETUP.md](./SETUP.md) for detailed setup instructions.

**Shortest path to running locally:**

```bash
# 1. Clone repo
git clone <repo> && cd agegator

# 2. Install & setup env
npm install
cp .env.local.example .env.local
# Add your Supabase credentials to .env.local

# 3. Run database setup in Supabase SQL Editor
# Paste contents of database.sql

# 4. Start dev server
npm run dev
```

Visit http://localhost:3000

## 📊 Sports Included

### High School (17)
American Football, Baseball, Basketball, Cross Country, Field Hockey, Golf, Ice Hockey, Lacrosse, Soccer, Softball, Swimming & Diving, Tennis, Track & Field, Volleyball, Water Polo, Wrestling, Cheerleading

### College (24)
All high school sports + Bowling, Gymnastics, Rowing, Rugby, Equestrian, Skiing, Snowboarding, Beach Volleyball, Badminton, Squash, Handball

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14, React, TypeScript, Tailwind CSS |
| **Backend** | Supabase (PostgreSQL + Auth) |
| **Hosting** | Vercel |
| **Database** | PostgreSQL with Row Level Security |

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│  ├── page.tsx                   # Homepage
│  ├── login/page.tsx             # Login
│  ├── signup/page.tsx            # Signup
│  ├── search/page.tsx            # Search & filter
│  ├── athlete/[id]/page.tsx      # Public profile
│  ├── dashboard/profile/new/page.tsx  # Create profile
│  └── admin/dashboard/page.tsx   # Admin dashboard
├── api/
│  └── athletes/route.ts          # Search API endpoint
├── components/                   # React components
│  ├── Header.tsx                 # Navigation
│  └── AthleteCard.tsx            # Athlete card
└── lib/
   ├── supabase.ts               # Supabase client
   └── constants.ts              # Sports & positions
```

## 🔐 User Roles

- **Athlete**: Create and manage own profile, control contact visibility
- **Scout/Coach**: Search and filter athletes, view public profiles
- **Admin**: Verify athlete profiles, manage platform

## 📋 Database

**Tables:**
- `users` - Authentication & roles
- `athlete_profiles` - Athlete data with indexes on city, sport, level

**Row Level Security** protects all data:
- Public read access to verified profiles
- Athletes can only edit own profiles
- Admins can toggle verification status

## 🚢 Deployment

### To Vercel (1 click)

1. Push code to GitHub
2. Go to https://vercel.com
3. Import repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Deploy

See [SETUP.md](./SETUP.md) for detailed instructions.

## 📊 API Endpoints

```
GET /api/athletes?city=NYC&sport=Basketball&level=college&ageMin=16&ageMax=22&sortBy=newest&page=1
```

Returns paginated list of athletes with filters applied.

## 🎯 Next Features

- [ ] Photo upload
- [ ] Email notifications
- [ ] In-app messaging
- [ ] Analytics dashboard
- [ ] Mobile app
- [ ] Premium plans for scouts

## 💰 Monetization

Post-MVP ideas:
- Scout Premium: $29/mo (unlimited search, export, messaging)
- Athlete Premium: $4.99/mo (photo gallery, priority verification)
- Sponsor listings & ads

## ⚖️ Legal Notes

Before launch, create:
- Privacy Policy
- Terms of Service
- Content Moderation Policy
- Age verification (13+)

See [SETUP.md](./SETUP.md) for detailed compliance checklist.

## 🐛 Troubleshooting

See [SETUP.md](./SETUP.md) for common issues and solutions.

## 📚 Stack Documentation

- [Supabase](https://supabase.com/docs)
- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React](https://react.dev)

---

**Built in 2026 for the future of athlete recruitment.** ⚡

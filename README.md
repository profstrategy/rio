# 🦜 $RIO on Bonk

**The Meme That Flew Over the Dogs.**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)

## 🌟 Overview

$RIO is not just another mutt in the pack—it's the rare bird that flies above the noise. Inspired by the iconic macaw from the movie Rio, a bird that escaped captivity and soared into a vibrant world, $RIO represents creative freedom in the BONK ecosystem.

This web platform serves as the central hub for the $RIO community, tracking engagement, celebrating top supporters, and connecting the flock through Twitter integration.

## ✨ Features

### 🏠 Homepage
- Compelling branding and token introduction
- Real-time community statistics
- Direct links to community channels

### 🐦 Twitter Integration
- **Live Tweet Feed** - Display tweets from the official $Rio account
- **Mention Tracking** - Monitor all $Rio and $RioOnBonk mentions
- **Engagement Analytics** - Track likes, retweets, and comments
- **OAuth Login** - Secure Twitter account connection
- **Personal Dashboard** - View your contribution metrics

### 🏆 Leaderboard System
- Top community members ranked by Twitter engagement
- Time-based filters: Weekly, Monthly, All-Time
- Dynamic badges and rewards for top contributors
- Real-time ranking updates

### 📊 Analytics Dashboard
- Community engagement trends over time
- Growth metrics for mentions and hashtags
- Visual charts and graphs
- Twitter activity heatmaps

### 💎 Token Information
- Complete tokenomics breakdown
- Project roadmap with timeline
- Whitepaper access
- Supply and burn statistics

### 🤝 Community Hub
- Links to Telegram, Discord, and Twitter
- Partnership inquiry form
- Technical support contact

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js with Twitter OAuth

### Backend
- **API:** Next.js API Routes
- **Database:** MongoDB with Prisma ORM
- **Twitter Integration:** Twitter API v2
- **Validation:** Zod

### Deployment
- **Hosting:** Vercel
- **Database:** MongoDB Atlas
- **Analytics:** Vercel Analytics

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB database (MongoDB Atlas recommended)
- Twitter Developer Account with API credentials

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/rio-on-bonk.git
cd rio-on-bonk
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/riodb"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Twitter API
TWITTER_API_KEY="your-twitter-api-key"
TWITTER_API_SECRET="your-twitter-api-secret"
TWITTER_BEARER_TOKEN="your-twitter-bearer-token"
TWITTER_CLIENT_ID="your-twitter-client-id"
TWITTER_CLIENT_SECRET="your-twitter-client-secret"

# Twitter OAuth Callback
TWITTER_CALLBACK_URL="http://localhost:3000/api/auth/callback/twitter"
```

4. **Setup Prisma**
```bash
npx prisma generate
npx prisma db push
```

5. **Run development server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📁 Project Structure

```
rio-on-bonk/
├── app/                      # Next.js App Router
│   ├── api/                 # API Routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── leaderboard/    # Leaderboard APIs
│   │   ├── tweets/         # Twitter integration
│   │   ├── analytics/      # Analytics endpoints
│   │   └── user/           # User management
│   ├── dashboard/          # User dashboard pages
│   ├── leaderboard/        # Leaderboard page
│   └── token/              # Token info page
├── components/              # React components
│   ├── ui/                 # UI components
│   ├── layout/             # Layout components
│   └── features/           # Feature-specific components
├── lib/                     # Utility functions
│   ├── prisma.ts           # Prisma client
│   ├── twitter.ts          # Twitter API client
│   └── auth.ts             # Auth utilities
├── prisma/
│   └── schema.prisma       # Database schema
├── public/                  # Static assets
└── types/                   # TypeScript type definitions
```

## 🗃️ Database Schema

### User Model
- Twitter profile information
- Engagement scores and statistics
- Activity timestamps

### Tweet Model
- Tweet content and metadata
- Engagement metrics (likes, retweets, replies)
- User associations

### Analytics Model
- Historical engagement data
- Community growth metrics
- Trending data

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/signin` - Twitter OAuth login
- `POST /api/auth/signout` - Logout
- `GET /api/auth/session` - Get current session

### Users
- `GET /api/user/[id]` - Get user profile and stats
- `GET /api/user/activity/[id]` - Get user's Rio activity
- `PUT /api/user/profile` - Update user profile

### Leaderboard
- `GET /api/leaderboard?timeframe={weekly|monthly|all-time}` - Get ranked users
- `GET /api/leaderboard/badges` - Get available badges

### Twitter
- `GET /api/tweets/mentions` - Fetch $Rio mentions
- `GET /api/tweets/official` - Fetch official account tweets
- `POST /api/tweets/refresh` - Trigger data refresh

### Analytics
- `GET /api/analytics/community` - Community-wide statistics
- `GET /api/analytics/growth` - Growth trends over time
- `GET /api/analytics/trending` - Trending hashtags and topics

## 🎨 Design System

- **Primary Colors:** BONK Orange + Rio Blue
- **Typography:** Poppins / Inter
- **Components:** Fully responsive and mobile-optimized
- **Theme:** Modern, crypto-oriented aesthetic

## 🔐 Security Features

- OAuth 2.0 for Twitter authentication
- Secure API key management
- HTTPS encryption
- Rate limiting on API endpoints
- Input validation with Zod
- Protected API routes with session verification

## 🚦 Roadmap

### Phase 1: MVP (Current)
- ✅ Twitter OAuth integration
- ✅ Basic leaderboard system
- ✅ User dashboard
- ✅ Tweet tracking

### Phase 2: Enhanced Features
- [ ] Real-time leaderboard updates
- [ ] Advanced analytics dashboard
- [ ] Automated reward distribution
- [ ] Email notifications

### Phase 3: Web3 Integration
- [ ] Wallet connection (Phantom/Solflare)
- [ ] On-chain activity tracking
- [ ] Token holder verification
- [ ] NFT badge system

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Environment Variables

Required environment variables are documented in `.env.example`. Never commit actual credentials to the repository.

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌐 Links

- **Website:** [Coming Soon]
- **Twitter:** [@RioOnBonk](https://twitter.com/RioOnBonk)
- **Telegram:** [Join Community]
- **Discord:** [Join Server]

## 👥 Team

Built with ❤️ by the $RIO community

## 📞 Support

For technical support or partnership inquiries:
- Email: support@rioonbonk.com
- Twitter DM: [@RioOnBonk](https://twitter.com/RioOnBonk)

---

**$RIO - The rare bird that flies above the noise** 🦜✨

# GMeet

Video meetings made simple. A Google Meet-style video conferencing app built with Next.js, ZegoCloud, and MongoDB.

## Features

- **OAuth Authentication** -- Sign in with Google or GitHub
- **Create Meetings** -- Generate unique room links to share
- **Instant Meetings** -- Start a call immediately
- **Join by Code** -- Enter a room code or URL to join
- **Video Conferencing** -- Group calls, screen sharing, audio/video controls
- **Dark/Light Theme** -- Toggle with system preference detection
- **Route Protection** -- Auth middleware guards meeting and home routes

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | Tailwind CSS v4, shadcn/ui |
| Auth | NextAuth.js v4 (Google + GitHub OAuth) |
| Database | MongoDB (Mongoose) |
| Video | ZegoCloud (`@zegocloud/zego-uikit-prebuilt`) |
| Icons | Lucide React |

## Getting Started

### Prerequisites

- Node.js v18+
- npm
- A MongoDB Atlas account
- OAuth credentials (GitHub + Google)
- A ZegoCloud account

### Install

```bash
git clone <your-repo-url>
cd gmeet
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>

# NextAuth
NEXTAUTH_SECRET=<random-secret>
NEXTAUTH_URL=http://localhost:3000

# GitHub OAuth
GITHUB_ID=<github-client-id>
GITHUB_SECRET=<github-client-secret>

# Google OAuth
GOOGLE_CLIENT_ID=<google-client-id>
GOOGLE_CLIENT_SECRET=<google-client-secret>

# ZegoCloud
NEXT_PUBLIC_ZEGOAPP_ID=<zego-app-id>
NEXT_PUBLIC_ZEGO_SERVER_SECRET=<zego-server-secret>
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build & Start

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Project Structure

```
gmeet/
├── app/
│   ├── layout.tsx              # Root layout (fonts, providers)
│   ├── page.tsx                # Home dashboard
│   ├── globals.css             # Tailwind + theme variables
│   ├── user-auth/
│   │   └── page.tsx            # Login page
│   ├── video-meeting/
│   │   └── [roomId]/
│   │       └── page.tsx        # Video meeting room
│   └── api/auth/[...nextauth]/
│       └── route.ts            # NextAuth handler
├── components/
│   ├── Header.tsx              # App header
│   ├── theme-provider.tsx      # Theme context
│   └── ui/                     # shadcn components
├── lib/
│   └── dbConnect.ts            # MongoDB connection
├── models/
│   └── User.ts                 # User schema
├── Provider.tsx                # Client providers wrapper
└── middleware.ts               # Auth middleware
```

## Deployment

Deploy to [Vercel](https://vercel.com), [Railway](https://railway.app), or any Node.js host.

Before deploying:

1. Update `NEXTAUTH_URL` to your production domain
2. Configure OAuth redirect URIs in GitHub/Google for your domain
3. Ensure MongoDB Atlas allows connections from your deployment host

# DiscoverJourney

> AI-powered LinkedIn authority & visibility platform for students

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier works)
- Google Cloud Console project with OAuth 2.0 credentials
- Google Gemini API key

### 1. Configure Environment

```bash
# Copy env template and fill in your credentials
cp .env.example server/.env
```

Edit `server/.env` with:
| Variable | Where to get it |
|---|---|
| `MONGODB_URI` | [MongoDB Atlas](https://mongodb.com/atlas) — create free cluster |
| `GOOGLE_CLIENT_ID` | [Google Cloud Console](https://console.cloud.google.com) — OAuth 2.0 |
| `GOOGLE_CLIENT_SECRET` | Same as above |
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com/apikey) |
| `JWT_SECRET` | Any secure random string |

**Google OAuth Redirect URI:** `http://localhost:5000/api/auth/google/callback`

### 2. Start the Backend

```bash
cd server
npm install
npm run dev
```

### 3. Start the Frontend

```bash
cd client
npm install
npm run dev
```

Open **http://localhost:5173**

---

## 📁 Project Structure

```
MVP/
├── server/           # Express.js API
│   ├── config/       # DB + Passport
│   ├── middleware/    # Auth, rate limiter, upload, errors
│   ├── models/       # Mongoose schemas
│   ├── routes/       # All API endpoints
│   ├── services/     # Gemini AI integration
│   └── app.js        # Entry point
├── client/           # React + Vite
│   └── src/
│       ├── components/  # Sidebar, CopyButton, etc.
│       ├── context/     # Auth state
│       ├── pages/       # 8 page components
│       └── services/    # Axios API layer
├── designs/          # UI reference screenshots
└── pages/            # Original HTML prototypes
```

## 🔐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/auth/google` | Start Google OAuth |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/dashboard` | Dashboard scores |
| POST | `/api/generate-content` | AI content generation |
| POST | `/api/analyze-resume` | Resume upload + analysis |
| GET | `/api/visibility-insights` | Visibility data |
| POST | `/api/format-content` | Format text for LinkedIn |
| PUT | `/api/user/profile` | Update profile |

## 🛡️ Security
- JWT in HTTP-only cookies
- Helmet security headers
- CORS whitelisting
- File MIME type validation
- 5MB upload limit
- 10 AI calls/day per user

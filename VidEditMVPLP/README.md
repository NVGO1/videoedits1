# Video Editing MVP Landing Page

A full-stack video editing service landing page with React frontend and Node.js backend.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud)
- API keys for OpenAI and Anthropic (optional)

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd VidEditMVPLP
npm install
```

2. **Environment Setup:**
```bash
cd server
cp .env.example .env
# Edit .env with your actual values
```

3. **Required Environment Variables:**
```env
DATABASE_URL=mongodb://localhost:27017/videditmvp
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
NODE_ENV=development
PORT=3000
```

4. **Start the application:**
```bash
npm start
```

This will start both client (http://localhost:5173) and server (http://localhost:3000) concurrently.

## 🏗️ Project Structure

```
VidEditMVPLP/
├── client/                 # React frontend (Vite + TypeScript)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── api/           # API service layer
│   │   └── hooks/         # Custom React hooks
│   └── package.json
├── server/                # Node.js backend
│   ├── config/           # Database configuration
│   ├── routes/           # API routes
│   ├── services/         # Business logic services
│   └── package.json
└── package.json          # Root workspace configuration
```

## 🛠️ Development

### Frontend Development
```bash
cd client
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
```

### Backend Development
```bash
cd server
npm run dev          # Start with nodemon (auto-reload)
npm start           # Start production server
```

### Full Stack Development
```bash
npm start           # Start both frontend and backend
```

## 🔧 Configuration

### Database
- MongoDB connection configured in `server/config/database.js`
- Supports both local and cloud MongoDB instances

### API Services
- OpenAI integration for AI features
- Anthropic Claude integration for advanced AI capabilities
- Both services are optional and will show warnings if not configured

### Frontend
- Vite for fast development and building
- TypeScript for type safety
- Tailwind CSS for styling
- shadcn/ui for UI components

## 🚨 Troubleshooting

### Common Issues

1. **Server won't start:**
   - Check if MongoDB is running
   - Verify DATABASE_URL in .env file
   - Ensure all required dependencies are installed

2. **Build failures:**
   - Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
   - Check for TypeScript errors: `npm run lint`

3. **API errors:**
   - Verify API keys are correctly set in .env
   - Check server logs for detailed error messages

### Health Check
Run diagnostics to verify setup:
```bash
cd server && node startup-diagnostics.js
cd client && node build-diagnostics.js
```

## 📦 Dependencies

### Frontend
- React 18.3.1
- TypeScript 5.6.2
- Vite 6.3.5 (latest secure version)
- Tailwind CSS
- shadcn/ui components

### Backend
- Express.js
- MongoDB with Mongoose
- OpenAI SDK
- Anthropic SDK
- dotenv for environment management

## 🔒 Security

- All dependencies updated to secure versions
- Environment variables properly configured
- CORS enabled for cross-origin requests
- Input validation and error handling

## 📝 License

[Add your license information here]
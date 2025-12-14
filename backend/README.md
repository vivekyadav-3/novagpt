# NovaGPT Backend

Backend server for NovaGPT AI chat application.

## Setup

1. Install dependencies:

```bash
npm install express mongoose cors dotenv @google/generative-ai
```

2. Create `.env` file with:

```env
GEMINI_API_KEY=your_api_key
MONGODB_URI=mongodb://localhost:27017/novagpt
PORT=5000
```

3. Run server:

```bash
node server.js
```

## API Routes

- `GET /api/test` - Health check
- `GET /api/conversations` - List conversations
- `POST /api/conversations` - Create conversation
- `DELETE /api/conversations/:id` - Delete conversation
- `POST /api/chat` - Send message
- `GET /api/chat/:conversationId` - Get conversation messages

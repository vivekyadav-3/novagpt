# NovaGPT - AI Chat Application

A full-stack AI chat application built with Next.js, Node.js/Express, MongoDB, and Google Gemini API.

## Features

- 💬 Real-time AI chat powered by Google Gemini
- 📝 Markdown rendering with syntax highlighting
- 💾 Persistent chat history with MongoDB
- 🗂️ Multiple conversation management
- ⌨️ Typing effect animation
- 🗑️ Delete conversations
- 🎨 Modern dark-themed UI

## Tech Stack

### Frontend

- **Next.js 16** - React framework
- **React** - UI library
- **Lucide React** - Icons
- **React Markdown** - Markdown rendering
- **CSS** - Styling

### Backend

- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Google Generative AI** - AI integration

## Project Structure

```
novagpt/
├── backend/
│   ├── models/
│   │   ├── Chat.js          # Chat message schema
│   │   └── Conversation.js  # Conversation schema
│   ├── routes/
│   │   └── api.js           # API routes
│   ├── utils/
│   │   └── gemini.js        # Gemini API integration
│   ├── server.js            # Express server
│   └── .env                 # Environment variables (not in git)
│
└── frontend/
    ├── app/
    │   ├── globals.css      # Global styles
    │   ├── layout.js        # Root layout
    │   └── page.js          # Main page
    ├── components/
    │   ├── ChatArea.js      # Chat interface
    │   ├── ChatArea.css     # Chat styles
    │   ├── Sidebar.js       # Sidebar navigation
    │   └── Sidebar.css      # Sidebar styles
    └── public/              # Static assets
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Google Gemini API key

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install express mongoose cors dotenv @google/generative-ai
```

3. Create a `.env` file:

```env
GEMINI_API_KEY=your_gemini_api_key_here
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

4. Start the backend server:

```bash
node server.js
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Conversations

- `GET /api/conversations` - Get all conversations
- `POST /api/conversations` - Create new conversation
- `DELETE /api/conversations/:id` - Delete conversation

### Chat

- `POST /api/chat` - Send message and get AI response
- `GET /api/chat/:conversationId` - Get messages for a conversation

### Health Check

- `GET /api/test` - Test server and database connection

## Environment Variables

### Backend (.env)

```env
GEMINI_API_KEY=your_api_key
MONGODB_URI=mongodb://localhost:27017/novagpt
PORT=5000
```

## Features in Detail

### Chat Interface

- Real-time messaging with AI
- Markdown support for formatted responses
- Code syntax highlighting
- Typing animation effect
- Auto-scroll to latest message

### Conversation Management

- Create new conversations
- View conversation history in sidebar
- Delete unwanted conversations
- Auto-generated conversation titles

### Data Persistence

- All messages saved to MongoDB
- Conversations persist across sessions
- Load previous conversations on demand

## Development

### Running in Development Mode

1. Start MongoDB (if local)
2. Start backend: `cd backend && node server.js`
3. Start frontend: `cd frontend && npm run dev`
4. Open `http://localhost:3000`

### Building for Production

Frontend:

```bash
cd frontend
npm run build
npm start
```

## Contributing

Feel free to submit issues and pull requests!

## License

MIT

## Author

Your Name

---

Built with ❤️ using Next.js and Google Gemini

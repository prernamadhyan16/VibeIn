# VibeIn Server

A real-time chat application server built with Node.js, Express, Socket.IO, and MongoDB.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the server directory with the following variables:

```env
# Server Configuration
PORT=8747
ORIGIN=http://localhost:5173

# MongoDB Configuration
# For local MongoDB:
DATABASE_URL=mongodb://localhost:27017/vibein

# For MongoDB Atlas:
# DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/vibein?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# File Upload Configuration
MAX_FILE_SIZE=10485760
```

### 3. MongoDB Setup

#### Option A: Local MongoDB
1. Install MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/vibein`

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string from the cluster dashboard
4. Replace `username`, `password`, and `cluster` in the connection string

### 4. Run the Server

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/contacts` - Get user contacts
- `POST /api/messages` - Send message
- `GET /api/messages/:chatId` - Get chat messages
- `POST /api/channel` - Create channel

## Socket.IO Events

- `connection` - User connects
- `disconnect` - User disconnects
- `send_message` - Send message
- `join_room` - Join chat room
- `leave_room` - Leave chat room

## File Structure

```
server/
├── config.js          # Configuration management
├── index.js           # Main server file
├── socket.js          # Socket.IO setup
├── controllers/       # Route controllers
├── models/           # MongoDB models
├── routes/           # API routes
├── middlewares/      # Express middlewares
└── uploads/          # File uploads
```

## Troubleshooting

### MongoDB Connection Issues

1. **Connection Timeout**: Check if MongoDB is running
2. **Authentication Error**: Verify username/password in connection string
3. **Network Error**: Check firewall settings and network connectivity

### Common Error Solutions

- **ENOTFOUND**: DNS resolution failed - check connection string
- **ECONNREFUSED**: MongoDB not running - start MongoDB service
- **Authentication failed**: Check credentials in connection string

## Development Tips

- Use `nodemon` for automatic server restart during development
- Check server logs for detailed error messages
- Use MongoDB Compass for database visualization
- Test API endpoints with Postman or similar tools 
![image](https://github.com/user-attachments/assets/f03f77e3-db95-49ce-a291-978729ad3b99)# VibeIn: Real-Time Chat Application

VibeIn is a modern real-time chat application that supports individual and group chat functionalities. The application is designed for seamless communication with features like real-time messaging, group management, user authentication, and notifications. 

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Real-Time Communication Flow](#real-time-communication-flow)
- [Future Enhancements](#future-enhancements)
- [Screenshots](#screenshots)

---

## Features
- **User Authentication**:
  - Secure login and registration using JWT (JSON Web Tokens).
  - Password hashing for user security.
- **Individual Chats**:
  - One-on-one chat functionality.
  - Message timestamps and read receipts.
- **Group Chats**:
  - Create, join, and leave groups.
  - Admin roles for managing group members.
- **Real-Time Messaging**:
  - WebSocket-based communication for instant updates.
  - Typing indicators and message delivery notifications.
- **Responsive Design**:
  - Mobile-friendly user interface for a seamless experience on all devices.
- **Notifications**:
  - Real-time notifications for new messages.
- **Search Functionality**:
  - Search users and groups with auto-complete suggestions.

---

## Technologies Used
### Frontend
- React.js (or similar framework) for building the user interface.
- CSS for styling components.
- WebSocket for real-time communication.

### Backend
- Node.js with Express.js for server-side logic.
- Socket.IO for WebSocket-based real-time communication.
- MongoDB for database management (alternatively PostgreSQL).
- JSON Web Tokens (JWT) for secure authentication.

### Other Tools
- Axios for API calls.
- bcrypt for password hashing.
- Hosting platforms: Heroku/Vercel/Netlify.

---

## Project Structure
```
VibeIn/
|-- client/             # Frontend code
|   |-- public/         # Static assets
|   |-- src/            # React components
|       |-- components/ # Reusable UI components
|       |-- pages/      # Application pages (Login, Chat, etc.)
|       |-- utils/      # Helper functions
|
|-- server/             # Backend code
    |-- routes/         # API endpoints
    |-- models/         # Database models
    |-- controllers/    # Request handlers
    |-- middlewares/    # Authentication and validation middleware
    |-- config/         # Environment and database configurations
```

---

## Installation
1. **Clone the Repository**
   ```bash
   git clone https://github.com/prernamadhyan16/VibeIn.git
   cd VibeIn
   ```

2. **Install Dependencies**
   - Install frontend dependencies:
     ```bash
     cd client
     npm install
     ```
   - Install backend dependencies:
     ```bash
     cd ../server
     npm install
     ```

3. **Setup Environment Variables**
   Create a `.env` file in the `server` directory with the following keys:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the Application**
   - Start the backend server:
     ```bash
     cd server
     npm start
     ```
   - Start the frontend server:
     ```bash
     cd ../client
     npm start
     ```

---

## Usage
1. Visit `http://localhost:3000` in your browser.
2. Sign up or log in to access the chat dashboard.
3. Start individual or group chats by searching for users or creating a new group.
4. Use the chat interface to send messages in real-time.

---

## API Endpoints
### Authentication
- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Authenticate a user and return a token.

### Chat Management
- **GET /api/chats/:userId**: Fetch individual chats for a user.
- **POST /api/chats**: Create a new chat.
- **POST /api/chats/message**: Send a new message.

### Group Management
- **POST /api/groups**: Create a new group.
- **PUT /api/groups/:groupId**: Add or remove members.
- **DELETE /api/groups/:groupId**: Delete a group.

---

## Real-Time Communication Flow
1. **User Connection**:
   - Users connect to the server via WebSocket (Socket.IO).
   - Each connection is authenticated using the user token.

2. **Messaging**:
   - Messages are emitted to the server.
   - The server broadcasts the message to all members of the chat.

3. **Typing Indicators**:
   - Users emit typing events, which are broadcasted to the recipient(s).

4. **Notifications**:
   - The server pushes real-time notifications for new messages to offline users.

---

## Future Enhancements
- **Media Sharing**:
  - Add support for image, video, and file sharing.
- **Message Encryption**:
  - Implement end-to-end encryption for secure communication.
- **Dark Mode**:
  - Introduce a theme toggle for dark and light modes.
- **Scalability**:
  - Use Redis for caching frequently accessed data.
  - Introduce horizontal scaling with load balancers for better performance.

---

## Screenshots
Add screenshots of the project here to showcase the user interface, such as:
- Login/Signup Page
  ![image](https://github.com/user-attachments/assets/806b16e4-a3f9-4385-9f92-b90548356abf)
- Chat Dashboard
- Group Chat Interface
- Notifications

---

## Contributing
1. Fork the repository.
2. Create a new branch for your feature.
3. Commit your changes and push to the branch.
4. Create a pull request for review.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

## Contact
For any queries or feedback, please reach out via [GitHub Issues](https://github.com/prernamadhyan16/VibeIn/issues).

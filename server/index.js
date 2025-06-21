import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import authRoutes from "./routes/AuthRoutes.js"
import contactsRoutes from "./routes/ContactRoutes.js"
import setupSocket from "./socket.js"
import messagesRoutes from "./routes/MessegesRoutes.js"
import channelRoutes from "./routes/ChannelRoutes.js"
import config from "./config.js"
 
const app = express();

app.use(
    cors({
        origin:[config.origin],
        methods:["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
    })
);


app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("/uploads/files", express.static("uploads/files"));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactsRoutes)
app.use("/api/messages", messagesRoutes);
app.use("/api/channel", channelRoutes);

const server = app.listen(config.port, ()=>{
    console.log(`🚀 Server is running at http://localhost:${config.port}`)
});

setupSocket(server);

// Improved MongoDB connection with better error handling
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.databaseURL, config.mongoOptions);
        
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        
        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('⚠️  MongoDB disconnected');
        });
        
        mongoose.connection.on('reconnected', () => {
            console.log('🔄 MongoDB reconnected');
        });
        
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        console.log('📝 Please check your DATABASE_URL in .env file');
        console.log('🔧 For local MongoDB: mongodb://localhost:27017/vibein');
        console.log('☁️  For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/vibein?retryWrites=true&w=majority');
        process.exit(1);
    }
};

connectDB();
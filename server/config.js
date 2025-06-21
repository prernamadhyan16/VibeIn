import dotenv from 'dotenv';

dotenv.config();

const config = {
    // Server Configuration
    port: process.env.PORT || 8747,
    origin: process.env.ORIGIN || "http://localhost:5173",
    
    // Database Configuration
    databaseURL: process.env.DATABASE_URL || "mongodb://localhost:27017/vibein",
    
    // JWT Configuration
    jwtSecret: process.env.JWT_SECRET || "your_jwt_secret_key_here",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
    
    // File Upload Configuration
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 10485760, // 10MB default
    
    // MongoDB Connection Options
    mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        // bufferCommands: false,
        // bufferMaxEntries: 0,
    }
};

// Validate required environment variables
const validateConfig = () => {
    const required = ['DATABASE_URL'];
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
        console.warn('⚠️  Missing environment variables:', missing.join(', '));
        console.log('📝 Please create a .env file with the following variables:');
        console.log('DATABASE_URL=your_mongodb_connection_string');
        console.log('JWT_SECRET=your_jwt_secret_key');
        console.log('ORIGIN=http://localhost:5173');
    }
};

validateConfig();

export default config; 
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '.env');

const envContent = `# Server Configuration
PORT=8747
ORIGIN=http://localhost:5173

# MongoDB Configuration
# For local MongoDB:
DATABASE_URL=mongodb://localhost:27017/vibein

# For MongoDB Atlas (uncomment and replace with your connection string):
# DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/vibein?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# File Upload Configuration
MAX_FILE_SIZE=10485760
`;

try {
    if (fs.existsSync(envPath)) {
        console.log('⚠️  .env file already exists. Skipping creation.');
        console.log('📝 Please check your .env file and update the DATABASE_URL if needed.');
    } else {
        fs.writeFileSync(envPath, envContent);
        console.log('✅ .env file created successfully!');
        console.log('📝 Please update the DATABASE_URL in the .env file:');
        console.log('   - For local MongoDB: mongodb://localhost:27017/vibein');
        console.log('   - For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/vibein?retryWrites=true&w=majority');
    }
} catch (error) {
    console.error('❌ Error creating .env file:', error.message);
} 
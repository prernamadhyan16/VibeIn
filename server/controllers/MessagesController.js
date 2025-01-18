import Message from "../models/MessagesModel.js";
import { mkdirSync, renameSync } from 'fs';

export const getMessages = async (request, response, next) => {
    try {
        console.log("getMessages responding");
        const user1 = request.userId;
        const user2 = request.body.id;

        if(!user1 || !user2){
            
            return response.status(400).send("Both user ids are required.")
        }

        const message = await Message.find({
            $or : [
                { sender: user1, recipient: user2 },
                { sender: user2, recipient: user1 },

            ]
        }).sort({ timestamp:1 })
        // console.log({message})
        return response.status(200).json({ message });

        
    } catch (error) {
        console.error({ error });
        return response.status(500).send("Internal Server Error1");
    }
};

export const uploadFile = async (request, response, next) => {
    try {
        if(!request.file){
            console.log("no uploads we are getting")
            return response.status(400).send("File is required.");
        }
        const date = Date.now();
        let fileDir = `uploads/files/${date}`;
        let fileName = `${fileDir}/${request.file.originalname}`;

        mkdirSync(fileDir, { recursive: true });
        renameSync(request.file.path, fileName);

        return response.status(200).json({ filePath : fileName });
        
    } catch (error) {
        console.error({ error });
        return response.status(500).send("Internal Server Error1");
    }
};
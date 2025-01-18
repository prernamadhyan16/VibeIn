import Message from "../models/MessagesModel.js";

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


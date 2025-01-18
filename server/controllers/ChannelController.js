import Channel from "../models/ChannelModel.js";
import User from "../models/UserModel.js";

export const createChannel = async (request, response, next) => {
  try {
    console.log({request});
    const { name, members } = request.body;
    const userId = request.userId;

    const admin = await User.findById(userId);
    console.log(userId);
    if (!admin) {
        console.log({admin});
      return response.status(400).send("Admin user not found.");
    }
    

    const validMembers = await User.find({ _id: { $in: members } });

    if (validMembers.length !== members.length) {
      return response.status(400).send("Some members are not valid users.");
    }

    const newChannel = new Channel({
      name,
      members,
      admin: userId,
    });

    await newChannel.save();
    return response.status(201).json({ channel: newChannel });
  } catch (error) {
    console.log(error);
    return response.status(500).send("Internal Server Error");
  }
};

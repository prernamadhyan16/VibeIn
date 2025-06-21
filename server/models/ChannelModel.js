import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Users",
        required: true,
      },
    ],
    admin: { type: mongoose.Schema.ObjectId, ref: "Users", required: true },
    messages: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Messages",
      },
    ],
  },
  { timestamps: true } // Automatically manages createdAt and updatedAt
);

const Channel = mongoose.model("Channels", channelSchema);
export default Channel;

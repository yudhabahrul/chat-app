import Message from "../models/message.js";
import { cloudinary } from "./cloudinary.js";

export const setupSocket = (io) => {
  io.on("connection", (socket) => {
    socket.on("join_room", (room) => {
      socket.join(room);
    });

    socket.on("sendMessage", async (messageData, callback) => {
      try {
        let imageUrl = "";

        if (messageData.imageBuffer) {
          const base64Data = messageData.imageBuffer.replace(
            /^data:image\/\w+;base64,/,
            ""
          );
          const buffer = Buffer.from(base64Data, "base64");

          await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { folder: "message_images" },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  imageUrl = result.secure_url;
                  resolve(result);
                }
              }
            );
            uploadStream.end(buffer);
          });
        }

        io.to(messageData.room).emit("message", {
          groupId: messageData.room,
          user: messageData.user,
          email: messageData.email,
          avatar: messageData.avatar,
          text: messageData.text,
          image: messageData.image,
          createdAt: new Date(),
        });

        const newMessage = new Message({
          user: messageData.user,
          email: messageData.email,
          avatar: messageData.avatar,
          text: messageData.text,
          image: imageUrl,
          groupId: messageData.room,
        });

        await newMessage.save();

        callback();
      } catch (error) {
        callback(error);
      }
    });

    socket.on("disconnect", () => {});
  });
};

import Message from "../models/message.js";

export const addMessage = async (req, res) => {
  try {
    const { user, email, avatar, text, image } = req.body;
    const newMessage = new Message({
      user,
      email,
      avatar,
      text,
      image,
    });
    const savedMessage = await newMessage.save();

    res
      .status(201)
      .json({ message: "Pesan berhasil ditambahkan.", data: savedMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};

export const getMessagesByGroupId = async (req, res) => {
  try {
    const { groupId } = req.params;
    const messages = await Message.find({ groupId }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Gagal mendapatkan pesan", error });
  }
};

export const getLastMessageByGroupId = async (req, res) => {
  try {
    const { groupId } = req.params;
    const lastMessage = await Message.find({ groupId })
      .sort({ createdAt: -1 })
      .limit(1);

    res.status(200).json(lastMessage);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal mendapatkan pesan terakhir", error });
  }
};

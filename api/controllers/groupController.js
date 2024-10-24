import Group from "../models/group.js";

export const addGroup = async (req, res) => {
  try {
    const { nameGroup } = req.body;
    const image = req.file.path;

    const newGroup = new Group({
      nameGroup,
      image,
    });

    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ message: "Gagal menambahkan grup", error });
  }
};

export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find().sort({ createdAt: 1 });
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: "Gagal mendapatkan grup", error });
  }
};

export const getGroupById = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await Group.findById(id);

    if (!group) {
      return res.status(404).json({ message: "Grup tidak ditemukan" });
    }

    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: "Gagal mendapatkan grup", error });
  }
};

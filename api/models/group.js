import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    nameGroup: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", groupSchema);

export default Group;

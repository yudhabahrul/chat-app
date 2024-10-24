import express from "express";
import {
  addGroup,
  getGroups,
  getGroupById,
} from "../controllers/groupController.js";
import { storage } from "../config/cloudinary.js";
import multer from "multer";

const upload = multer({ storage });

const router = express.Router();

router.post("/addGroup", upload.single("image"), addGroup);

router.get("/getGroups", getGroups);

router.get("/:id", getGroupById);

export default router;

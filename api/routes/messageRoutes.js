import express from "express";
import {
  addMessage,
  getMessagesByGroupId,
  getLastMessageByGroupId,
} from "../controllers/messageController.js";

const router = express.Router();

router.post("/messages", addMessage);
router.get("/:groupId/messages", getMessagesByGroupId);
router.get("/:groupId/last-message", getLastMessageByGroupId);

export default router;

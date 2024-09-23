import express from "express";
import http from "http";
import cors from "cors";
import { config } from "dotenv";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import groupRoutes from "./routes/groupRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { setupSocket } from "./config/socket.js";

config();

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: true,
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors(corsOptions));

const io = new Server(server, {
  cors: corsOptions,
});

connectDB();
setupSocket(io);
app.get("/", (req, res) => {
  res.status(200).send("Yudha Bahrul Alam");
});
app.use(express.json());
app.use("/api/groups", groupRoutes);
app.use("/api", messageRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("jalan");
});

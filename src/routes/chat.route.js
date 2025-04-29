import express from "express";
import ChatController from "../controller/chatController.js";
import { chatMessageSchema } from "../schemas/chatSchemas.js";
import { validateSchema } from "../middlewares/validationSchema.js";

const router = express.Router();

router.post(
  "/send",
  validateSchema(chatMessageSchema),
  ChatController.generateResponse
);

export default router;

import express from "express";
import UserController from "../controller/userController.js";
import { validateSchema } from "../middlewares/validationSchema.js";
import {
  userCreateSchema,
  userUpdateSchema,
  documentUploadSchema,
  socialMediaConnectSchema,
  esportsProfileSchema,
} from "../schemas/userSchemas.js";

import multer from "multer";

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

// User CRUD operations
router.post("/", validateSchema(userCreateSchema), UserController.createUser);
router.get("/:id", UserController.getUserById);
router.put("/:id", validateSchema(userUpdateSchema), UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

// Document upload and verification
router.post(
  "/:id/document",
  upload.single("documentImage"),
  validateSchema(documentUploadSchema),
  UserController.uploadDocument
);

// Social media integration
router.post(
  "/:id/social-media",
  validateSchema(socialMediaConnectSchema),
  UserController.connectSocialMedia
);

// E-sports profile validation
router.post(
  "/:id/esports-profile",
  validateSchema(esportsProfileSchema),
  UserController.validateEsportsProfile
);

export default router;

import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
//503 error from mongodb
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js";

import { handleValidationError, checkAuth } from "./utils/index.js";
import { UserController, PostController } from "./controllers/index.js";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("DB is OK");
    const app = express();
  })
  .catch((err) => console.log("DB ERROR", err));

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.post(
  "/auth/login",
  loginValidation,
  handleValidationError,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationError,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/posts", PostController.getAll);
app.get("/tags", PostController.getLastTags);
app.get("/", (req, res) => {
  res.send("APP IS RUNNING");
});

app.get("/posts/:id", PostController.getOne);

app.post(
  "/posts",
  checkAuth,
  handleValidationError,
  postCreateValidation,
  PostController.create
);
app.delete("/posts/:id", checkAuth, PostController.remove);

app.patch(
  "/posts/:id",
  checkAuth,
  handleValidationError,
  postCreateValidation,
  PostController.update
);

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server is OK");
});

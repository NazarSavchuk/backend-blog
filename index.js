import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.l1ulnvk.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB is OK"))
  .catch(() => console.log("DB ERROR"));

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/auth/register", (req, res) => {});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server is OK");
});

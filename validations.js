import { body } from "express-validator";

export const registerValidation = [
  body("email", "Incorrect email").isEmail(),
  body("password", "this password is not available").isLength({ min: 5 }),
  body("fullName", "incorrect fullName").isLength({ min: 3 }),
  body("avatarUrl", "Url is not correct").optional().isURL(),
];

export const loginValidation = [
  body("email", "Incorrect email").isEmail(),
  body("password", "this password is not available").isLength({ min: 5 }),
];

export const postCreateValidation = [
  body("title", "Enter title of artice").isLength({ min: 3 }).isString(),
  body("text", "Enter text of article").isLength({ min: 10 }).isString(),
  body("tags", "Incorrect format of tags (enter an array)")
    .optional()
    .isString(),
  body("imageUrl", "Incorrect URL").optional().isString(),
];

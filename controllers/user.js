const UserModel = require("../model/user");
const fs = require("fs").promises;
const path = require("path");
const Jimp = require("jimp");
const jwt = require("jsonwebtoken");
const createFolderIsExist = require("../helpers/create-directory");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET;

const saveAvatarForStatic = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const DIR_IMAGES = process.env.DIR_IMAGES;
    const pathToFile = req.file.path;
    const newNameAvatar = req.file.originalname;

    const img = await Jimp.read(pathToFile);
    await img
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(pathToFile);

    await createFolderIsExist(path.join(DIR_IMAGES, userId));
    await fs.rename(pathToFile, path.join(DIR_IMAGES, userId, newNameAvatar));
    const newUrlAvatar = path.normalize(path.join(userId, newNameAvatar));
    const newUrl = `http://localhost:3000/${userId}/${newNameAvatar}`;
    await UserModel.updateAvatar(userId, newUrlAvatar);
    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        newUrl,
      },
    });
  } catch (e) {
    next(e);
  }
};

const createNewUser = async (req, res, next) => {
  try {
    const isExist = await UserModel.findByEmail(req.body.email);
    if (isExist)
      return res.status(409).json({
        status: "error",
        code: 409,
        data: "Conflict",
        message: "Email has used already!",
      });
    const { id, email, name, avatarUrl } = await UserModel.createUser(req.body);
    return res.status(201).json({
      status: "success",
      code: 201,
      data: { id, email, name, avatarUrl },
    });
  } catch (e) {
    next(e);
  }
};

const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findByEmail(email);
    const isValidPassword = await user.validPassword(password);
    if (!user || !isValidPassword)
      return res.status(401).json({
        status: "error",
        code: 401,
        data: "UNAUTHORIZED",
        message: "Invalid credentials",
      });

    const id = user._id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
    await UserModel.updateToken(id, token);
    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        token,
      },
    });
  } catch (e) {
    next(e);
  }
};

const logOut = async (req, res, next) => {
  try {
    const id = req.user.id;
    const user = await UserModel.findById(id);
    if (!user)
      return res.status(401).json({
        status: "error",
        code: 401,
        data: "UNAUTHORIZED",
        message: "Invalid credentials",
      });
    await UserModel.updateToken(id, null);
    return res.status(204).json({});
  } catch (e) {
    next(e);
  }
};

const getCurrent = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user)
      return res.status(401).json({
        status: "error",
        code: 401,
        data: "UNAUTHORIZED",
        message: "Invalid credentials",
      });

    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        user,
      },
    });
  } catch (e) {
    next(e);
  }
};

const updateName = async (req, res, next) => {
  try {
    const id = req.user.id;
    const user = await UserModel.updateName(id, req.body.name);
    return res.status(200).json({
      data: user,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  saveAvatarForStatic,
  createNewUser,
  logIn,
  logOut,
  getCurrent,
  updateName,
};

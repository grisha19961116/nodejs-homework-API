const UserModel = require("../model/user");
const fs = require("fs").promises;
const path = require("path");
const Jimp = require("jimp");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET;

const createFolderIsExist = require("../helpers/create-directory");
const EmailService = require("../services/emailSendGrid");

const saveAvatarForStatic = async (req, res, next) => {
  try {
    const id = req.user.id;
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

    await createFolderIsExist(path.join(DIR_IMAGES, id));
    await fs.rename(pathToFile, path.join(DIR_IMAGES, id, newNameAvatar));
    const newUrlAvatar = path.normalize(path.join(id, newNameAvatar));
    const newUrl = `http://localhost:3000/${id}/${newNameAvatar}`;
    await UserModel.updateAvatar(id, newUrlAvatar);
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
    const { email, name } = req.body;
    const isExist = await UserModel.findByEmail(email);
    if (isExist) {
      return res.status(409).json({
        status: "error",
        code: 409,
        data: "Conflict",
        message: "Email has used already!",
      });
    }
    const verifyToken = nanoid();
    const emailService = new EmailService(process.env.NODE_ENV);
    console.log(process.env.NODE_ENV);
    await emailService.sendEmail(verifyToken, email, name);
    const newUser = await UserModel.createUser({
      ...req.body,
      verify: false,
      verifyToken,
    });
    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        avatar: newUser.avatar,
      },
    });
  } catch (e) {
    next(e);
  }
};
const verify = async (req, res, next) => {
  try {
    const token = req.params.token;
    const user = UserModel.findByVerifyToken(token);
    if (user) {
      await UserModel.UpdateVerifyToken(user.id, true, null);
      return res.json({
        status: "success",
        code: 200,
        message: "Verification was successful!",
      });
    } else {
      return res.json({
        status: "error",
        code: 404,
        data: "Bed request",
        message: "Link is not valid!",
      });
    }
  } catch (e) {
    next(e);
  }
  return {};
};

const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findByEmail(email);
    const isValidPassword = await user.validPassword(password);
    if (!user || !isValidPassword || !user.verify) {
      return res.status(401).json({
        status: "error",
        code: 401,
        data: "UNAUTHORIZED",
        message: "Invalid credentials",
      });
    }
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

const logout = async (req, res, next) => {
  const id = req.user.id;
  const user = await UserModel.findById(id);
  if (!user) {
    return res.status(401).json({
      status: "error",
      code: 401,
      data: "UNAUTHORIZED",
      message: "Invalid credentials",
    });
  }
  await UserModel.updateToken(id, null);
  return res.status(204).json({});
};
const getCurrent = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({
      status: "error",
      code: 401,
      data: "UNAUTHORIZED",
      message: "Invalid credentials",
    });
  }

  return res.status(200).json({
    status: "success",
    code: 200,
    data: {
      user,
    },
  });
};
const updateSubscription = async (req, res, next) => {
  try {
    const id = req.user.id;
    console.log(req.body);
    const update = await UserModel.updateSubscrip(id, req.body);
    return res.status(200).json({
      data: update,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  saveAvatarForStatic,
  createNewUser,
  logIn,
  logout,
  getCurrent,
  updateSubscription,
  verify,
};

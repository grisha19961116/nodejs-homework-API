const UserModel = require("../model/user");
const userSchema = require("../model/schemas/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET;

const createNewUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const isExist = await UserModel.findByEmail(email);
    if (isExist) {
      return res.status(409).json({
        status: "error",
        code: 409,
        data: "Conflict",
        message: "Email has used already!",
      });
    }
    const newUser = await UserModel.createUser(req.body);
    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
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
    if (!user || !isValidPassword) {
      return res.status(401).json({
        status: "error",
        code: 401,
        data: "UNAUTHORIZED",
        message: "Invalid credentials",
      });
    }
    const id = user._id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
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
  const isExist = await userSchema.findById(id);
  if (!isExist) {
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

module.exports = {
  createNewUser,
  logIn,
  logout,
  getCurrent,
};

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

mongoose.Types.ObjectId.isValid();

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      min: 4,
      max: 30,
      required: [true, "Set email for for current user"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Set phone number for current user"],
    },
    subscription: {
      type: String,
      default: false,
    },
    password: {
      type: String,
      required: [true, "Set password for current user"],
      default: false,
    },
    token: {
      type: String,
      required: [true, "user token"],
      unique: true,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

module.exports = Contact;

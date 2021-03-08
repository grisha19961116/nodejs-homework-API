const mongoose = require("mongoose");
const { Schema, model, SchemaTypes } = mongoose;
mongoose.Types.ObjectId.isValid();

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Email required"],
      unique: true,
      min: 4,
      max: 30,
      validate(value) {
        const reg = /\S+@\S+\.\S+/;
        return reg.test(String(value).toLowerCase());
      },
    },
    phone: {
      type: String,
      unique: true,
      required: [true, "Set phone number for current user"],
    },
    password: {
      type: String,
      required: [true, "Set password for current user"],
    },
    subscription: {
      type: String,
      enum: ["free", "pro", "premium"],
    },
    token: {
      type: String,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },

  { timestamps: true }
);

const Contact = model("contact", contactSchema);

module.exports = Contact;

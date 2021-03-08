const mongoose = require("mongoose");
const { Schema, model, SchemaTypes } = mongoose;
mongoose.Types.ObjectId.isValid();

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone number for current user"],
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

const mongoose = require("mongoose");
const { Schema, model, SchemaTypes } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

mongoose.Types.ObjectId.isValid();

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    phone: {
      type: String,
      unique: true,
      required: [true, "Set phone number for current user"],
    },
    subscription: {
      type: String,
      enum: ["free", "pro", "premium"],
      required: [true, "Set subscription for current user"],
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },

  { timestamps: true }
);
contactSchema.plugin(mongoosePaginate);
const Contact = model("contact", contactSchema);

module.exports = Contact;

const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },

    nit: {
      type: String,
      required: [true, "NIT is required"],
      unique: true,
      trim: true,
    },

    contactName: {
      type: String,
      required: [true, "Contact name is required"],
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },

    address: {
      type: String,
      trim: true,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Client", clientSchema);

const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },

    documentType: {
      type: String,
      enum: ["NIT", "CC"],
      required: [true, "Document type is required"],
    },

    documentNumber: {
      type: String,
      required: [true, "Document number is required"],
      unique: true,
      trim: true,
    },

    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },

    companyPhone: {
      type: String,
      required: [true, "Company phone is required"],
      trim: true,
    },

    contactName: {
      type: String,
      required: [true, "Contact name is required"],
      trim: true,
    },

    contactEmail: {
      type: String,
      required: [true, "Contact email is required"],
      lowercase: true,
      trim: true,
    },

    contactPhone: {
      type: String,
      required: [true, "Contact phone is required"],
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

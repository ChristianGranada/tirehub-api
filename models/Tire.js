const mongoose = require("mongoose");

const tireSchema = new mongoose.Schema(
  {
    internalCode: {
      type: String,
      required: [true, "Internal code is required"],
      unique: true,
      trim: true,
    },

    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
    },

    size: {
      type: String,
      required: [true, "Size is required"],
      trim: true,
    },

    serialNumber: {
      type: String,
      required: [true, "Serial number is required"],
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "Received",
        "Inspection",
        "Repair",
        "Retreading",
        "QualityControl",
        "Delivered",
      ],
      default: "Received",
    },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Tire", tireSchema);

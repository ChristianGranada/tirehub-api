const mongoose = require("mongoose");

const workOrderSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    tire: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tire",
      required: true,
    },

    entryDate: {
      type: Date,
      default: Date.now,
    },

    observations: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "Open",
        "InProgress",
        "Completed",
        "Delivered",
      ],
      default: "Open",
    },

    cost: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("WorkOrder", workOrderSchema);
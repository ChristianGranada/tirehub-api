const mongoose = require("mongoose");

const workOrderSchema = new mongoose.Schema(
  {
    // ==============================
    // COMPANY
    // ==============================

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    // ==============================
    // ORDER INFORMATION
    // ==============================

    orderNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    status: {
      type: String,
      enum: require("../config/workOrderStatus"),
      default: "PENDING",
    },

    priority: {
      type: String,
      enum: require("../config/priorities"),
      default: "NORMAL",
    },

    estimatedDeliveryDate: {
      type: Date,
      required: true,
    },

    // ==============================
    // CUSTOMER
    // ==============================

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    // ==============================
    // TIRES
    // ==============================

    tires: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tire",
      },
    ],

    // ==============================
    // PRODUCTION PLANNING
    // ==============================

    programming: {
      scheduledDate: {
        type: Date,
        default: null,
      },

      scheduledBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
    },

    // ==============================
    // USERS
    // ==============================

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ==============================
    // OBSERVATIONS
    // ==============================

    observations: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// ==============================
// VALIDATIONS
// ==============================

// Una orden puede contener máximo 10 llantas
workOrderSchema.path("tires").validate(function (tires) {
  return tires.length <= 10;
}, "A work order cannot contain more than 10 tires.");

module.exports = mongoose.model("WorkOrder", workOrderSchema);

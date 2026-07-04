const mongoose = require("mongoose");

const patchReferenceSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    code: {
      type: String,
      required: true,
      trim: true,
      unique: true,
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

module.exports = mongoose.model("PatchReference", patchReferenceSchema);

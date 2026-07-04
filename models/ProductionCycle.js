const mongoose = require("mongoose");

const productionCycleSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    chamber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CuringChamber",
      required: true,
    },

    cycleSequence: {
      type: Number,
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    tires: [
      {
        tire: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Tire",
          required: true,
        },

        position: {
          type: Number,
          required: true,
        },
      },
    ],

    recipe: {
      autoclavePressure: {
        type: Number,
        default: null,
      },

      thirdPressure: {
        type: Number,
        default: null,
      },

      temperature: {
        type: Number,
        default: null,
      },

      time: {
        type: Number,
        default: null,
      },
    },

    entryTime: {
      type: Date,
      default: null,
    },

    thirdPressureTime: {
      type: Date,
      default: null,
    },

    cycleStartTime: {
      type: Date,
      default: null,
    },

    cycleEndTime: {
      type: Date,
      default: null,
    },

    controls: [
      {
        controlNumber: {
          type: Number,
          required: true,
        },

        pressure: {
          type: Number,
          default: null,
        },

        thirdPressure: {
          type: Number,
          default: null,
        },

        temperature: {
          type: Number,
          default: null,
        },

        tubePressure: {
          type: Number,
          default: null,
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    observations: {
      type: String,
      trim: true,
      default: null,
    },

    cycleFailure: {
      hasFailure: {
        type: Boolean,
        default: false,
      },

      description: {
        type: String,
        trim: true,
        default: null,
      },
    },

    positionFailure: {
      hasFailure: {
        type: Boolean,
        default: false,
      },

      position: {
        type: Number,
        default: null,
      },

      description: {
        type: String,
        trim: true,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("ProductionCycle", productionCycleSchema);

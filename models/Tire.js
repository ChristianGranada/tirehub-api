const tireSchema = new mongoose.Schema({
  basicInfo: {
    internalCode: {
      type: String,
      unique: true,
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    size: {
      type: String,
      required: true,
      trim: true,
    },

    dot: {
      type: String,
      required: true,
      trim: true,
    },

    treadDesign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TreadDesign",
      required: true,
    },

    estimatedDeliveryDate: {
      type: Date,
      required: true,
    },

    currentStage: {
      type: String,
      enum: require("../config/processStages"),
      default: "INITIAL_INSPECTION",
    },

    status: {
      type: String,
      enum: ["IN_PROCESS", "REJECTED", "FINISHED"],
      default: "IN_PROCESS",
    },
  },

  inspection: {
    operator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    startedAt: {
      type: Date,
      default: null,
    },

    finishedAt: {
      type: Date,
      default: null,
    },

    approved: {
      type: Boolean,
      default: null,
    },

    tireCondition: {
      type: String,

      enum: ["VERY_GOOD", "REGULAR", "BAD"],
    },

    selectedTreadDesign: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "TreadDesign",
    },

    rejectionCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RejectionCode",
      default: null,
    },
  },

  buffing: {
    operator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    startedAt: {
      type: Date,
      default: null,
    },

    finishedAt: {
      type: Date,
      default: null,
    },

    approved: {
      type: Boolean,
      default: null,
    },

    inflationPressure: {
      type: Number,
      default: null,
    },

    buffingRadius: {
      type: Number,
      default: null,
    },

    remainingRubberDepth: {
      type: Number,
      default: null,
    },

    tirePerimeter: {
      type: Number,
      default: null,
    },

    treadDesign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TreadDesign",
      default: null,
    },

    treadWidth: {
      type: Number,
      default: null,
    },

    texture: {
      type: Number,
      default: null,
    },

    protectiveBeltRemoved: {
      type: Boolean,
      default: null,
    },

    rejectionCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RejectionCode",
      default: null,
    },
  },

  carding: {
    operator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    startedAt: {
      type: Date,
      default: null,
    },

    finishedAt: {
      type: Date,
      default: null,
    },

    approved: {
      type: Boolean,
      default: null,
    },

    rejectionCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RejectionCode",
      default: null,
    },
  },

  repair: {
    operator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    startedAt: {
      type: Date,
      default: null,
    },

    finishedAt: {
      type: Date,
      default: null,
    },

    approved: {
      type: Boolean,
      default: null,
    },

    rejectionCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RejectionCode",
      default: null,
    },

    patches: [
      {
        patchReference: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "PatchReference",
        },

        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],

    majorRepair: {
      type: Boolean,
      default: false,
    },
  },

  cementing: {
    operator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    startedAt: {
      type: Date,
      default: null,
    },

    finishedAt: {
      type: Date,
      default: null,
    },

    approved: {
      type: Boolean,
      default: null,
    },

    rejectionCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RejectionCode",
      default: null,
    },
  },

  treadCutting: {
    operator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    startedAt: {
      type: Date,
      default: null,
    },

    finishedAt: {
      type: Date,
      default: null,
    },

    approved: {
      type: Boolean,
      default: null,
    },

    rejectionCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RejectionCode",
      default: null,
    },

    treadDesign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TreadDesign",
      default: null,
    },

    treadWidth: {
      type: Number,
      default: null,
    },

    tirePerimeter: {
      type: Number,
      default: null,
    },

    beltLength: {
      type: Number,
      default: null,
    },

    beltWeight: {
      type: Number,
      default: null,
    },

    cushionUsed: {
      type: Boolean,
      default: null,
    },

    cushionWeight: {
      type: Number,
      default: null,
    },
  },

  filling: {
    operator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    startedAt: {
      type: Date,
      default: null,
    },

    finishedAt: {
      type: Date,
      default: null,
    },

    approved: {
      type: Boolean,
      default: null,
    },

    rejectionCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RejectionCode",
      default: null,
    },

    fillerWeight: {
      type: Number,
      default: null,
    },
  },

  building: {
    operator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    startedAt: {
      type: Date,
      default: null,
    },

    finishedAt: {
      type: Date,
      default: null,
    },

    approved: {
      type: Boolean,
      default: null,
    },

    rejectionCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RejectionCode",
      default: null,
    },

    cushionWeight: {
      type: Number,
      default: null,
    },

    inflationPressure: {
      type: Number,
      default: null,
    },

    stitchingPressure: {
      type: Number,
      default: null,
    },
  },

  assembly: {
    operator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    startedAt: {
      type: Date,
      default: null,
    },

    finishedAt: {
      type: Date,
      default: null,
    },

    approved: {
      type: Boolean,
      default: null,
    },

    rejectionCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RejectionCode",
      default: null,
    },

    assemblySystem: {
      type: String,
      enum: ["INNERLOPE", "RIM"],
      default: null,
    },

    envelopeNumber: {
      type: String,
      default: null,
    },

    innerlopeNumber: {
      type: String,
      default: null,
    },

    assignedChamber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CuringChamber",
      default: null,
    },
  },

  curing: {
    operator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    startedAt: {
      type: Date,
      default: null,
    },

    finishedAt: {
      type: Date,
      default: null,
    },

    approved: {
      type: Boolean,
      default: null,
    },

    rejectionCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RejectionCode",
      default: null,
    },

    productionCycle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductionCycle",
      default: null,
    },
  },

  finalInspection: {
    operator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    startedAt: {
      type: Date,
      default: null,
    },

    finishedAt: {
      type: Date,
      default: null,
    },

    approved: {
      type: Boolean,
      default: null,
    },

    rejectionCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RejectionCode",
      default: null,
    },

    releaseWithObservation: {
      type: Boolean,
      default: null,
    },

    observation: {
      type: String,
      trim: true,
      default: null,
    },

    reprocessStage: {
      type: String,
      enum: require("../config/processStages"),
      default: null,
    },
  },

  reprocess: {
    authorizedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    fromStage: {
      type: String,
      enum: require("../config/processStages"),
      default: null,
    },

    toStage: {
      type: String,
      enum: require("../config/processStages"),
      default: null,
    },

    reason: {
      type: String,
      trim: true,
      default: null,
    },

    authorizedAt: {
      type: Date,
      default: null,
    },
  },
});

const mongoose = require("mongoose");

const REJECTION_CODES = [
  {
    code: "101",
    description:
      "Daños en pestaña con cuerdas expuestas, oxidación y/o cortes que afecten estructura.",
  },
  {
    code: "102",
    description: "Daños por sobrecalentamiento y cristalización.",
  },
  {
    code: "103",
    description:
      "Arrancamientos con exposición de estructura, desgaste del caucho o deformaciones.",
  },
  {
    code: "104",
    description:
      "Fisuras circunferenciales, protuberancias o depresiones que coincidan con zona de volteo.",
  },
  {
    code: "105",
    description: "Asentamiento de pestaña por técnicas inadecuadas de montaje.",
  },
  {
    code: "106",
    description: "Reparaciones inadecuadas en zona de pestaña y volteo.",
  },

  {
    code: "201",
    description:
      "Reparaciones fuera de especificación según tabla de aplicación actualizada VIPAL.",
  },
  {
    code: "202",
    description: "Empalmes abiertos, fisuras repetitivas y/o separaciones.",
  },
  {
    code: "203",
    description: "Daños que originen traslape de unidades de reparación.",
  },
  { code: "204", description: "Exceso de reparaciones." },
  { code: "205", description: "Rodado a baja presión o sobrecarga." },
  {
    code: "206",
    description:
      "Reparaciones anteriores en mal estado o no efectuadas técnicamente.",
  },
  {
    code: "207",
    description:
      "Daños que requieran más de una reparación sobre la misma cuerda radial.",
  },

  {
    code: "301",
    description:
      "Reparaciones fuera de especificación según tabla de aplicación actualizada VIPAL.",
  },
  {
    code: "302",
    description:
      "Reparaciones anteriores en mal estado o no efectuadas técnicamente.",
  },
  {
    code: "303",
    description:
      "Despegues o separaciones entre el caucho y las lonas o cinturón estructural.",
  },
  {
    code: "304",
    description:
      "Protuberancias o deformaciones no reparables, como cuerdas rotas o sueltas.",
  },
  {
    code: "305",
    description: "Fisuras radiales repetitivas a lo largo de los costados.",
  },
  {
    code: "306",
    description:
      "Daños por rozamiento excesivo que expongan material estructural.",
  },
  { code: "307", description: "Envejecimiento." },
  {
    code: "308",
    description:
      "Contaminación por fluidos (aceites, hidrocarburos y/o productos químicos).",
  },

  {
    code: "401",
    description:
      "Reparaciones fuera de especificación según tabla de aplicación actualizada VIPAL.",
  },
  { code: "402", description: "Separaciones entre lonas o cinturones." },
  { code: "403", description: "Exposición excesiva de lonas (diagonal)." },
  {
    code: "405",
    description:
      "Regrabados profundos que afecten o expongan cinturones estructurales.",
  },
  {
    code: "406",
    description:
      "Demasiados cortes en corona, con exposición de cinturones y presencia excesiva de oxidación.",
  },

  {
    code: "501",
    description: "Devolución por solicitud del cliente antes de proceso.",
  },
  { code: "502", description: "Devolución por inexistencia de diseño." },
  { code: "503", description: "Otros." },
];

const tireSchema = new mongoose.Schema(
  {
    internalCode: {
      type: String,
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

    selectedTreadDesign: {
      type: String,
      required: true,
      trim: true,
    },

    processStatus: {
      type: String,
      enum: [
        "RECEIVED",
        "INSPECTION",
        "BUFFING",
        "REPAIR",
        "BUILDING",
        "CURING",
        "FINAL_INSPECTION",
        "READY_FOR_DELIVERY",
        "DELIVERED",
        "REJECTED",
      ],
      default: "RECEIVED",
    },

    processHistory: [
      {
        stage: String,

        completedAt: {
          type: Date,
          default: Date.now,
        },

        observations: String,
      },
    ],

    observations: {
      type: String,
      default: "",
    },

    rejectionCode: {
      code: {
        type: String,
        enum: REJECTION_CODES.map((item) => item.code),
        default: null,
      },

      description: {
        type: String,
        default: null,
      },
    },
  },
  {
    _id: true,
  },
);

const workOrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    estimatedDeliveryDate: {
      type: Date,
      required: true,
    },

    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "URGENT"],
      default: "MEDIUM",
    },

    scheduledPosition: {
      type: Number,
      default: null,
    },

    status: {
      type: String,
      enum: ["PENDING", "IN_PRODUCTION", "READY", "DELIVERED", "CANCELLED"],
      default: "PENDING",
    },

    tires: {
      type: [tireSchema],

      validate: {
        validator: function (value) {
          return value.length > 0 && value.length <= 10;
        },

        message: "A work order must contain between 1 and 10 tires",
      },
    },

    observations: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("WorkOrder", workOrderSchema);

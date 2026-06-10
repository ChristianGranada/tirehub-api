const WorkOrder = require("../models/WorkOrder");
const Client = require("../models/Client");

// Crear orden
const createWorkOrder = async (req, res) => {
  try {
    const clientExists = await Client.findById(req.body.client);

    if (!clientExists) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    const workOrder = await WorkOrder.create(req.body);

    res.status(201).json(workOrder);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Obtener todas las órdenes
const getWorkOrders = async (req, res) => {
  try {
    const orders = await WorkOrder.find()
      .populate("client")
      .populate("createdBy");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Obtener orden por id
const getWorkOrderById = async (req, res) => {
  try {
    const order = await WorkOrder.findById(req.params.id)
      .populate("client")
      .populate("createdBy");

    if (!order) {
      return res.status(404).json({
        message: "Work order not found",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Órdenes urgentes
const getUrgentOrders = async (req, res) => {
  try {
    const orders = await WorkOrder.find({
      priority: "URGENT",
    }).populate("client");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Cola de producción
const getProductionQueue = async (req, res) => {
  try {
    const orders = await WorkOrder.find({
      status: {
        $in: ["PENDING", "IN_PRODUCTION"],
      },
    })
      .sort({
        scheduledPosition: 1,
      })
      .populate("client");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Programar orden
const scheduleWorkOrder = async (req, res) => {
  try {
    const order = await WorkOrder.findByIdAndUpdate(
      req.params.id,
      {
        scheduledPosition: req.body.scheduledPosition,
      },
      {
        new: true,
      },
    );

    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Cambiar prioridad
const updatePriority = async (req, res) => {
  try {
    const order = await WorkOrder.findByIdAndUpdate(
      req.params.id,
      {
        priority: req.body.priority,
      },
      {
        new: true,
      },
    );

    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Cambiar estado de orden
const updateWorkOrderStatus = async (req, res) => {
  try {
    const order = await WorkOrder.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      },
    );

    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getWorkOrdersByClient = async (req, res) => {
  try {
    const orders = await WorkOrder.find({
      client: req.params.clientId,
    }).populate("client");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getUpcomingDeliveries = async (req, res) => {
  try {
    const today = new Date();

    const nextWeek = new Date();

    nextWeek.setDate(today.getDate() + 7);

    const orders = await WorkOrder.find({
      estimatedDeliveryDate: {
        $gte: today,
        $lte: nextWeek,
      },
    }).populate("client");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const searchWorkOrders = async (req, res) => {
  try {
    const { q } = req.query;

    const orders = await WorkOrder.find({
      $or: [
        {
          orderNumber: {
            $regex: q,
            $options: "i",
          },
        },
        {
          status: {
            $regex: q,
            $options: "i",
          },
        },
        {
          priority: {
            $regex: q,
            $options: "i",
          },
        },
      ],
    }).populate("client");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateWorkOrder = async (req, res) => {
  try {
    const order = await WorkOrder.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      return res.status(404).json({
        message: "Work order not found",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const deleteWorkOrder = async (req, res) => {
  try {
    const order = await WorkOrder.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Work order not found",
      });
    }

    res.status(200).json({
      message: "Work order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTireById = async (req, res) => {
  try {
    const workOrder = await WorkOrder.findById(req.params.orderId);

    if (!workOrder) {
      return res.status(404).json({
        message: "Work order not found",
      });
    }

    const tire = workOrder.tires.id(req.params.tireId);

    if (!tire) {
      return res.status(404).json({
        message: "Tire not found",
      });
    }

    res.status(200).json(tire);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateTireStatus = async (req, res) => {
  try {
    const workOrder = await WorkOrder.findById(req.params.orderId);

    const tire = workOrder.tires.id(req.params.tireId);

    if (!tire) {
      return res.status(404).json({
        message: "Tire not found",
      });
    }

    tire.processStatus = req.body.processStatus;

    await workOrder.save();

    res.status(200).json(tire);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const rejectTire = async (req, res) => {
  try {
    const workOrder = await WorkOrder.findById(req.params.orderId);

    const tire = workOrder.tires.id(req.params.tireId);

    if (!tire) {
      return res.status(404).json({
        message: "Tire not found",
      });
    }

    tire.processStatus = "REJECTED";

    tire.rejectionCode = req.body.code;

    tire.rejectionObservation = req.body.observation;

    await workOrder.save();

    res.status(200).json(tire);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addTireObservation = async (req, res) => {
  try {
    const workOrder = await WorkOrder.findById(req.params.orderId);

    if (!workOrder) {
      return res.status(404).json({
        message: "Work order not found",
      });
    }

    const tire = workOrder.tires.id(req.params.tireId);

    if (!tire) {
      return res.status(404).json({
        message: "Tire not found",
      });
    }

    tire.observations = req.body.observations;

    await workOrder.save();

    res.status(200).json(tire);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getRejectedTires = async (req, res) => {
  try {
    const workOrders = await WorkOrder.find();

    const rejectedTires = [];

    workOrders.forEach((order) => {
      order.tires.forEach((tire) => {
        if (tire.processStatus === "REJECTED") {
          rejectedTires.push({
            workOrderId: order._id,
            orderNumber: order.orderNumber,
            tire,
          });
        }
      });
    });

    res.status(200).json(rejectedTires);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getPendingTires = async (req, res) => {
  try {
    const workOrders = await WorkOrder.find();

    const pendingTires = [];

    workOrders.forEach((order) => {
      order.tires.forEach((tire) => {
        if (tire.processStatus === "PENDING") {
          pendingTires.push({
            workOrderId: order._id,
            orderNumber: order.orderNumber,
            tire,
          });
        }
      });
    });

    res.status(200).json(pendingTires);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTiresInProduction = async (req, res) => {
  try {
    const workOrders = await WorkOrder.find();

    const tires = [];

    workOrders.forEach((order) => {
      order.tires.forEach((tire) => {
        if (tire.processStatus === "IN_PROCESS") {
          tires.push({
            workOrderId: order._id,
            orderNumber: order.orderNumber,
            tire,
          });
        }
      });
    });

    res.status(200).json(tires);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getCompletedTires = async (req, res) => {
  try {
    const workOrders = await WorkOrder.find();

    const completedTires = [];

    workOrders.forEach((order) => {
      order.tires.forEach((tire) => {
        if (tire.processStatus === "COMPLETED") {
          completedTires.push({
            workOrderId: order._id,
            orderNumber: order.orderNumber,
            tire,
          });
        }
      });
    });

    res.status(200).json(completedTires);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createWorkOrder,
  getWorkOrders,
  getWorkOrderById,
  updateWorkOrder,
  getUrgentOrders,
  getProductionQueue,
  scheduleWorkOrder,
  updatePriority,
  updateWorkOrderStatus,
  getWorkOrdersByClient,
  getUpcomingDeliveries,
  searchWorkOrders,
  getTireById,
  updateTireStatus,
  rejectTire,
  deleteWorkOrder,
  addTireObservation,
  getRejectedTires,
  getPendingTires,
  getTiresInProduction,
  getCompletedTires,
};

const WorkOrder = require("../models/WorkOrder");

const getWorkOrders = async (req, res) => {
  try {
    const workOrders = await WorkOrder.find()
      .populate("client")
      .populate("tire");

    res.status(200).json(workOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getWorkOrderById = async (req, res) => {
  try {
    const workOrder = await WorkOrder.findById(req.params.id)
      .populate("client")
      .populate("tire");

    if (!workOrder) {
      return res.status(404).json({
        message: "Work order not found",
      });
    }

    res.status(200).json(workOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createWorkOrder = async (req, res) => {
  try {
    const workOrder = new WorkOrder(req.body);

    const savedWorkOrder = await workOrder.save();

    res.status(201).json(savedWorkOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateWorkOrder = async (req, res) => {
  try {
    const updatedWorkOrder = await WorkOrder.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedWorkOrder) {
      return res.status(404).json({
        message: "Work order not found",
      });
    }

    res.status(200).json(updatedWorkOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteWorkOrder = async (req, res) => {
  try {
    const deletedWorkOrder = await WorkOrder.findByIdAndDelete(req.params.id);

    if (!deletedWorkOrder) {
      return res.status(404).json({
        message: "Work order not found",
      });
    }

    res.status(200).json({
      message: "Work order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getWorkOrders,
  getWorkOrderById,
  createWorkOrder,
  updateWorkOrder,
  deleteWorkOrder,
};

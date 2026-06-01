const express = require("express");
const router = express.Router();

const {
  getWorkOrders,
  getWorkOrderById,
  createWorkOrder,
  updateWorkOrder,
  deleteWorkOrder,
} = require("../controllers/workOrderController");

router.get("/", getWorkOrders);
router.get("/:id", getWorkOrderById);
router.post("/", createWorkOrder);
router.put("/:id", updateWorkOrder);
router.delete("/:id", deleteWorkOrder);

module.exports = router;
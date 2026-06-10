const express = require("express");

const router = express.Router();

const {
  createWorkOrder,
  getWorkOrders,
  getWorkOrderById,
  updateWorkOrder,
  deleteWorkOrder,
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
  addTireObservation,
  getRejectedTires,
  getPendingTires,
  getTiresInProduction,
  getCompletedTires,
} = require("../controllers/workOrderController");

// ======================
// SPECIAL SEARCHES
// ======================

router.get("/search", searchWorkOrders);

router.get("/urgent", getUrgentOrders);

router.get("/production-queue", getProductionQueue);

router.get("/upcoming-deliveries", getUpcomingDeliveries);

router.get("/client/:clientId", getWorkOrdersByClient);

// ======================
// TIRE VIEWS
// ======================

router.get("/tires/rejected", getRejectedTires);

router.get("/tires/pending", getPendingTires);

router.get("/tires/in-production", getTiresInProduction);

router.get("/tires/completed", getCompletedTires);

// ======================
// CRUD WORK ORDERS
// ======================

router.post("/", createWorkOrder);

router.get("/", getWorkOrders);

router.put("/:id", updateWorkOrder);

router.delete("/:id", deleteWorkOrder);

router.patch("/:id/schedule", scheduleWorkOrder);

router.patch("/:id/priority", updatePriority);

router.patch("/:id/status", updateWorkOrderStatus);

// ======================
// TIRES INSIDE WORK ORDER
// ======================

router.get("/:orderId/tires/:tireId", getTireById);

router.patch("/:orderId/tires/:tireId/status", updateTireStatus);

router.patch("/:orderId/tires/:tireId/reject", rejectTire);

router.patch("/:orderId/tires/:tireId/observation", addTireObservation);

// ======================
// MUST BE LAST
// ======================

router.get("/:id", getWorkOrderById);

module.exports = router;

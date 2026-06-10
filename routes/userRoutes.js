const express = require("express");

const router = express.Router();

const {
  createUser,
  getUsers,
  getUserById,
  searchUsers,
  getOperators,
  getPlantManagers,
  getLogisticsManagers,
  deactivateUser,
  activateUser,
} = require("../controllers/userController");

// CRUD
router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);

// Search
router.get("/search/query", searchUsers);

// Roles
router.get("/operators/all", getOperators);
router.get("/plant-managers/all", getPlantManagers);
router.get("/logistics-managers/all", getLogisticsManagers);

// Status
router.patch("/:id/deactivate", deactivateUser);
router.patch("/:id/activate", activateUser);

module.exports = router;

const express = require("express");

const router = express.Router();

const {
  createClient,
  getClients,
  getClientById,
  getActiveClients,
  updateClient,
  deactivateClient,
  activateClient,
  searchClients,
} = require("../controllers/clientController");

// CRUD
router.post("/", createClient);
router.get("/", getClients);
router.get("/:id", getClientById);
router.put("/:id", updateClient);

// Search
router.get("/search/query", searchClients);

// Active clients
router.get("/active/all", getActiveClients);

// Status
router.patch("/:id/deactivate", deactivateClient);
router.patch("/:id/activate", activateClient);

module.exports = router;

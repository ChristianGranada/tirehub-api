const express = require("express");
const router = express.Router();

const {
  getTires,
  getTireById,
  createTire,
  updateTire,
  deleteTire,
} = require("../controllers/tireController");

router.get("/", getTires);
router.get("/:id", getTireById);
router.post("/", createTire);
router.put("/:id", updateTire);
router.delete("/:id", deleteTire);

module.exports = router;
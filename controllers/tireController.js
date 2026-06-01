const Tire = require("../models/Tire");

const getTires = async (req, res) => {
  try {
    const tires = await Tire.find().populate("client");

    res.status(200).json(tires);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTireById = async (req, res) => {
  try {
    const tire = await Tire.findById(req.params.id).populate("client");

    if (!tire) {
      return res.status(404).json({
        message: "Tire not found",
      });
    }

    res.status(200).json(tire);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTire = async (req, res) => {
  try {
    const tire = new Tire(req.body);

    const savedTire = await tire.save();

    res.status(201).json(savedTire);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTire = async (req, res) => {
  try {
    const updatedTire = await Tire.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTire) {
      return res.status(404).json({
        message: "Tire not found",
      });
    }

    res.status(200).json(updatedTire);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTire = async (req, res) => {
  try {
    const deletedTire = await Tire.findByIdAndDelete(req.params.id);

    if (!deletedTire) {
      return res.status(404).json({
        message: "Tire not found",
      });
    }

    res.status(200).json({
      message: "Tire deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTires,
  getTireById,
  createTire,
  updateTire,
  deleteTire,
};

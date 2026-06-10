const User = require("../models/User");

// Crear usuario
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Obtener usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Obtener usuario por id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Obtener operadores
const getOperators = async (req, res) => {
  try {
    const users = await User.find({
      rol: "OPERATOR",
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Obtener jefes de planta
const getPlantManagers = async (req, res) => {
  try {
    const users = await User.find({
      rol: "PLANT_MANAGER",
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Obtener logística
const getLogisticsManagers = async (req, res) => {
  try {
    const users = await User.find({
      rol: "LOGISTICS_MANAGER",
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Desactivar usuario
const deactivateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        active: false,
      },
      {
        new: true,
      },
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;

    const users = await User.find({
      $or: [
        {
          nombre: {
            $regex: q,
            $options: "i",
          },
        },
        {
          email: {
            $regex: q,
            $options: "i",
          },
        },
        {
          rol: {
            $regex: q,
            $options: "i",
          },
        },
      ],
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const activateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        active: true,
      },
      {
        new: true,
      },
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  searchUsers,
  getOperators,
  getPlantManagers,
  getLogisticsManagers,
  deactivateUser,
  activateUser,
};

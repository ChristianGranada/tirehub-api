const Client = require("../models/Client");

// Crear cliente
const createClient = async (req, res) => {
  try {
    const client = await Client.create(req.body);

    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Obtener todos los clientes
const getClients = async (req, res) => {
  try {
    const clients = await Client.find();

    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Obtener cliente por id
const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Obtener clientes activos
const getActiveClients = async (req, res) => {
  try {
    const clients = await Client.find({
      active: true,
    });

    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Actualizar cliente
const updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!client) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    res.status(200).json(client);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Desactivar cliente
const deactivateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      {
        active: false,
      },
      {
        new: true,
      },
    );

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Activar cliente
const activateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      {
        active: true,
      },
      {
        new: true,
      },
    );

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const searchClients = async (req, res) => {
  try {
    const { q } = req.query;

    const clients = await Client.find({
      $or: [
        {
          companyName: {
            $regex: q,
            $options: "i",
          },
        },
        {
          documentNumber: {
            $regex: q,
            $options: "i",
          },
        },
        {
          contactName: {
            $regex: q,
            $options: "i",
          },
        },
      ],
    });

    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createClient,
  getClients,
  getClientById,
  getActiveClients,
  updateClient,
  deactivateClient,
  activateClient,
  searchClients,
};

const Center = require("../models").Center;

const create = async (req, res) => {
  try {
    const center = {
      idCenter: req.body.idCenter,
      nameOfCenter: req.body.nameOfCenter,
      location: req.body.location,
    };

    const data = await Center.create(center);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const findAll = async (req, res) => {
  try {
    const data = await Center.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const findOne = async (req, res) => {
  try {
    const id = req.params.idCenter;

    const data = await Center.findByPk(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const update = async (req, res) => {
  try {
    const idCenter = req.params.idCenter;

    const data = await Center.update(req.body, { where: { idCenter } });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const remove = async (req, res) => {
  try {
    const idCenter = req.params.idCenter;

    const data = await Center.destroy({ where: { idCenter } });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { create, findAll, findOne, update, remove };

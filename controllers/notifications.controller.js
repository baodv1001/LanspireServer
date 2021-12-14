const Notifications = require('../models').Notifications;

const create = async (req, res) => {
  try {
    const data = await Notifications.create(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const findAll = async (req, res) => {
  try {
    const data = await Notifications.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const findOne = async (req, res) => {
  try {
    const idNotification = req.params.idNotification;

    const data = await Notifications.findByPk(idNotification);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const update = async (req, res) => {
  try {
    const idNotification = req.params.idNotification;

    const data = await Notifications.update(req.body, { where: { idNotification } });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const remove = async (req, res) => {
  try {
    const idNotification = req.params.idNotification;

    const data = await Notifications.destroy({ where: { idNotification } });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { create, findAll, findOne, update, remove };

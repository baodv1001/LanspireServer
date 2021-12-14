const Noti_Account = require('../models').Noti_Account;

const create = async (req, res) => {
  try {
    const data = await Noti_Account.create(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const findAll = async (req, res) => {
  try {
    const data = await Noti_Account.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const findOne = async (req, res) => {
  try {
    const idNotification = req.params.idNotiAccount;
    const data = await Noti_Account.findByPk(idNotification);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const update = async (req, res) => {
  try {
    const idNotification = req.params.idNotiAccount;
    const data = await Noti_Account.update(req.body, { where: { idNotification } });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const remove = async (req, res) => {
  try {
    const idNotification = req.params.idNotiAccount;
    const data = await Noti_Account.destroy({ where: { idNotification } });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { create, findAll, findOne, update, remove };

const Teaching = require('../models').Teaching;

const create = async (req, res) => {
  try {
    const teaching = {
      idLecturer: req.body.idLecturer,
      idClass: req.body.idClass,
    };

    const data = await Teaching.create(teaching);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const findAll = async (req, res) => {
  try {
    const data = await Teaching.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const findOne = async (req, res) => {
  try {
    const idLecturer = req.params.idTeaching;

    const data = Teaching.findByPk(idLecturer);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const update = async (req, res) => {
  try {
    const idLecturer = req.params.idTeaching;

    const data = Teaching.update(req.body, { where: { idLecturer } });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const remove = async (req, res) => {
  try {
    const idLecturer = req.params.idTeaching;

    const data = Teaching.destroy({ where: idLecturer });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { create, findAll, findOne, update, remove };

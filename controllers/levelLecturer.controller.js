const LevelLecturer = require('../models').LevelLecturer;

const create = async (req, res) => {
  try {
    const levelLecturer = {
      idLecturer: req.body.idLecturer,
      idLevel: req.body.idLevel,
    };

    const data = await LevelLecturer.create(levelLecturer);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const findAll = async (req, res) => {
  try {
    const data = await LevelLecturer.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const findOne = async (req, res) => {
  try {
    const idLevelLecturer = req.params.idLevelLecturer;

    const data = await LevelLecturer.findByPk(idLevelLecturer);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const update = async (req, res) => {
  try {
    const idLevelLecturer = req.params.idLevelLecturer;

    const data = await LevelLecturer.update(req.body, { where: { idLevelLecturer } });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const remove = async (req, res) => {
  try {
    const idLevelLecturer = req.params.idLevelLecturer;

    const data = await LevelLecturer.destrou({ where: { idLevelLecturer } });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { create, findAll, findOne, update, remove };

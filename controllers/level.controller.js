const { Level } = require('../models');

const create = async (req, res) => {
  try {
    const level = {
      idCourseType: req.body.idCourseType,
      point: req.body.point,
    };

    const data = await Level.create(level);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const findAll = async (req, res) => {
  try {
    const data = await Level.findAll({
      include: [
        {
          model: CourseType,
        },
      ],
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const findOne = async (req, res) => {
  try {
    const idLevel = req.params.idLevel;

    const data = await Level.findByPk(idLevel);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const update = async (req, res) => {
  try {
    const idLevel = req.params.idLevel;

    const data = await Level.update(req.body, { where: { idLevel } });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const remove = async (req, res) => {
  try {
    const idLevel = req.params.idLevel;

    const data = await Level.destroy({ where: { idLevel } });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { create, findAll, findOne, update, remove };

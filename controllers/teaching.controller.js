const { Teaching, Lecturer, Class } = require('../models');

const create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }
  const teaching = {
    idLecturer: req.body.idLecturer,
    idClass: req.body.idClass,
  };
  Teaching.create(teaching)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Teaching.',
      });
    });
  // Teaching.bulkCreate(req.body, { returning: true })
  //   .then(data => {
  //     res.send(data);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message: err.message || 'Some error occurred while creating the Teaching.',
  //     });
  //   });
};

const findAll = (req, res) => {
  Teaching.findAll({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving from database.',
      });
    });
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

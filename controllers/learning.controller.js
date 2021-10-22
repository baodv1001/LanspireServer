const { Learning } = require('../models');

const create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a new learning
  const newObj = {
    idStudent: req.body.idStudent,
    idClass: req.body.idClass,
    idExam: req.body.idExam,
    score: req.body.score,
  };
  // Save a new learning in the database
  Learning.create(newObj)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Learning.',
      });
    });
};

// Retrieve all
const findAll = (req, res) => {
  Learning.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving from database.',
      });
    });
};

// Find with an id
const findOne = (req, res) => {
  const idClass = req.params.idClass;
  const idStudent = req.params.idStudent;
  const idExam = req.params.idExam;

  Learning.findOne({ where: { idClass: idClass, idExam: idExam, idStudent: idStudent } })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Learning.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving Learning',
      });
    });
};

// Update a Learning by the id in the request
const update = (req, res) => {
  const idClass = req.params.idClass;
  const idStudent = req.params.idStudent;
  const idExam = req.params.idExam;

  Learning.update(req.body, {
    where: { idClass: idClass, idExam: idExam, idStudent: idStudent },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Learning was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Learning. Maybe Learning was not found or req.body is empty!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating Learning',
      });
    });
};

// Delete a Learning with the specified id in the request
const remove = (req, res) => {
  const idClass = req.params.idClass;
  const idStudent = req.params.idStudent;
  const idExam = req.params.idExam;

  Learning.destroy({
    where: { idClass: idClass, idExam: idExam, idStudent: idStudent },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Learning was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Learning. Maybe Learning was not found!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete Learning',
      });
    });
};

module.exports = { create, findAll, findOne, update, remove };

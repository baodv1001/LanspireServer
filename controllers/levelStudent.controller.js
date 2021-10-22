const { LevelStudent } = require('../models');

const create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a LevelStudent
  const levelStudent = {
    idStudent: req.body.idStudent,
    idLevel: req.body.idLevel,
  };
  // Save LevelStudent in the database
  LevelStudent.create(levelStudent)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the LevelStudent.',
      });
    });
};

// Retrieve all LevelStudent from the database.
const findAll = (req, res) => {
  LevelStudent.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving LevelStudent.',
      });
    });
};

// Find a single LevelStudent with an id
const findOne = (req, res) => {
  const idStudent = req.params.idStudent;
  const idLevel = req.params.idLevel;

  LevelStudent.findOne({ where: { idStudent: idStudent, idLevel: idLevel } })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find LevelStudent`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving LevelStudent`,
      });
    });
};

// Update a LevelStudent by the id in the request
const update = (req, res) => {
  const idStudent = req.params.idStudent;
  const idLevel = req.params.idLevel;

  LevelStudent.findOne({ where: { idStudent: idStudent, idLevel: idLevel } })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'LevelStudent was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update LevelStudent. Maybe LevelStudent was not found or req.body is empty!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating LevelStudent`,
      });
    });
};

// Delete a LevelStudent with the specified id in the request
const remove = (req, res) => {
  const idStudent = req.params.idStudent;
  const idLevel = req.params.idLevel;

  LevelStudent.findOne({ where: { idStudent: idStudent, idLevel: idLevel } })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'LevelStudent was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete LevelStudent. Maybe LevelStudent was not found or req.body is empty!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error deleting LevelStudent`,
      });
    });
};
module.exports = { create, findAll, findOne, update, remove };

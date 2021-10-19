const db = require('../models');
const Column_Course = db.Column_Course;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a new object
  const newObj = {
    idColumn: req.body.idColumn,
    idCourse: req.body.idCourse,
  };
  // Save
  Column_Course.create(newObj)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Column_Course.',
      });
    });
};

// Retrieve all.
exports.findAll = (req, res) => {
  Column_Course.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Column_Course',
      });
    });
};

// Find with an id
exports.findOne = (req, res) => {
  const idColumn = req.params.idColumn;
  const idCourse = req.params.idCourse;

  Column_Course.findOne({ where: { idColumn: idColumn, idCourse: idCourse } })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find Column_Course',
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving Column_Course',
      });
    });
};

// Update by the id in the request
exports.update = (req, res) => {
  const idColumn = req.params.idColumn;
  const idCourse = req.params.idCourse;

  Column_Course.update(req.body, {
    where: { idColumn: idColumn, idCourse: idCourse },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Column_Course was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Column_Course. Maybe Column_Course was not found or req.body is empty!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating Column_Course',
      });
    });
};

// Delete
exports.delete = (req, res) => {
  const idColumn = req.params.idColumn;
  const idCourse = req.params.idCourse;

  Column_Course.update(req.body, {
    where: { idColumn: idColumn, idCourse: idCourse },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Column_Course was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Column_Course. Maybe Column_Course was not found!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete Column_Course',
      });
    });
};

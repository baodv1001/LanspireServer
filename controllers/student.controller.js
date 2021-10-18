const db = require('../models');
const Student = db.Student;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a Student
  const student = {
    idPersionalInfo: req.body.idPersionalInfo,
  };
  // Save Student in the database
  Student.create(student)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Student.',
      });
    });
};

// Retrieve all Students from the database.
exports.findAll = (req, res) => {
  Student.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving students.',
      });
    });
};

// Find a single Student with an id
exports.findOne = (req, res) => {
  const idStudent = req.params.idStudent;

  Student.findByPk(idStudent)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Student with idStudent=${idStudent}.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Error retrieving Student with id=' + idStudent,
      });
    });
};

// Update a Student by the id in the request
exports.update = (req, res) => {
  const idStudent = req.params.idStudent;

  Student.update(req.body, {
    where: { idStudent: idStudent },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Student was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Student with id=${idStudent}. Maybe Student was not found or req.body is empty!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Error updating Student with id=' + idStudent,
      });
    });
};

// Delete a Student with the specified id in the request
exports.delete = (req, res) => {
  const idStudent = req.params.idStudent;

  Student.destroy({
    where: { idStudent: idStudent },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Student was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Student with id=${idStudent}. Maybe Student was not found!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Could not delete Student with id=' + idStudent,
      });
    });
};

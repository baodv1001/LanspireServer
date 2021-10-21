const { Student, User } = require('../models');

const create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a Student
  const student = {
    idUser: req.body.idUser,
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
const findAll = (req, res) => {
  Student.findAll({ include: [{ model: User }] })
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
const findOne = (req, res) => {
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
const update = (req, res) => {
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
const remove = (req, res) => {
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

module.exports = { create, findAll, findOne, update, remove };

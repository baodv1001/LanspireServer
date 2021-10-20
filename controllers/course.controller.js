const Course = require('../models').Course;
const TypeOfCourse = require('../models').TypeOfCourse;
const create = (req, res) => {
  // Validate request
  if (!req.body.idTypeOfCourse) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a Course
  const course = {
    // idCourse: req.body.idCourse,
    nameOfCourse: req.body.nameOfCourse,
    idLevel: req.body.idLevel,
    idTypeOfCourse: req.body.idTypeOfCourse,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    fee: req.body.fee,
    isDeleted: req.body.isDeleted,
  };
  // Save Course in the database
  Course.create(course)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Course.',
      });
    });
};

// Retrieve all course from the database.
const findAll = (req, res) => {
  Course.findAll({
    include: [
      {
        model: TypeOfCourse,
        as: 'typeofcourse',
      },
    ],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving course.',
      });
    });
};

// Find a single course with an id
const findOne = (req, res) => {
  const idCourse = req.params.idCourse;

  Course.findByPk(idCourse, {
    include: [
      {
        model: TypeOfCourse,
        as: 'typeOfCourse',
      },
    ],
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Course with idcourse=${idCourse}.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving course with idcourse=' + idCourse,
      });
    });
};

// Update a course by the id in the request
const update = (req, res) => {
  const idCourse = req.params.idCourse;

  Course.update(req.body, {
    where: { idCourse: idCourse },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'course was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update course with idcourse=${idCourse}. Maybe course was not found or req.body is empty!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating course with idcourse=' + idCourse,
      });
    });
};

// Delete a course with the specified id in the request
const remove = (req, res) => {
  const idCourse = req.params.idCourse;

  Course.destroy({
    where: { idCourse: idCourse },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'course was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete course with id=${idCourse}. Maybe course was not found!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete course with idcourse=' + idCourse,
      });
    });
};
module.exports = { create, findOne, findAll, update, remove };

const db = require('../models');
const Course = db.Course;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.idcourse) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a Course
  const course = {
    idcourse: req.body.idcourse,
    nameofcourse: req.body.nameofcourse,
    idlevel: req.body.idlevel,
    startdate: req.body.startdate,
    enddate: req.body.enddate,
    fee: req.body.fee,
    isdeleted: req.body.isdeleted,
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
exports.findAll = (req, res) => {
  Course.findAll()
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
exports.findOne = (req, res) => {
  const idCourse = req.params.idcourse;

  Course.findByPk(idCourse)
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
exports.update = (req, res) => {
  const idCourse = req.params.idcourse;

  Course.update(req.body, {
    where: { idcourse: idCourse },
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
exports.delete = (req, res) => {
  const idCourse = req.params.idcourse;

  Course.destroy({
    where: { idcourse: idCourse },
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

const TypeOfCourse = require('../models').TypeOfCourse;
const Course = require('../models').Course;

const create = (req, res) => {
  // Validate request
  if (!req.body.nameOfType) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a Typeofcourse
  const typeOfCourse = {
    // idTypeOfCourse: req.body.idTypeOfCourse,
    nameOfType: req.body.nameOfType,
    language: req.body.language,
    tags: req.body.tags,
    isDeleted: req.body.isDeleted,
  };
  // Save TypeOfCourse in the database
  TypeOfCourse.create(typeOfCourse)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the typeOfcourse.',
      });
    });
};

// Retrieve all typeOfcourse from the database.
const findAll = (req, res) => {
  TypeOfCourse.findAll({
    include: [
      {
        model: Course,
        as: 'course',
      },
    ],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving typeOfcourse.',
      });
    });
};

// Find a single typeOfcourse with an id
const findOne = (req, res) => {
  const idTypeOfCourse = req.params.idTypeOfCourse;

  TypeOfCourse.findByPk(idTypeOfCourse, {
    include: [
      {
        model: Course,
        as: 'course',
      },
    ],
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find typeOfcourse with idTypeOfcourse=${idTypeOfCourse}.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving typeOfcourse with idTypeOfCourse=' + idTypeOfCourse,
      });
    });
};

// Update a typeOfcourse by the id in the request
const update = (req, res) => {
  const idTypeOfCourse = req.params.idTypeOfCourse;

  TypeOfCourse.update(req.body, {
    where: { idTypeOfCourse: idTypeOfCourse },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'typeOfcourse was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update typeOfcourse with id=${idTypeOfCourse}. Maybe typeOfcourse was not found or req.body is empty!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating typeOfcourse with id=' + idTypeOfCourse,
      });
    });
};

// Delete a typeOfcourse with the specified id in the request
const remove = (req, res) => {
  const idTypeOfCourse = req.params.idTypeOfCourse;

  TypeOfCourse.destroy({
    where: { idTypeOfCourse: idTypeOfCourse },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'typeOfcourse was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete typeOfcourse with id=${idTypeOfCourse}. Maybe typeOfcourse was not found!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete typeOfcourse with id=' + idTypeOfCourse,
      });
    });
};
module.exports = { create, findOne, findAll, update, remove };

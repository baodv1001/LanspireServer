const { CourseType, Course } = require('../models');

const create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a CourseType
  const courseType = {
    typeName: req.body.typeName,
    language: req.body.language,
    isDeleted: req.body.isDeleted,
  };
  // Save CourseType in the database
  CourseType.create(courseType)
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
  CourseType.findAll()
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
  const idCourseType = req.params.idCourseType;

  CourseType.findByPk(idCourseType, {
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
          message: `Cannot find typeOfcourse with idCourseType=${idCourseType}.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving typeOfcourse with idCourseType=' + idCourseType,
      });
    });
};

// Update a typeOfcourse by the id in the request
const update = (req, res) => {
  const idCourseType = req.params.idCourseType;

  CourseType.update(req.body, {
    where: { idCourseType: idCourseType },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'typeOfcourse was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update typeOfcourse with id=${idCourseType}. Maybe typeOfcourse was not found or req.body is empty!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating typeOfcourse with id=' + idCourseType,
      });
    });
};

// Delete a typeOfcourse with the specified id in the request
const remove = (req, res) => {
  const idCourseType = req.params.idCourseType;

  CourseType.destroy({
    where: { idCourseType: idCourseType },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'typeOfcourse was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete typeOfcourse with id=${idCourseType}. Maybe typeOfcourse was not found!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete typeOfcourse with id=' + idCourseType,
      });
    });
};
module.exports = { create, findOne, findAll, update, remove };

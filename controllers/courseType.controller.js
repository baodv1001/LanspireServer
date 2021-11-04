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
    description: req.body.description,
  };
  // Save CourseType in the database
  CourseType.create(courseType)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Course Type.',
      });
    });
};

// Retrieve all Course Type from the database.
const findAll = (req, res) => {
  CourseType.findAll({
    where: {
      isDeleted: false,
    },
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Course Type.',
      });
    });
};

// Find a single Course Type with an id
const findOne = (req, res) => {
  const idCourseType = req.params.idCourseType;

  CourseType.findByPk(idCourseType, {
    where: {
      isDeleted: false,
    },
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
          message: `Cannot find Course Type with idCourseType=${idCourseType}.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving Course Type with idCourseType=' + idCourseType,
      });
    });
};

// Update a Course Type by the id in the request
const update = (req, res) => {
  const idCourseType = req.params.idCourseType;

  CourseType.update(req.body, {
    where: { idCourseType: idCourseType },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Course Type was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Course Type with id=${idCourseType}. Maybe Course Type was not found or req.body is empty!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating Course Type with id=' + idCourseType,
      });
    });
};

// Delete a Course Type with the specified id in the request
const remove = (req, res) => {
  const idCourseType = req.params.idCourseType;

  CourseType.update(
    { isDeleted: true },
    {
      where: { idCourseType: idCourseType },
    }
  )
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Course Type was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Course Type with id=${idCourseType}. Maybe Course Type was not found!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err,
      });
    });
};
module.exports = { create, findOne, findAll, update, remove };

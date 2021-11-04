const { Class, TimeFrame } = require('../models');

const create = (req, res) => {
  // Validate request
  if (!req.body.idCourse) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a Class
  const classroom = {
    idCourse: req.body.idCourse,
    room: req.body.room,
    startingDate: req.body.startingDate,
    endingDate: req.body.endingDate,
    idCenter: req.body.idCenter,
    isDeleted: req.body.isDeleted,
  };
  // Save Class in the database
  Class.create(classroom)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Class.',
      });
    });
};

// Retrieve all Class from the database.
const findAll = (req, res) => {
  Class.findAll({
    include: [
      {
        model: TimeFrame,
        as: 'timeFrame',
      },
    ],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Class.',
      });
    });
};

// Find a single Class with an id
const findOne = (req, res) => {
  const idClass = req.params.idClass;

  Class.findByPk(idClass, {
    include: [
      {
        model: TimeFrame,
        as: 'timeFrame',
      },
    ],
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Class with idclass=${idClass}.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving Class with idclass=' + idClass,
      });
    });
};

// Update a Class by the id in the request
const update = (req, res) => {
  const idClass = req.params.idClass;

  Class.update(req.body, {
    where: { idClass: idClass },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Class was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Class with id=${idClass}. Maybe Class was not found or req.body is empty!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating Class with id=' + idClass,
      });
    });
};

// Delete a Class with the specified id in the request
const remove = (req, res) => {
  const idClass = req.params.idClass;

  Class.destroy({
    where: { idClass: idClass },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Class was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Class with id=${idClass}. Maybe Class was not found!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete Class with id=' + idClass,
      });
    });
};
module.exports = { create, findAll, findOne, update, remove };

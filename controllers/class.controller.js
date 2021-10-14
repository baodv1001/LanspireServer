const db = require('../models');
const Class = db.Class;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.idclass) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a Class
  const classroom = {
    idclass: req.body.idclass,
    idcourse: req.body.idcourse,
    room: req.body.room,
    idcenter: req.body.idcenter,
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
exports.findAll = (req, res) => {
  Class.findAll()
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
exports.findOne = (req, res) => {
  const idClass = req.params.idclass;

  Class.findByPk(idClass)
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
exports.update = (req, res) => {
  const idClass = req.params.idclass;

  Class.update(req.body, {
    where: { idclass: idClass },
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
exports.delete = (req, res) => {
  const idClass = req.params.idclass;

  Class.destroy({
    where: { idclass: idClass },
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

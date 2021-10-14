const db = require('../models');
const ClassTime = db.ClassTime;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.idclasstime || !req.body.idclass) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a classtime
  const classtime = {
    idclasstime: req.body.idclasstime,
    idclass: req.body.idclass,
    dayofweek: req.body.dayofweek,
    starttime: req.body.starttime,
    endtime: req.body.endtime,
  };
  // Save classtime in the database
  ClassTime.create(classtime)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the classtime.',
      });
    });
};

// Retrieve all classtime in class from the database.
exports.findAllByClass = (req, res) => {
  ClassTime.findAll({ where: { idclass: req.params.idclass } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving classtime.',
      });
    });
};

// Find a single classtime with an idclasstime
exports.findOne = (req, res) => {
  const idClassTime = req.params.idclasstime;

  ClassTime.findByPk(idClassTime)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find classtime with idclasstime=${idClassTime}.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving classtime with idclasstime=' + idClassTime,
      });
    });
};

// Update a classtime by the id in the request
exports.update = (req, res) => {
  const idClassTime = req.params.idclasstime;

  ClassTime.update(req.body, {
    where: { idclasstime: idClassTime },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'classtime was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update classtime with idclasstime=${idClassTime}. Maybe classtime was not found or req.body is empty!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating classtime with idclasstime=' + idClassTime,
      });
    });
};

// Delete a classtime with the specified id in the request
exports.delete = (req, res) => {
  const idClassTime = req.params.idclasstime;

  ClassTime.destroy({
    where: { idclasstime: idClassTime },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'classtime was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete classtime with id=${idClassTime}. Maybe classtime was not found!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete classtime with idclasstime=' + idClassTime,
      });
    });
};

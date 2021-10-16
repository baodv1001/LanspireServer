const db = require('../models');
const TimeFrame = db.TimeFrame;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.idTimeFrame) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a timeFrame
  const timeFrame = {
    idTimeFrame: req.body.idTimeFrame,
    startingTime: req.body.startingTime,
    endingTime: req.body.endingTime,
  };
  // Save timeFrame in the database
  TimeFrame.create(timeFrame)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the timeFrame.',
      });
    });
};

// Retrieve all timeFrame from the database.
exports.findAll = (req, res) => {
  TimeFrame.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving timeFrame.',
      });
    });
};

// Find a single timeFrame with an id
exports.findOne = (req, res) => {
  const idTimeFrame = req.params.idTimeFrame;

  TimeFrame.findByPk(idTimeFrame)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Bill with idTimeFrame=${idTimeFrame}.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving Bill with idTimeFrame=' + idTimeFrame,
      });
    });
};

// Update a TimeFrame by the id in the request
exports.update = (req, res) => {
  const idTimeFrame = req.params.idTimeFrame;

  Bill.update(req.body, {
    where: { idTimeFrame: idTimeFrame },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'TimeFrame was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update TimeFrame with idTimeFrame=${idTimeFrame}. Maybe TimeFrame was not found or req.body is empty!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating TimeFrame with idTimeFrame=' + idTimeFrame,
      });
    });
};

// Delete a TimeFrame with the specified id in the request
exports.delete = (req, res) => {
  const idTimeFrame = req.params.idTimeFrame;

  TimeFrame.destroy({
    where: { idTimeFrame: idTimeFrame },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'TimeFrame was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete TimeFrame with idTimeFrame=${idTimeFrame}. Maybe TimeFrame was not found!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete TimeFrame with idTimeFrame=' + idTimeFrame,
      });
    });
};

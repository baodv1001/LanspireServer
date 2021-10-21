const { Parameter } = require('../models');

const create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a Parameter
  const parameter = {
    name: req.body.name,
    value: req.body.value,
  };
  // Save Parameter in the database
  Parameter.create(parameter)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Parameter.',
      });
    });
};

// Retrieve all Parameters from the database.
const findAll = (req, res) => {
  Parameter.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving parameters.',
      });
    });
};

// Find a single Parameter with an id
const findOne = (req, res) => {
  const idParameter = req.params.idParameter;

  Parameter.findByPk(idParameter)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Parameter with idParameter=${idParameter}.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Error retrieving Parameter with id=' + idParameter,
      });
    });
};

// Update a Parameter by the id in the request
const update = (req, res) => {
  const idParameter = req.params.idParameter;

  Parameter.update(req.body, {
    where: { idParameter: idParameter },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Parameter was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Parameter with id=${idParameter}. Maybe Parameter was not found or req.body is empty!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Error updating Parameter with id=' + idParameter,
      });
    });
};

// Delete a Parameter with the specified id in the request
const remove = (req, res) => {
  const idParameter = req.params.idParameter;

  Parameter.destroy({
    where: { idParameter: idParameter },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Parameter was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Parameter with id=${idParameter}. Maybe Parameter was not found!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Could not delete Parameter with id=' + idParameter,
      });
    });
};

module.exports = { create, findAll, findOne, update, remove };

const db = require('../models');
const Role = db.Role;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a Role
  const role = {
    name: req.body.name,
  };
  // Save Role in the database
  Role.create(role)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Role.',
      });
    });
};

// Retrieve all Roles from the database.
exports.findAll = (req, res) => {
  Role.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving roles.',
      });
    });
};

// Find a single Role with an id
exports.findOne = (req, res) => {
  const idRole = req.params.idRole;

  Role.findByPk(idRole)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Role with idRole=${idRole}.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Error retrieving Role with id=' + idRole,
      });
    });
};

// Update a Role by the id in the request
exports.update = (req, res) => {
  const idRole = req.params.idRole;

  Role.update(req.body, {
    where: { idRole: idRole },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Role was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Role with id=${idRole}. Maybe Role was not found or req.body is empty!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Error updating Role with id=' + idRole,
      });
    });
};

// Delete a Role with the specified id in the request
exports.delete = (req, res) => {
  const idRole = req.params.idRole;

  Role.destroy({
    where: { idRole: idRole },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Role was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Role with id=${idRole}. Maybe Role was not found!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Could not delete Role with id=' + idRole,
      });
    });
};

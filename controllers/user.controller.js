const { User } = require('../models');

const create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a User
  const user = {
    displayName: req.body.displayName,
    gender: req.body.gender,
    phoneNumber: req.body.phoneNumber,
    imageUrl: req.body.imageUrl,
    address: req.body.address,
    dob: req.body.dob,
  };
  // Save User in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the user.',
      });
    });
};

// Retrieve all Users from the database.
const findAll = (req, res) => {
  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving user information.',
      });
    });
};

// Find a single User with an id
const findOne = (req, res) => {
  const idUser = req.params.idUser;

  User.findByPk(idUser)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with idUser=${idUser}.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Error retrieving User with id=' + idUser,
      });
    });
};

// Update a User by the id in the request
const update = (req, res) => {
  const idUser = req.params.idUser;

  User.update(req.body, {
    where: { idUser: idUser },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'User was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update User with id=${idUser}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Error updating User with id=' + idUser,
      });
    });
};

// Delete a User with the specified id in the request
const remove = (req, res) => {
  const idUser = req.params.idUser;

  User.destroy({
    where: { idUser: idUser },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'User was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${idUser}. Maybe User was not found!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Could not delete User with id=' + idUser,
      });
    });
};

module.exports = { create, findAll, findOne, update, remove };

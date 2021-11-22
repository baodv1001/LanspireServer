const { Employee, User } = require('../models');
const bcrypt = require('bcryptjs');

const hash = text => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(text, salt);
  return hash;
};

const create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }
  // hash password
  let password = hash(req.body.password);

  const user = {
    username: req.body.username,
    password: password,
    displayName: req.body.displayName,
    email: req.body.email,
    gender: req.body.gender,
    phoneNumber: req.body.phoneNumber,
    imageUrl: req.body.imageUrl,
    address: req.body.address,
    dob: req.body.dob,
    idRole: req.body.idRole,
    isActivated: true,
  };
  // Save Employee in the database
  User.create(user)
    .then(createdUser => {
      Employee.create({
        idUser: createdUser.idUser,
        isDeleted: false,
      }).then(createdEmployee => {
        const { idEmployee, idUser, isDeleted } = createdEmployee;
        const User = {
          idUser: createdUser.idUser,
          username: createdUser.username,
          password: createdUser.password,
          displayName: createdUser.displayName,
          email: createdUser.email,
          gender: createdUser.gender,
          phoneNumber: createdUser.phoneNumber,
          imageUrl: createdUser.imageUrl,
          address: createdUser.address,
          dob: createdUser.dob,
          idRole: createdUser.idRole,
          isActivated: createdUser.isActivated,
        };

        res.send({ idEmployee, idUser, isDeleted, ...User });
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Employee.',
      });
    });
};

// Retrieve all Employees from the database.
const findAll = (req, res) => {
  Employee.findAll({
    include: [{ model: User }],
  })
    .then(data => {
      const response = data.map(item => {
        let password = hash(item.User.password);

        return {
          idEmployee: item.idEmployee,
          idUser: item.idUser,
          isDeleted: item.isDeleted,
          username: item.User.username === null ? null : item.User.username,
          password: item.User.password === null ? null : password,
          displayName: item.User.displayName,
          email: item.User.email,
          gender: item.User.gender,
          phoneNumber: item.User.phoneNumber,
          imageUrl: item.User.imageUrl,
          address: item.User.address,
          dob: item.User.dob,
          idRole: item.User.idRole == null ? null : item.User.idRole,
          isActivated: item.User.isActivated,
        };
      });

      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving employees.',
      });
    });
};

// Find a single Employee with an id
const findOne = async (req, res) => {
  const idEmployee = req.params.idEmployee;

  Employee.findByPk(idEmployee, {
    include: [{ model: User }],
  })
    .then(data => {
      if (data.isDeleted === false) {
        const { idEmployee, idUser, isDeleted, User } = data;

        let password = hash(User.password);

        const user = {
          username: User.username,
          password: password,
          displayName: User.displayName,
          email: User.email,
          gender: User.gender,
          phoneNumber: User.phoneNumber,
          imageUrl: User.imageUrl,
          address: User.address,
          dob: User.dob,
          idRole: User.idRole == null ? null : User.idRole,
          isActivated: User.isActivated,
        };
        res.send({ idEmployee, idUser, isDeleted, ...user });
      } else {
        res.status(404).send({
          message: `Cannot find Employee with idEmployee=${idEmployee}.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Error retrieving Employee with id=' + idEmployee,
      });
    });
};

// Update a Employee by the id in the request
const update = async (req, res) => {
  try {
    const idUser = req.body.idUser;
    const updatedEmployee = {
      displayName: req.body.displayName,
      gender: req.body.gender,
      phoneNumber: req.body.phoneNumber,
      imageUrl: req.body.imageUrl,
      address: req.body.address,
      dob: req.body.dob,
    };
    const response = await User.update(updatedEmployee, {
      where: { idUser },
      returning: true,
    });

    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Delete a Employee with the specified id in the request
const remove = async (req, res) => {
  try {
    const idEmployee = req.params.idEmployee;
    const idUser = req.body.idUser;

    const resEmployee = await Employee.update({ isDeleted: true }, { where: { idEmployee } });

    const resUser = await User.update({ isActivated: false }, { where: { idUser } });

    if (resEmployee == 1 && resUser == 1) {
      res.send({ message: 'Lecturer was deleted successfully!' });
    } else {
      res.send({
        message: `Cannot delete Lecturer with id=${idLecturer}. Maybe Lecturer was not found!`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: err.message || 'Could not delete Lecturer with id=' + idLecturer,
    });
  }
};

module.exports = { create, findAll, findOne, update, remove };

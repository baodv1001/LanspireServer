const { Employee, User } = require('../models');
const hash = require('../utils/hashPassword');

const create = async (req, res) => {
  try {
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
    const createdUser = await User.create(user);
    const createdEmployee = await Employee.create({ idUser: createdUser.idUser, isDeleted: false });

    const response = await Employee.findByPk(createdEmployee.idEmployee, {
      include: [{ model: User }],
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Retrieve all Employees from the database.
const findAll = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      include: [{ model: User }],
    });

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Find a single Employee with an id
const findOne = async (req, res) => {
  try {
    const idEmployee = req.params.idEmployee;
    const employee = await Employee.findByPk(idEmployee, {
      include: [{ model: User }],
    });

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json(error);
  }
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

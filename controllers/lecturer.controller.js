const { Lecturer, User, Class, TimeFrame } = require('../models');
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

    // Create a Lecturer
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

    const createdUser = await User.create(user);
    const createdLecturer = await Lecturer.create({ idUser: createdUser.idUser, isDeleted: false });

    const response = await Lecturer.findByPk(createdLecturer.idLecturer, {
      include: [{ model: User }, { model: Class }],
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Retrieve all Lecturers from the database.
const findAll = async (req, res) => {
  try {
    const lecturers = await Lecturer.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Class,
          include: [
            {
              model: TimeFrame,
            },
          ],
        },
      ],
    });

    res.status(200).json(lecturers);
  } catch (e) {
    res.status(500).json(e);
  }
};

// Find a single Lecturer with an id
const findOne = async (req, res) => {
  try {
    const idLecturer = req.params.idLecturer;
    const lecturer = await Lecturer.findByPk(idLecturer, {
      include: [
        {
          model: User,
        },
        {
          model: Class,
        },
      ],
    });

    res.status(200).json(lecturer);
  } catch (e) {
    res.status(500).json(e);
  }
};

// Update a Lecturer by the id in the request
const update = async (req, res) => {
  try {
    const idUser = req.body.idUser;
    const updatedLecturer = {
      displayName: req.body.displayName,
      gender: req.body.gender,
      phoneNumber: req.body.phoneNumber,
      imageUrl: req.body.imageUrl,
      address: req.body.address,
      dob: req.body.dob,
    };

    const response = await User.update(updatedLecturer, {
      where: { idUser },
      returning: true,
    });

    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Delete a Lecturer with the specified id in the request
const remove = async (req, res) => {
  try {
    const idLecturer = req.params.idLecturer;
    const idUser = req.body.idUser;

    const resLecturer = await Lecturer.update({ isDeleted: true }, { where: { idLecturer } });

    const resUser = await User.update({ isActivated: false }, { where: { idUser } });

    if (resLecturer == 1 && resUser == 1) {
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

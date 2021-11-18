const {
  Class,
  TimeFrame,
  Course,
  Student,
  Exam,
  Teaching,
  ClassTime,
  Lecturer,
  User,
  Testing,
  Column_Transcript,
} = require('../models');
const Sequelize = require('sequelize');

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
    className: req.body.className,
    idCourse: req.body.idCourse,
    room: req.body.room,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    isDeleted: req.body.isDeleted,
  };
  let timeFrames;
  if (req.body.timeFrames) {
    timeFrames = req.body.timeFrames;
  }
  // Save Class in the database
  Class.create(classroom)
    .then(data => {
      if (timeFrames.length > 0) {
        timeFrames.map(timeFrame => {
          let classTime = {
            idTimeFrame: timeFrame.idTimeFrame,
            dayOfWeek: timeFrame.dayOfWeek,
            idClass: data.idClass,
          };
          ClassTime.create(classTime);
        });
      }
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
    where: {
      isDeleted: false,
    },
    include: [
      {
        model: Course,
        include: [
          {
            model: Column_Transcript,
            as: 'Columns',
          },
        ],
      },
      // { model: Testing },
      {
        model: Lecturer,
        include: [
          {
            model: User,
          },
        ],
      },

      {
        model: ClassTime,
        include: [
          {
            model: TimeFrame,
          },
        ],
      },
      {
        model: Student,
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
        model: Course,
        include: [
          {
            model: Column_Transcript,
            as: 'Columns',
          },
        ],
      },
      {
        model: Lecturer,
        include: [
          {
            model: User,
          },
        ],
      },

      {
        model: ClassTime,
        include: [
          {
            model: TimeFrame,
          },
        ],
      },
      {
        model: Student,
        include: [
          {
            model: User,
          },
          {
            model: Testing,
            include: [
              {
                model: Exam,
              },
            ],
          },
        ],
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
const update = async (req, res) => {
  try {
    const idClass = req.params.idClass;

    if (req.body.idLecturer) {
      const classRoom = await Class.findByPk(idClass);
      const { idLecturer } = req.body;
      const lecturer = await Lecturer.findByPk(idLecturer);
      classRoom.removeLecturers([lecturer]);
      res.status(200).send({
        message: 'Dismissal lecturer successfully.',
      });
    } else if (req.body.lecturers) {
      const classRoom = await Class.findByPk(idClass);
      const { lecturers } = req.body;
      if (lecturers.length > 0) {
        await classRoom.addLecturers(lecturers);
      }
      res.status(200).send({
        message: 'Appoint lecturer successfully.',
      });
    } else {
      const result = await Class.update(req.body, {
        where: { idClass: idClass },
      });
      if (result == 1) {
        let timeFrames;
        if (req.body.timeFrames) {
          timeFrames = req.body.timeFrames;
        }
        if (timeFrames.length > 0) {
          ClassTime.destroy({
            where: { idClass: idClass },
          });
          let isSuccess = true;
          timeFrames.map(timeFrame => {
            let classTime = {
              idTimeFrame: timeFrame.idTimeFrame,
              dayOfWeek: timeFrame.dayOfWeek,
              idClass: idClass,
            };
            ClassTime.create(classTime)
              .then(num => {
                if (num < 1) {
                  isSuccess = false;
                }
              })
              .catch(err => {
                isSuccess = false;
              });
          });
          if (isSuccess) {
            res.status(200).send({
              message: 'Course was updated successfully',
            });
          } else {
            res.status(500).send({
              message: `Cannot update Class with id=${idClass}. Maybe Class was not found!`,
            });
          }
        }
      } else {
        res.status(500).send({
          message: `Cannot update course with idcourse=${idClass}. Maybe course was not found or req.body is empty!`,
        });
      }
    }
  } catch (err) {
    res.status(500).send({
      message: err,
    });
  }
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

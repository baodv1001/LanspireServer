const { Course, Level, CourseType, Column_Transcript } = require('../models');

const create = async (req, res) => {
  try {
    const course = {
      courseName: req.body.courseName,
      fee: req.body.fee,
      description: req.body.description,
      max: req.body.max,
      idLevel: req.body.idLevel,
      idCourseType: req.body.idCourseType,
    };
    const createdCourse = await Course.create(course);
    //get columns
    const { columns } = req.body;
    const col = await Column_Transcript.findAll({
      where: {
        idColumn: columns,
      },
    });

    createdCourse.setColumns(col);
    const data = await Course.findByPk(createdCourse.idCourse, {
      include: [
        {
          model: CourseType,
        },
        {
          model: Level,
        },
      ],
    });

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json(e);
  }
};

// Retrieve all course from the database.
const findAll = (req, res) => {
  Course.findAll({
    where: {
      isDeleted: false,
    },
    include: [
      {
        model: CourseType,
      },
      {
        model: Level,
      },
      {
        model: Column_Transcript,
        as: 'Columns',
      },
    ],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving course.',
      });
    });
};

// Find a single course with an id
const findOne = (req, res) => {
  const idCourse = req.params.idCourse;

  Course.findByPk(idCourse, {
    where: {
      isDeleted: false,
    },
    include: [
      {
        model: CourseType,
      },
      {
        model: Level,
      },
      {
        model: Column_Transcript,
        as: 'Columns',
      },
    ],
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Course with idcourse=${idCourse}.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving course with idcourse=' + idCourse,
      });
    });
};

// Update a course by the id in the request
const update = async (req, res) => {
  try {
    const idCourse = req.params.idCourse;

    const course = await Course.findByPk(idCourse);
    const { columns } = req.body;
    const col = await Column_Transcript.findAll({
      where: {
        idColumn: columns,
      },
    });
    course.setColumns(col);

    const editCourse = {
      courseName: req.body.courseName,
      fee: req.body.fee,
      description: req.body.description,
      max: req.body.max,
      idLevel: req.body.idLevel,
      idCourseType: req.body.idCourseType,
    };
    const result = await Course.update(editCourse, {
      where: { idCourse: idCourse },
    });

    if (result == 1) {
      res.send({
        message: 'Course was updated successfully.',
      });
    } else {
      res.send({
        message: `Cannot update course with idcourse=${idCourse}. Maybe course was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err,
    });
  }
};

// Delete a course with the specified id in the request
const remove = (req, res) => {
  const idCourse = req.params.idCourse;

  Course.update(
    { isDeleted: true },
    {
      where: { idCourse: idCourse },
    }
  )
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'course was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete course with id=${idCourse}. Maybe course was not found!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete course with idcourse=' + idCourse,
      });
    });
};
module.exports = { create, findOne, findAll, update, remove };

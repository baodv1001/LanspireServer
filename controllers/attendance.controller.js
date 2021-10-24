const Attendance = require('../models').Attendance;
const create = async (req, res) => {
  try {
    const attendance = {
      idStudent: req.body.idStudent,
      idClassTime: req.body.idClassTime,
      checkedDate: req.body.checkedDate,
    };

    const data = await Attendance.create(attendance);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const findAll = async (req, res) => {
  try {
    // const data = Attendance.findAll({
    //   include: [
    //     {
    //       models: ClassTime,
    //     },
    //   ],
    // });
    const data = await Attendance.findAll();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const findOne = async (req, res) => {
  try {
    const idAttendance = req.params.idAttendance;
    console.log(idAttendance);
    const data = Attendance.findByPk(idAttendance);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const update = async (req, res) => {
  try {
    const idAttendance = req.params.idAttendance;

    const data = Attendance.update(req.body, { where: { idAttendance } });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const remove = async (req, res) => {
  try {
    const idAttendance = req.params.idAttendance;

    const data = Attendance.destroy({ where: { idAttendance } });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { create, findAll, findOne, update, remove };

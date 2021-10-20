const Center = require('./center.controller');
const Attendance = require('./attendance.controller');
const Course = require('./course.controller');
const TypeOfCourse = require('./typeOfCourse.controller');
const Bill = require('./bill.controller');
const BillInfo = require('./billInfo.controller');
const Class = require('./class.controller');
const ClassTime = require('./classTime.controller');
const TimeFrame = require('./timeFrame.controller');
const Level = require('./level.controller');
const LevelLecturer = require('./levelLecturer.controller');
const Teaching = require('./teaching.controller');
const Notifications = require('./notifications.controller');
const Noti_Account = require('./noti_account.controller');

module.exports = {
  Course,
  TypeOfCourse,
  Bill,
  BillInfo,
  Class,
  ClassTime,
  TimeFrame,
  Center,
  Attendance,
  Level,
  LevelLecturer,
  Teaching,
  Notifications,
  Noti_Account,
};

const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  dbConfig.development.database,
  dbConfig.development.username,
  dbConfig.development.password,
  {
    host: dbConfig.development.host,
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
      },
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Bill = require('./bill.js')(sequelize, Sequelize);
db.BillInfo = require('./billInfo.js')(sequelize, Sequelize);
db.Course = require('./course.js')(sequelize, Sequelize);
db.TypeOfCourse = require('./typeOfCourse.js')(sequelize, Sequelize);
db.Class = require('./class.js')(sequelize, Sequelize);
db.ClassTime = require('./classTime.js')(sequelize, Sequelize);
db.TimeFrame = require('./timeFrame.js')(sequelize, Sequelize);
db.Exam = require('./exam.js')(sequelize, Sequelize);
db.Column_Course = require('./column_course.js')(sequelize, Sequelize);
db.Column_Transcript = require('./column_transcript.js')(sequelize, Sequelize);
db.Learning = require('./learning.js')(sequelize, Sequelize);
db.LevelStudent = require('./levelStudent.js')(sequelize, Sequelize);
db.TypeOfTest = require('./typeOfTest.js')(sequelize, Sequelize);

module.exports = db;

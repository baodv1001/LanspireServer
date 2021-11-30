const express = require('express');
const cors = require('cors');
const db = require('./models');

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync();

// routes
require('./routes/bill.routes.js')(app);
require('./routes/billInfo.routes.js')(app);
require('./routes/course.routes.js')(app);
require('./routes/courseType.routes.js')(app);
require('./routes/class.routes.js')(app);
require('./routes/classTime.routes.js')(app);
require('./routes/timeFrame.routes.js')(app);
require('./routes/center.routes.js')(app);
require('./routes/attendance.routes.js')(app);
require('./routes/level.routes.js')(app);
require('./routes/teaching.routes.js')(app);
require('./routes/notifications.routes.js')(app);
require('./routes/column_transcript.routes.js')(app);
require('./routes/exam.routes.js')(app);
require('./routes/testType.routes.js')(app);
require('./routes/role.routes.js')(app);
require('./routes/account.routes.js')(app);
require('./routes/employee.routes.js')(app);
require('./routes/lecturer.routes.js')(app);
require('./routes/student.routes.js')(app);
require('./routes/user.routes.js')(app);
require('./routes/parameter.routes.js')(app);
require('./routes/auth.routes.js')(app);
require('./routes/report.routes.js')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

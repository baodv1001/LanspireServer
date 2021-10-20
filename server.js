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
require('./routes/typeOfCourse.routes.js')(app);
require('./routes/class.routes.js')(app);
require('./routes/classTime.routes.js')(app);
require('./routes/timeFrame.routes.js')(app);
require('./routes/center.routes.js')(app);
require('./routes/attendance.routes.js')(app);
require('./routes/level.routes.js')(app);
require('./routes/levelLecturer.routes.js')(app);
require('./routes/teaching.routes.js')(app);
require('./routes/notifications.routes.js')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

CREATE TABLE "user" (
  idUser int primary key,
  displayName varchar(240),
  gender varchar(240),
  phoneNumber varchar(240),
  imageURL varchar(1000),
  address varchar(240),
  dob date,
  isActived boolean
);

CREATE TABLE role (
  idRole int primary key,
  name varchar(240)
);

CREATE TABLE account (
  idAccount int primary key,
  idUser int,
  username varchar(240),
  password varchar(240),
  idRole int, 
  isDeleted boolean,
  constraint FK_User foreign key (idUser) references "user"(idUser)
);

CREATE TABLE parameter (
  idParameter int primary key,
  name varchar(240),
  value varchar(240)
);

CREATE TABLE student (
  idStudent int primary key,
  idUser int,
  isDeleted boolean,
  constraint FK_User foreign key (idUser) references "user"(idUser)
);

CREATE TABLE typeOfCourse (
  idTypeOfCourse int primary key,
  nameOfType varchar(240),
  language varchar(240),
  tags varchar(240)[],
  isDeleted boolean
);


CREATE TABLE level (
  idLevel int primary key,
  idTypeOfCourse int,
  point real,
  constraint FK_TypeOfCourse foreign key (idTypeOfCourse) references typeOfCourse(idTypeOfCourse)
);

CREATE TABLE course (
  idCourse int primary key,
  nameOfCourse varchar(240),
  idLevel int,
  startDate date,
  endDate date,
  fee bigint,
  isDeleted boolean,
  constraint FK_Level foreign key (idLevel) references level(idLevel)
);

CREATE TABLE levelStudent (
  idStudent int,
  idLevel int,
  constraint FK_Student foreign key (idStudent) references student(idStudent),
  constraint FK_Level foreign key (idLevel) references level(idLevel)
);

CREATE TABLE bill (
  idBill int primary key,
  idAccount int,
  idStudent int,
  createdDate date,
  totalFee bigint
);

CREATE TABLE billInfo (
  idBill int,
  idCourse int,
  fee bigint,
  constraint FK_Bill foreign key (idBill) references bill(idBill),
  constraint FK_Course foreign key (idCourse) references course(idCourse)
);

CREATE TABLE center (
  idCenter int primary key,
  nameOfCenter varchar (240),
  location varchar(240)
);

CREATE TABLE class (
  idClass int primary key,
  idCourse int,
  Room varchar(240),
  idCenter int,
  constraint FK_Course foreign key (idCourse) references course(idCourse),
  constraint FK_Center foreign key (idCenter) references center(idCenter)
);

CREATE TABLE teaching (
  idLecturer int primary key,
  idClass int,
  constraint FK_Class foreign key (idClass) references class(idClass)
);

CREATE TABLE levelLecturer (
  idLecturer int,
  idLevel int,
  constraint FK_Teaching foreign key (idLecturer) references teaching(idLecturer),
  constraint FK_Level foreign key (idLevel) references level(idLevel)
);

CREATE TABLE typeOfTest (
  idTypeOfTest int primary key,
  nameOfType varchar(240)
);

CREATE TABLE test (
  idTest int primary key,
  idAccount int,
  postedDate date,
  fileUrl varchar(1000),
  idTypeOfTest int,
  constraint FK_Account foreign key (idAccount) references account(idAccount),
  constraint FK_TypeOfTest foreign key (idTypeOfTest) references typeOfTest(idTypeOfTest)
);

CREATE TABLE exam (
  idExam int primary key,
  nameOfExam varchar(240),
  idTest int,
  min real,
  max real,
  constraint FK_Test foreign key (idTest) references test(idTest)
);

CREATE TABLE transcript (
  idTranscript int primary key,
  idExam int,
  testScore real,
  constraint FK_Exam foreign key (idExam) references exam(idExam)
);

CREATE TABLE learning (
  idStudent int,
  idClass int,
  idTranscript int,
  constraint FK_Student foreign key (idStudent) references student(idStudent),
  constraint FK_Class foreign key (idClass) references class(idClass),
  constraint FK_Transcript foreign key (idTranscript) references transcript(idTranscript)
);

CREATE TABLE classTime (
  idClassTime int primary key,
  idClass int, 
  dayOfWeek int,
  constraint FK_Class foreign key (idClass) references class(idClass),
  constraint FK_TimeFrame foreign key (idTimeFrame) references timeFrame(idTimeFrame)
);

CREATE TABLE timeFrame (
  idTimeFrame int primary key,
  startingTime time without time zone,
  endingTime time without time zone,
);
CREATE TABLE attendance (
  idStudent int,
  idClassTime int,
  checkedDate date,
  constraint FK_Student foreign key (idStudent) references student(idStudent),
  constraint FK_ClassTime foreign key (idClassTime) references classTime(idClassTime)
);

CREATE TABLE notifications (
  idNotification int primary key,
  title varchar(240),
  content varchar(240),
  createDate date,
  toEmployee boolean,
  toLecturer boolean,
);


CREATE TABLE noti_account (
  idNotification int ,
  idAccount int ,
  constraint FK_Noti foreign key (idNotification) references notifications(idNotification),
  constraint FK_Account foreign key (idAccount) references account(idAccount)
);
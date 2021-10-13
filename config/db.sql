CREATE DATABASE Langspire;

CREATE TABLE "Users"(
  idUser int primary key,
  displayName varchar(240),
  gender varchar(240),
  phoneNumber varchar(240),
  imgURL varchar(1000),
  address varchar(240),
  dateOfBirth date,
  isActived boolean
);

CREATE TABLE "Role" (
  idRole int primary key,
  nameOfRole varchar(240)
);

CREATE TABLE "Account" (
  idAccount int primary key,
  idUser int,
  username varchar(240),
  password varchar(240),
  idRole int, 
  isDeleted boolean,
  constraint FK_User foreign key (idUser) references "Users"(idUser)
);

CREATE TABLE "Reference" (
  idReference int primary key,
  name varchar(240),
  value varchar(240)
);

CREATE TABLE "Student" (
  idStudent int primary key,
  idUser int,
  isDeleted boolean,
  constraint FK_User foreign key (idUser) references "Users"(idUser)
);

CREATE TABLE "TypeOfCourse" (
  idTypeOfCourse int primary key,
  nameOfType varchar(240),
  language varchar(240)
);

CREATE TABLE "Level" (
  idLevel int primary key,
  idTypeOfCourse int,
  point real,
  constraint FK_TypeOfCourse foreign key (idTypeOfCourse) references "TypeOfCourse"(idTypeOfCourse)
);

CREATE TABLE "LevelStudent" (
  idStudent int,
  idLevel int,
  constraint FK_Student foreign key (idStudent) references "Student"(idStudent),
  constraint FK_Level foreign key (idLevel) references "Level"(idLevel)
);

CREATE TABLE "Course" (
  idCourse int primary key,
  nameOfCourse varchar(240),
  idLevel int,
  startDate date,
  endDate date,
  fee bigint,
  isDeleted boolean,
  constraint FK_Level foreign key (idLevel) references "Level"(idLevel)
);

CREATE TABLE "Bill" (
  idBill int primary key,
  idAccount int,
  idStudent int,
  createdDate date,
  phoneNumber varchar(240)
);

CREATE TABLE "BillInfo" (
  idBill int,
  idCourse int,
  fee bigint,
  constraint FK_Bill foreign key (idBill) references "Bill"(idBill),
  constraint FK_Course foreign key (idCourse) references "Course"(idCourse)
);

CREATE TABLE "Center" (
  idCenter int primary key,
  nameOfCenter varchar (240),
  location varchar(240)
);

CREATE TABLE "Class" (
  idClass int primary key,
  idCourse int,
  Room varchar(240),
  idCenter int,
  constraint FK_Course foreign key (idCourse) references "Course"(idCourse),
  constraint FK_Center foreign key (idCenter) references "Center"(idCenter)
);

CREATE TABLE "Teaching" (
  idLecturer int primary key,
  idClass int,
  constraint FK_Class foreign key (idClass) references "Class"(idClass)
);

CREATE TABLE "LevelLecturer" (
  idLecturer int,
  idLevel int,
  constraint FK_Teaching foreign key (idLecturer) references "Teaching"(idLecturer),
  constraint FK_Level foreign key (idLevel) references "Level"(idLevel)
);

CREATE TABLE "TypeOfTest" (
  idTypeOfTest int primary key,
  nameOfType varchar(240)
);

CREATE TABLE "Test" (
  idTest int primary key,
  idAccount int,
  postedDate date,
  fileUrl varchar(1000),
  idTypeOfTest int,
  constraint FK_Account foreign key (idAccount) references "Account"(idAccount),
  constraint FK_TypeOfTest foreign key (idTypeOfTest) references "TypeOfTest"(idTypeOfTest)
);

CREATE TABLE "Exam" (
  idExam int primary key,
  nameOfExam varchar(240),
  idTest int,
  min real,
  max real,
  constraint FK_Test foreign key (idTest) references "Test"(idTest)
);

CREATE TABLE "Transcript" (
  idTranscript int primary key,
  idExam int,
  testScore real,
  constraint FK_Exam foreign key (idExam) references "Exam"(idExam)
);

CREATE TABLE "Learning" (
  idStudent int,
  idClass int,
  idTranscript int,
  constraint FK_Student foreign key (idStudent) references "Student"(idStudent),
  constraint FK_Class foreign key (idClass) references "Class"(idClass),
  constraint FK_Transcript foreign key (idTranscript) references "Transcript"(idTranscript)
);

CREATE TABLE "ClassTime" (
  idClassTime int primary key,
  idClass int, 
  dayOfWeek int,
  startTime date,
  endTime date,
  constraint FK_Class foreign key (idClass) references "Class"(idClass)
);

CREATE TABLE "Attendance" (
  idStudent int,
  idClassTime int,
  checkedDate date,
  constraint FK_Student foreign key (idStudent) references "Student"(idStudent),
  constraint FK_ClassTime foreign key (idClassTime) references "ClassTime"(idClassTime)
);

CREATE TABLE "Notifications" (
  idNotification int primary key,
  idClass int,
  title varchar(240),
  content varchar(240),
  createDate date,
  toStudent boolean,
  toLecturer boolean,
  constraint FK_Class foreign key (idClass) references "Class"(idClass)
);
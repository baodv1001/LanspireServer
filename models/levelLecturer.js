module.exports = (sequelize, Sequelize) => {
  const LevelLecturer = sequelize.define(
    "levellecturer",
    {
      idLecturer: {
        type: Sequelize.INTEGER,
        field: "idlecturer",
      },
      idLevel: {
        type: Sequelize.STRING,
        field: "idlevel",
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );
  return LevelLecturer;
};

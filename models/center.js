module.exports = (sequelize, Sequelize) => {
  const Center = sequelize.define(
    "Center",
    {
      idCenter: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "idcenter",
      },
      nameOfCenter: {
        type: Sequelize.STRING,
        field: "nameofcenter",
      },
      location: {
        type: Sequelize.STRING,
        field: "location",
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );
  return Center;
};

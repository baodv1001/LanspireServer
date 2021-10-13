module.exports = (sequelize, Sequelize) => {
    const Bill = sequelize.define("bill", {
      idbill: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      idaccount: {
        type: Sequelize.INTEGER
      },
      idstudent: {
        type: Sequelize.INTEGER
      },
      createddate: {
        type: Sequelize.DATE
      },
      totalfee: {
          type: Sequelize.BIGINT
      },
      
    },{
      freezeTableName: true,
      
      timestamps: false,

      createdAt: false,

      updatedAt: false,
    });
  
    return Bill;
  };
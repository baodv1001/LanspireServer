const config = require('../config/auth.config');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, Sequelize) => {
  const RefreshToken = sequelize.define('RefreshToken', {
    token: {
      type: Sequelize.STRING,
    },
    expiryDate: {
      type: Sequelize.DATE,
    },
  });

  RefreshToken.createToken = async function (user) {
    let expiredAt = new Date();

    expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

    let _token = uuidv4();
    let refreshToken = await RefreshToken.create({
      token: _token,
      idUser: user.idUser,
      expiryDate: expiredAt.getTime(),
    });

    return refreshToken.token;
  };
  RefreshToken.verifyExpiration = token => {
    return token.expiryDate.getTime() < new Date().getTime();
  };
  RefreshToken.associate = models => {
    RefreshToken.belongsTo(models.User, {
      foreignKey: 'idUser',
    });
  };

  return RefreshToken;
};

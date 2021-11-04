const { User, RefreshToken } = require('../models');
const config = require('../config/auth.config.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.user.username,
    },
  })
    .then(async user => {
      if (!user) {
        return res.status(200).send({ message: 'User Not found.' });
      }

      //   var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      var passwordIsValid = req.body.user.password == user.password;
      if (!passwordIsValid) {
        return res.status(200).send({
          accessToken: null,
          message: 'Invalid Password!',
        });
      }

      const token = jwt.sign({ id: user.idUser }, config.secret, {
        expiresIn: config.jwtExpiration,
      });

      let refreshToken = await RefreshToken.createToken(user);

      user.getRole().then(role => {
        res.status(200).send({
          idUser: user.idUser,
          role: role.name,
          accessToken: token,
          refreshToken: refreshToken,
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
const refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({ message: 'Refresh Token is required!' });
  }

  try {
    let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });

    if (!refreshToken) {
      res.status(403).json({ message: 'Refresh token is not in database!' });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } });

      res.status(403).json({
        message: 'Refresh token was expired. Please make a new signin request',
      });
      return;
    }

    const user = await refreshToken.getUser();
    let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
module.exports = { signin, refreshToken };

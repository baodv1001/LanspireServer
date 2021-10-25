const { User, Role } = require('../models');
const config = require('../config/auth.config.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.user.username,
    },
  })
    .then(user => {
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

      var token = jwt.sign({ idUser: user.idUser }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      user.getRole().then(role => {
        res.status(200).send({
          idUser: user.idUser,
          role: role.name,
          accessToken: token,
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

module.exports = { signin };

const { User, ConfirmCode, RefreshToken, Lecturer, Employee, Role } = require('../models');
const config = require('../config/auth.config.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const hash = text => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(text, salt);
  return hash;
};
const signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.user.username,
    },
    include: [{ model: Lecturer }, { model: Employee }, { model: Role }],
  })
    .then(async user => {
      if (!user) {
        return res.status(200).send({ message: 'User Not found.' });
      }

      var passwordIsValid = bcrypt.compareSync(req.body.user.password, user.password);
      // var passwordIsValid = req.body.user.password == user.password;
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

      res.status(200).send({ user, accessToken: token, refreshToken: refreshToken });
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
const sendMail = async (req, res) => {
  const username = req.body.username;
  const isExistUser = await User.findOne({ where: { username: username } });
  if (!isExistUser) {
    return res.status(422).send("User doesn't exist!");
  }
  const email = isExistUser.email;
  let confirmCode = await ConfirmCode.createToken(isExistUser);
  var transporter = nodemailer.createTransport({
    // config mail server
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GOOGLE_ACCOUNT, //Tài khoản gmail vừa tạo
      pass: process.env.GOOGLE_PASSWORD, //Mật khẩu tài khoản gmail vừa tạo
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });
  var content = '';
  content += `
      <div style="padding: 10px; background-color: #003375">
          <div style="padding: 10px; background-color: white;">
              <h4 style="color: #0085ff">Hi ${isExistUser.displayName}</h4>
              <span style="color: black">Your confirm code is ${confirmCode}</span>
          </div>
      </div>
  `;
  var mainOptions = {
    // thiết lập đối tượng, nội dung gửi mail
    from: 'Lanspire',
    to: email,
    subject: 'Reset Passowrd',
    text: 'Your confirm code is' + confirmCode, //Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
    html: content,
  };
  transporter.sendMail(mainOptions, function (err, info) {
    if (err) {
      console.log(err);
      res.send('Error when send mail');
    } else {
      console.log('Message sent: ' + info.response);
      res.send(`Send confim code to ${isExistUser.email} successfully`);
    }
  });
};
const resetPassword = async (req, res) => {
  const username = req.body.username;
  const isExistUser = await User.findOne({ where: { username: username } });
  const code = req.body.code;
  let confirmCode = await ConfirmCode.findOne({
    where: { idUser: isExistUser.idUser, token: code },
  });

  if (!confirmCode) {
    res.status(404).json({ message: 'Confirm code is incorrect!' });
    return;
  }

  if (ConfirmCode.verifyExpiration(confirmCode)) {
    ConfirmCode.destroy({ where: { id: confirmCode.id } });

    res.status(404).json({
      message: 'Confirm code was expired. Please make a new reset request',
    });
    return;
  }
  User.update(
    { password: req.body.password },
    {
      where: { idUser: isExistUser.idUser },
    }
  )
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: 'Reset password successfully.',
        });
      } else {
        res.status(500).send({
          message: `Reset password failure`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Reset password failure',
      });
    });
};
module.exports = { signin, refreshToken, sendMail, resetPassword };

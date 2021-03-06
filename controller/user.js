const userModel = require('../models/user.js');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const env = require('../config/environment');

module.exports.create = function(req, res, next) {
  let { user, password } = req.body;
  userModel
    .findOne({ name: user })
    .then(result => {
      if (result) {
        return res
          .status(200)
          .json({ bool: false, error: 'Username Already In Use' });
      }
      bcrypt.hash(password, null, null, function(err1, hash) {
        // Store hash in your password DB.
        if (err1) return res.status(500).json(err1);
        userModel
          .findOneAndUpdate(
            { name: user },
            { name: user, password: hash },
            { upsert: true }
          )
          .then(result => {
            return res.status(200).json({ bool: true, error: null });
          })
          .catch(err => {
            return res.status(400).json(err2);
          });
      });
    })
    .catch(err => {
      return res
        .status(403)
        .json({ bool: false, error: 'Error Finding Username' });
    });
};

module.exports.receive = function(req, res, next) {
  let { user, password } = req.body;
  userModel
    .findOne({ name: user })
    .then(result => {
      if (!result)
        return res.status(202).json({ bool: false, error: 'No Such User' });
      bcrypt.compare(password, result.password, (err1, boolean) => {
        if (err1) {
          return res.status(301).json({ bool: null, error: err1 });
        } else if (boolean) {
          const token = jwt.sign(
            {
              user: result.name,
              id: result._id
            },
            env.JWT_SECRET
          );
          return res.status(200).json({ bool: boolean, error: null, token });
        }
        return res
          .status(200)
          .json({ bool: boolean, error: null, token: null });
      });
    })
    .catch(err => {
      return res.status(301).json({ bool: null, error: err0 });
    });
};

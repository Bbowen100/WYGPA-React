const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const env = require('../config/environment');

module.exports.jwtAuthentication = (req, res, next) => {
  const bearerTokenHeader = req.header('Authorization');
  // If there is no Authorization header, it means this is an un-authed request.
  if (!bearerTokenHeader) {
    return res.status(403).json({ error: 'No Authetication Header' });
  }
  const token = bearerTokenHeader.split(' ')[1];
  if (!token) return res.status(403).json({ error: 'No Token In Header' });
  jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
    userModel
      .findOne({ _id: decoded.id })
      .then(user => {
        if (!user) {
          return res.status(403).json({ error: 'No Matching User For Token' });
        }
        req.user = { name: user.name, id: decoded.id };
        next();
      })
      .catch(err => {
        return res.status(403).json({ error: err });
      });
  });
};

const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/jwt");


class UserController {

  register(req, res) {
    const user = new User(req.body);
    user.save()
      .then( () => {
        res
          .cookie("usertoken", jwt.sign({_id: user._id}, secret), {httpOnly: true})
          .json({loggedIn: true, user: user});
      })
      .catch(err => res.json(err)); 
  }

  login(req, res) {
    User.findOne({email: req.body.email})
      .then(user => {
        if(user === null) {
          res.json({msg: "invalid login attempt"});
        } else {
          bcrypt.compare(req.body.password, user.password)
            .then(passwordIsValid => {
              if(passwordIsValid) {
                res
                  .cookie("usertoken", jwt.sign({_id: user._id}, secret), {httpOnly: true})
                  .json({loggedIn: true, user: user});
              } else {
                res.json({msg: "invalid login attempt"});
              }
            })
            .catch(err => res.json({msg: "invalid login attempt"}));
        }
      })
      .catch(err => res.json(err));
  }

}

module.exports = new UserController();
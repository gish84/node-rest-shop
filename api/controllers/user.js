const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// metoda pro zaregistrování nového uživatele (vložení nového uživatele do dtb)
exports.user_signup = (req, res, next) => {
  // validace, zda již v dtb neexistuje user se zadaným emailem
  User.find({ email: req.body.email })
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({ message: "Mail exists" });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          // použití knihovny bcrypt pro zasifrovani hesla
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });

            user
              .save()
              .then((result) => {
                return res.status(200).json({ message: "User created" });
              })
              .catch((err) => {
                return res.status(500).json({ error: err });
              });
          }
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};

// metoda pro přihlášení existujícího uživatele
exports.user_login = (req, res, next) => {
  const email = req.body.email;

  User.find({ email: email })
    .then((itemList) => {
      if (itemList.length < 1) {
        return res.status(401).json({ message: "Auth failed" });
      }

      const user = itemList[0];

      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({ message: "Auth failed" });
        }

        if (result) {
          const token = jwt.sign(
            {
              email: email,
              userId: user._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({ message: "Auth successful", token });
        }
      });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};

// metoda pro smazání uživatele
exports.user_delete = (req, res, next) => {
  const id = req.params.userId;

  User.deleteOne({ _id: id })
    .then((result) => {
      return res.status(200).json({ message: "User deleted" });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};

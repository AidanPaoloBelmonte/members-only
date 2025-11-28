const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const { validateUser } = require("./validationController");
const db = require("../db/queries");

function getSignUp(req, res) {
  if (req.user) {
    res.redirect("/");
  }

  res.render("sign-up", {
    user: req.user,
  });
}

const postSignUp = [
  validateUser,
  async (req, res, next) => {
    const errors = {};
    validationResult(req).errors.forEach((err) => {
      errors[err.path] = err.msg;
    });

    if (Object.keys(errors).length > 0) {
      return res.status(400).render("sign-up", {
        errors: errors,
      });
    }

    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 8);
      await db.addUser(req.body.username, hashedPassword);

      res.redirect("/");
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
];

module.exports = {
  getSignUp,
  postSignUp,
};

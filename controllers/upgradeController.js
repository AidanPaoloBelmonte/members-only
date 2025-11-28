const bcrypt = require("bcryptjs");
const db = require("../db/queries");

require("dotenv").config();

function getUpgrade(req, res) {
  res.render("upgrade", {
    user: req.user,
  });
}

async function postUpgrade(req, res) {
  let match = false;
  try {
    match = req.body.passcode == process.env.UPGRADE_CODE;
  } catch (err) {
    res.status(400).render("upgrade", {
      errors: {
        passcode: "Membership Upgrades are unavailable at this time",
      },
    });
  }

  if (match) {
    await db.upgradeUser(req.user.id);

    req.user.membership = true;
    res.redirect("/");
  } else {
    res.status(400).render("upgrade", {
      errors: {
        passcode: "Incorrect Passcode",
      },
    });
  }
}

module.exports = {
  getUpgrade,
  postUpgrade,
};

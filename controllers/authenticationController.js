const { getPageNotFound } = require("./generalController");

const db = require("../db/queries");

function authenticateUser(req, res, next) {
  if (!req.user) {
    getPageNotFound(req, res);
  } else {
    next();
  }
}

async function authenticateMembership(req, res, next) {
  const isMember = await db.checkMembership(req.user.username);
  if (!isMember) {
    getPageNotFound(req, res);
  } else {
    next();
  }
}

async function authenticateAdmin(req, res, next) {
  const isAdmin = await db.checkAdmin(req.user.username);
  if (!isAdmin) {
    getPageNotFound(req, res);
  } else {
    next();
  }
}

module.exports = {
  authenticateUser,
  authenticateMembership,
  authenticateAdmin,
};

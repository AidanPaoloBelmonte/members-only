const { Router } = require("express");

const authController = require("../controllers/authenticationController");
const upgradeController = require("../controllers/upgradeController");

const upgradeRouter = Router();

upgradeRouter.get(
  "/",
  authController.authenticateUser,
  upgradeController.getUpgrade,
);
upgradeRouter.post(
  "/",
  authController.authenticateUser,
  upgradeController.postUpgrade,
);

module.exports = upgradeRouter;

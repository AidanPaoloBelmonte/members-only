module.exports = function handleLoginRouting(passport) {
  const { Router } = require("express");

  const logInController = require("../controllers/logInController");

  const logInRouter = Router();

  logInRouter.get("/", logInController.getLogIn);
  logInRouter.post(
    "/",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/log-in",
    }),
  );

  return logInRouter;
};

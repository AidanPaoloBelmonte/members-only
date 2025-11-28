module.exports = function handleRouting(passport) {
  const { Router } = require("express");

  const authController = require("../controllers/authenticationController");

  const handleLogInRouting = require("./logInRouter");
  const signUpRouter = require("./signUpRouter");
  const upgradeRouter = require("./upgradeRouter");

  const appController = require("../controllers/generalController");

  const appRouter = Router();

  appRouter.get("/", appController.getHome);
  appRouter.use("/sign-up", signUpRouter);
  appRouter.use("/log-in", handleLogInRouting(passport));
  appRouter.get("/log-out", appController.getLogOut);
  appRouter.use("/upgrade", upgradeRouter);
  appRouter.post(
    "/post-message",
    authController.authenticateUser,
    appController.postNewMessage,
  );
  appRouter.post(
    "/delete/:id",
    authController.authenticateAdmin,
    appController.postDeletePost,
  );

  appRouter.all("/{*lost}", appController.getPageNotFound);

  return appRouter;
};

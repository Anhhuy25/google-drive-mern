const authRouter = require("./auth");
const postsRouter = require("./posts");
const foldersRouter = require("./folders");
const insideFPsRouter = require("./insideFPs");
const insideFFsRouter = require("./insideFFs");

function route(app) {
  app.use("/api/insidefoldersfolders", insideFFsRouter);
  app.use("/api/insidefoldersposts", insideFPsRouter);
  app.use("/api/folders", foldersRouter);
  app.use("/api/posts", postsRouter);
  app.use("/api/auth", authRouter);
}

module.exports = route;

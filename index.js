const express = require("express");
const checkRequestFormat = require(".Server/middlewares/checkRequestFormat");
const userRouter = require(".Server/Routes/users");
const employeeRouter = require(".Server/Routes/employee");
const tachesRouter = require(".Server/Routes/tâches");
const projectRouter = require(".Server/Routes/project");
require("./models/db");

const app = express();

app.use(checkRequestFormat);
app.use(express.json());

app.use(userRouter);
app.use(employeeRouter);
app.use(tachesRouter);
app.use(projectRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});

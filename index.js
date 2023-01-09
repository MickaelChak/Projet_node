const express = require("express");
const checkRequestFormat = require("./middlewares/checkRequestFormat");
const userRouter = require("./Routes/users");
const employeeRouter = require("./Routes/employee");
const taskRouter = require("./Routes/task");
const projectRouter = require("./Routes/project");
require("./models/db");

const app = express();

app.use(checkRequestFormat);
app.use(express.json());

app.use(userRouter);
app.use(employeeRouter);
app.use(taskRouter);
app.use(projectRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});

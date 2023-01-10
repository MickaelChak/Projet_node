const express = require("express");
const checkRequestFormat = require("./middlewares/checkRequestFormat");
const errorHandler = require("./middlewares/errorHandler");
const userRouter = require("./routes/users");
const employeeRouter = require("./routes/employees");
const projectRouter = require("./routes/projects");
const taskRouter = require("./routes/tasks");
const securityRouter = require("./routes/security");
require("./models/db");

const app = express();

app.use(checkRequestFormat);
app.use(express.json());

app.use(securityRouter);
app.use(userRouter);
app.use(employeeRouter);
app.use(projectRouter);
app.use(taskRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});


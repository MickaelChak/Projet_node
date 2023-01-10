//Lea
const { Router } = require("express");
const  Employee  = require("../models/Employee");
const checkAuth = require("../middlewares/checkAuth");
const checkRole = require("../middlewares/checkRole");
const router = new Router();

// Get collection employees
router.get(
  "/employees",
  checkAuth(),
  checkRole(checkRole.ROLES.ADMIN),
  async (req, res) => {
    const employees = await Employee.findAll({
      where: req.query,
    });
    res.json(employees);
  }
);

// Create a new Employee
router.post(
  "/employees",
  checkAuth({ anonymous: true }),
  async (req, res, next) => {
    try {
      const employees = new Employee(req.body);
      await employees.save();
      res.status(201).json(employees);
    } catch (error) {
      console.log("Here");
      next(error);
    }
  }
);

// Get a specific Employee
router.get("/employees/:id", checkAuth(), async (req, res) => {
  const employee = await Employee.findByPk(parseInt(req.params.id));
  if (employee) {
    res.json(employee);
  } else {
    res.sendStatus(404);
  }
});

// Update a specific Employee
router.put(
  "/employees/:id",
  checkAuth(),
  async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const [nbUpdated] = await Employee.update(req.body, {
        where: {
          id,
        },
        individualHooks: true,
      });
      if (!nbUpdated) {
        res.sendStatus(404);
      } else {
        res.json(
          await Employee.findByPk(id)
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

// DELETE a specific Employee
router.delete("/employees/:id", checkAuth(), async (req, res) => {
  const id = parseInt(req.params.id);
  const nbDeleted = await Employee.destroy({
    where: {
      id,
    },
  });
  res.sendStatus(!nbDeleted ? 404 : 204);
});

module.exports = router;


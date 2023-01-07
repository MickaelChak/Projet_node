const { Router } = require("express");
const { Employee } = require("../../models");
const checkAuth = require("../middlewares/checkAuth");
const checkRole = require("../middlewares/checkRole");
const router = new Router();

// Get collection employee
router.get(
  "/employee",
  checkAuth(),
  async (req, res) => {
    const employee = await Employee.findAll({
      where: req.query,
    });
    res.json(employee);
  }
);

// Create a new Employee
router.post(
  "/employee",
  checkAuth(),
  async (req, res, next) => {
    try {
      const Employee = new Employee(req.body);
      await Employee.save();
      res.status(201).json(Employee);
    } catch (error) {
      next(error);
    }
  }
);

// Get a specific Employee
router.get("/employee/:id", checkAuth(), async (req, res) => {
  const Employee = await Employee.findByPk(parseInt(req.params.id));
  if (Employee) {
    res.json(Employee);
  } else {
    res.sendStatus(404);
  }
});

// Update a specific Employee
router.put(
  "/employee/:id",
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
router.delete("/employee/:id", checkAuth(), async (req, res) => {
  const id = parseInt(req.params.id);
  const nbDeleted = await Employee.destroy({
    where: {
      id,
    },
  });
  res.sendStatus(!nbDeleted ? 404 : 204);
});

module.exports = router;

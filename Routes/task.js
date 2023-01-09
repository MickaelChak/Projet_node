//Mickael
const { Router } = require("express");
const { Task } = require("../models");
const checkAuth = require("../middlewares/checkAuth");
const checkRole = require("../middlewares/checkRole");
const router = new Router();

// Get collection of tasks
router.get(
  "/task",
  checkAuth(),
  async (req, res) => {
    const task = await Task.findAll({
      where: req.query,
    });
    res.json(task);
  }
);

// Create a new task
router.post(
  "/task",
  checkAuth(),
  async (req, res, next) => {
    try {
      const task = new Task(req.body);
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  }
);

// Get a specific task
router.get("/task/:id", checkAuth(), async (req, res) => {
  const task = await Task.findByPk(parseInt(req.params.id));
  if (task) {
    res.json(task);
  } else {
    res.sendStatus(404);
  }
});

// Update a specific task
router.put(
  "/task/:id",
  checkAuth(),
  async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const [nbUpdated] = await Task.update(req.body, {
        where: {
          id,
        },
        individualHooks: true,
      });
      if (!nbUpdated) {
        res.sendStatus(404);
      } else {
        res.json(await Task.findByPk(id));
      }
    } catch (error) {
      next(error);
    }
  }
);

// DELETE a specific task
router.delete("/task/:id", checkAuth(), async (req, res) => {
  const nbDeleted = await Task.destroy({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.sendStatus(!nbDeleted ? 404 : 204);
});

module.exports = router;

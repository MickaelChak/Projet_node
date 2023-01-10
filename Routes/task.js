//Mickael
const { Router } = require("express");
const Task  = require("../models/Task");
const checkAuth = require("../middlewares/checkAuth");
const checkRole = require("../middlewares/checkRole");
const router = new Router();

// Get collection of tasks
router.get(
  "/tasks",
  checkAuth(),
  async (req, res) => {
    const tasks = await Task.findAll({
      where: req.query,
    });
    res.json(tasks);
  }
);

// Create a new tasks
router.post(
  "/tasks",
  checkAuth(),
  async (req, res, next) => {
    try {
      const tasks = new Task(req.body);
      await tasks.save();
      res.status(201).json(tasks);
    } catch (error) {
      next(error);
    }
  }
);

// Get a specific tasks
router.get("/tasks/:id", checkAuth(), async (req, res) => {
  const tasks = await Task.findByPk(parseInt(req.params.id));
  if (tasks) {
    res.json(tasks);
  } else {
    res.sendStatus(404);
  }
});

// Update a specific tasks
router.put(
  "/tasks/:id",
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
        res.json(
          await Task.findByPk(id)
          );
      }
    } catch (error) {
      next(error);
    }
  }
);

// DELETE a specific tasks
router.delete("/tasks/:id", checkAuth(), async (req, res) => {
  const nbDeleted = await Task.destroy({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.sendStatus(!nbDeleted ? 404 : 204);
});

module.exports = router;

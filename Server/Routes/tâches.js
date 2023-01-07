const { Router } = require("express");
const { Tâches } = require("../../models");
const checkAuth = require("../middlewares/checkAuth");
const checkRole = require("../middlewares/checkRole");
const router = new Router();

// Get collection of tasks
router.get(
  "/tâches",
  checkAuth(),
  async (req, res) => {
    const tâches = await Tâches.findAll({
      where: req.query,
    });
    res.json(tâches);
  }
);

// Create a new task
router.post(
  "/tâches",
  checkAuth(),
  async (req, res, next) => {
    try {
      const tâches = new Tâches(req.body);
      await tâches.save();
      res.status(201).json(tâches);
    } catch (error) {
      next(error);
    }
  }
);

// Get a specific task
router.get("/tâches/:id", checkAuth(), async (req, res) => {
  const tâches = await Tâches.findByPk(parseInt(req.params.id));
  if (tâches) {
    res.json(tâches);
  } else {
    res.sendStatus(404);
  }
});

// Update a specific task
router.put(
  "/tâches/:id",
  checkAuth(),
  async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const [nbUpdated] = await Tâches.update(req.body, {
        where: {
          id,
        },
        individualHooks: true,
      });
      if (!nbUpdated) {
        res.sendStatus(404);
      } else {
        res.json(await Tâches.findByPk(id));
      }
    } catch (error) {
      next(error);
    }
  }
);

// DELETE a specific task
router.delete("/tâches/:id", checkAuth(), async (req, res) => {
  const nbDeleted = await Tâches.destroy({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.sendStatus(!nbDeleted ? 404 : 204);
});

module.exports = router;

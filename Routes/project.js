//lea
const { Router } = require("express");
const { Project } = require("../models");
const checkAuth = require("../middlewares/checkAuth");
const checkRole = require("../middlewares/checkRole");
const router = new Router();

// Get collection project
router.get(
  "/project",
  checkAuth(),
  async (req, res) => {
    const project = await Project.findAll({
      where: req.query,
    });
    res.json(project);
  }
);

// Create a new Project
router.post(
  "/project",
  checkAuth(),
  async (req, res, next) => {
    try {
      const Project = new Project(req.body);
      await Project.save();
      res.status(201).json(Project);
    } catch (error) {
      next(error);
    }
  }
);

// Get a specific Project
router.get("/project/:id", checkAuth(), async (req, res) => {
  const Project = await Project.findByPk(parseInt(req.params.id));
  if (Project) {
    res.json(Project);
  } else {
    res.sendStatus(404);
  }
});

// Update a specific Project
router.put(
  "/project/:id",
  checkAuth(),
  async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const [nbUpdated] = await Project.update(req.body, {
        where: {
          id,
        },
        individualHooks: true,
      });
      if (!nbUpdated) {
        res.sendStatus(404);
      } else {
        res.json(
          await Project.findByPk(id)
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

// DELETE a specific Project
router.delete("/project/:id", checkAuth(), async (req, res) => {
  const id = parseInt(req.params.id);
  const nbDeleted = await Project.destroy({
    where: {
      id,
    },
  });
  res.sendStatus(!nbDeleted ? 404 : 204);
});

module.exports = router;

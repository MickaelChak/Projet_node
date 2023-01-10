//lea
const { Router } = require("express");
const Project  = require("../models/Project");
const checkAuth = require("../middlewares/checkAuth");
const checkRole = require("../middlewares/checkRole");
const router = new Router();

// Get collection projects
router.get(
  "/projects",
  checkAuth(),
  checkRole(checkRole.ROLES.ADMIN),
  async (req, res) => {
    const projects = await Project.findAll({
      where: req.query,
    });
    res.json(projects);
  }
);

// Create a new Project
router.post(
  "/projects",
  checkAuth({ anonymous: true }),
  async (req, res, next) => {
    try {
      const project = new Project(req.body);
      await project.save();
      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  }
);

// Get a specific Project
router.get("/projects/:id", checkAuth(), async (req, res) => {
  const project = await Project.findByPk(parseInt(req.params.id));
  if (project) {
    res.json(project);
  } else {
    res.sendStatus(404);
  }
});

// Update a specific Project
router.put(
  "/projects/:id",
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
router.delete("/projects/:id", checkAuth(), async (req, res) => {
  const id = parseInt(req.params.id);
  const nbDeleted = await Project.destroy({
    where: {
      id,
    },
  });
  res.sendStatus(!nbDeleted ? 404 : 204);
});

module.exports = router;

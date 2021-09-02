const express = require("express");
const router = express.Router();
const insideFFsController = require("../app/controllers/InsideFFsController");
const verifyToken = require("../app/middlewares/auth");

// My starr
router.patch(
  "/insidefolders-myfolders/remove-starr/:id",
  verifyToken,
  insideFFsController.removeStarrInsideFoldersFolders
);
router.patch(
  "/insidefolders-myfolders/my-starr/:id",
  verifyToken,
  insideFFsController.addStarrInsideFoldersFolders
);
router.get(
  "/insidefolders-myfolders/my-starr",
  verifyToken,
  insideFFsController.getStarredInsideFoldersFolders
);

// My trash
router.post(
  "/insidefolders-myfolders/my-trash/restore/:id",
  verifyToken,
  insideFFsController.restoreDeletedInsideFoldersFolders
);
router.delete(
  "/insidefolders-myfolders/my-trash/:id",
  verifyToken,
  insideFFsController.deleteInsideFoldersFolders
);
router.get(
  "/insidefolders-myfolders/my-trash",
  verifyToken,
  insideFFsController.getDeletedInsideFoldersFolders
);

// My folder
router.put(
  "/insidefolders-myfolders/update-folder/:id",
  verifyToken,
  insideFFsController.updateInsideFoldersFolders
);
router.delete(
  "/insidefolders-myfolders/remove-folder/:id",
  verifyToken,
  insideFFsController.removeInsideFoldersFolders
);
router.post(
  "/insidefolders-myfolders/create-folder",
  verifyToken,
  insideFFsController.createInsideFoldersFolders
);
router.get(
  "/insidefolders-myfolders",
  verifyToken,
  insideFFsController.getInsideFoldersMyFolders
);

module.exports = router;

const express = require("express");
const router = express.Router();
const foldersController = require("../app/controllers/FoldersController");
const verifyToken = require("../app/middlewares/auth");

// my-starr
router.patch(
  "/remove-starr-folders/:id",
  verifyToken,
  foldersController.removeStarrFolder
);
router.patch(
  "/starr-folders/:id",
  verifyToken,
  foldersController.addStarrFolder
);
router.get("/starr-folders", verifyToken, foldersController.getStarredFolders);

// my-trash
router.post(
  "/trash-folders/restore/:id",
  verifyToken,
  foldersController.restoreDeletedFolder
);
router.delete(
  "/trash-folders/:id",
  verifyToken,
  foldersController.deleteFolder
);
router.get("/trash-folders", verifyToken, foldersController.getDeletedFolders);

// my-folder
router.delete(
  "/softdelete-folder/:id",
  verifyToken,
  foldersController.removeFolder
);
router.put("/update-folder/:id", verifyToken, foldersController.updateFolder);
router.post("/create-folder", verifyToken, foldersController.createFolder);
router.get("/", verifyToken, foldersController.getAllFolders);

module.exports = router;

const express = require("express");
const router = express.Router();
const verifyToken = require("../app/middlewares/auth");
const insideFPsController = require("../app/controllers/InsideFPsController");
const upload = require("../app/middlewares/upload");

// /insidefolders-myposts/my-starr
router.patch(
  "/insidefolders-myposts/remove-starr/:id",
  verifyToken,
  insideFPsController.removeStarrInsideFoldersPosts
);
router.patch(
  "/insidefolders-myposts/my-starr/:id",
  verifyToken,
  insideFPsController.addStarrInsideFoldersPosts
);
router.get(
  "/insidefolders-myposts/my-starr",
  verifyToken,
  insideFPsController.getStarredInsideFoldersPosts
);

// /insidefolders-myposts/my-trash
router.post(
  "/insidefolders-myposts/my-trash/restore/:id",
  verifyToken,
  insideFPsController.restoreDeletedInsideFoldersPosts
);
router.delete(
  "/insidefolders-myposts/my-trash/:id",
  verifyToken,
  insideFPsController.deleteInsideFoldersPosts
);
router.get(
  "/insidefolders-myposts/my-trash",
  verifyToken,
  insideFPsController.getDeletedInsideFoldersPosts
);

// /insidefolders-myposts
router.post(
  "/insidefolders-myposts/search-post",
  verifyToken,
  insideFPsController.searchInsideFoldersPosts
);
router.post(
  "/insidefolders-myposts/separate-post",
  verifyToken,
  insideFPsController.separateInsideFoldersPosts
);
router.put(
  "/insidefolders-myposts/update-post/:id",
  verifyToken,
  insideFPsController.updateInsideFoldersPosts
);
router.delete(
  "/insidefolders-myposts/remove-post/:id",
  verifyToken,
  insideFPsController.removeInsideFoldersPosts
);
router.post(
  "/insidefolders-myposts/create-post",
  verifyToken,
  upload.single("myFileInside"),
  insideFPsController.createInsideFoldersPosts
);
router.get(
  "/insidefolders-myposts",
  verifyToken,
  insideFPsController.getInsideFoldersMyPosts
);

module.exports = router;

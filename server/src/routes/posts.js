const express = require("express");
const router = express.Router();
const upload = require("../app/middlewares/upload");

const postsController = require("../app/controllers/PostsController");

const verifyToken = require("../app/middlewares/auth");

//---------------------------------------------
// /my-starr
router.patch("/remove-starr/:id", verifyToken, postsController.removeStarrPost);
router.patch("/my-starr/:id", verifyToken, postsController.addStarrPost);
router.get("/my-starr", verifyToken, postsController.getStarredPosts);

// /my-trash
router.post(
  "/my-trash/restore/:id",
  verifyToken,
  postsController.restoreDeletedPost
);
router.delete("/my-trash/:id", verifyToken, postsController.deletePost);
router.get("/my-trash", verifyToken, postsController.getDeletedPosts);

// /my-posts
router.get("/my-posts", verifyToken, postsController.getAllPosts);
router.put("/:id", verifyToken, postsController.updatePost);
router.delete("/:id", verifyToken, postsController.removePost);
router.post("/separate-post", verifyToken, postsController.separatePost);
router.post("/search", verifyToken, postsController.searchPost);
router.post(
  "/create-post",
  verifyToken,
  upload.single("myFile"),
  postsController.createPost
);

module.exports = router;

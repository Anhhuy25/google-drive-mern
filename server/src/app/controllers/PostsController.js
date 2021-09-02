const Post = require("../models/Post");
const Folder = require("../models/Folder");
const { google } = require("googleapis");
const fs = require("fs");

// Link lấy token khi hết hạn: (1 tuần)
// https://console.cloud.google.com/apis/credentials/oauthclient/131805264054-mtf8o5v5dalrirats7nqag1bdjbf65ar.apps.googleusercontent.com?project=mern-project-320213&supportedpurview=project

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};

let nameFile = "";

const checkPostExist = (arr, name) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === name) {
      nameFile = arr[i];
      return true;
    }
  }
  return false;
};

const countDocuments = (arr, name) => {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].split(" (")[0] === name) {
      count++;
    }
  }
  return count;
};

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

class PostsController {
  // GET /my-posts
  async getAllPosts(req, res) {
    try {
      const posts = await Post.find({ user: req.userId }).populate(
        "user",
        "username"
      );
      res.json({ success: true, posts });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Interal server error" });
    }
  }

  // POST /create-post
  async createPost(req, res, next) {
    // https://drive.google.com/thumbnail?id=YourFileID
    // Lấy dc hình ảnh khi upload file
    const fileUpload = req.file;

    if (!fileUpload) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }

    try {
      const listPosts = await Post.find({});
      const listNames = listPosts.map((post) => post.fileName);
      const valueCheck = checkPostExist(listNames, fileUpload.originalname);

      if (valueCheck) {
        res.json({
          success: true,
          msg: "Do you want to separate post?",
          name: nameFile,
        });
      } else {
        const response = await drive.files.create({
          requestBody: {
            name: fileUpload.originalname,
            mimeType: fileUpload.mimetype,
          },
          media: {
            mimeType: fileUpload.mimetype,
            body: fs.createReadStream(fileUpload.path),
          },
        });

        const fileId = response.data.id;
        const result = await drive.files.get({
          fileId,
          fields: "webViewLink, webContentLink",
        });

        const id = result.data.webViewLink.slice(32, 65);
        await drive.permissions.create({
          fileId,
          requestBody: {
            role: "reader",
            type: "anyone",
          },
        });

        const newPost = new Post({
          user: req.userId,
          fileName: fileUpload.originalname,
          filePath: fileUpload.path,
          fileSize: fileSizeFormatter(fileUpload.size, 2),
          fileImage: `https://drive.google.com/thumbnail?id=${id}`,
          fileLinkDownload: result.data.webContentLink,
          fileMimeType: fileUpload.mimetype,
          isStarred: 0,
        });

        await newPost.save();
        res.json({ success: true, msg: "Upload post success", post: newPost });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Interal server error" });
    }
  }

  // POST /separate-post
  async separatePost(req, res) {
    const { separateFile } = req.body;

    try {
      const separateFilePost = new Post({
        user: req.userId,
        fileName: separateFile.fileName,
        filePath: separateFile.filePath,
        fileSize: separateFile.fileSize,
        fileImage: separateFile.fileImage,
        fileLinkDownload: separateFile.fileLinkDownload,
        fileMimeType: separateFile.fileMimeType,
        isStarred: separateFile.isStarred,
      });
      await separateFilePost.save();

      const listPosts = await Post.find({});
      const listNames = listPosts.map((post) => post.fileName);

      // Dem so luong file trung ten voi file upload
      const count = countDocuments(listNames, separateFilePost.fileName);

      // Khi separate file thi tao ben google drive 1 file nhu vay
      // Nhung khi download ve thi file se co dinh dang chua xac dinh
      const response = await drive.files.create({
        requestBody: {
          name: separateFilePost.fileName + ` (${count - 1})`,
          mimeType: separateFilePost.fileMimeType,
        },
        media: {
          mimeType: separateFilePost.fileMimeType,
          body: fs.createReadStream(separateFilePost.filePath),
        },
      });
      const fileId = response.data.id;
      const result = await drive.files.get({
        fileId,
        fields: "webViewLink, webContentLink",
      });
      await drive.permissions.create({
        fileId,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });
      const id = result.data.webViewLink.slice(32, 65);

      // const id = separateFilePost.fileImage.slice(38);
      // var copyRequest = {
      //   // Modified
      //   name: separateFilePost.fileName + ` (${count - 1})`,
      //   parents: [],
      // };
      // await drive.files.copy({
      //   fileId: id,
      //   requestBody: copyRequest, // or resource: copyRequest
      // });

      // Sau khi luu du lieu vao database thi thay doi ten cua file
      const query = { fileName: separateFilePost.fileName };
      await Post.findOneAndUpdate(query, {
        fileName: separateFilePost.fileName + ` (${count - 1})`,
        fileImage: `https://drive.google.com/thumbnail?id=${id}`,
        fileLinkDownload: `https://drive.google.com/uc?id=${id}&export=download`,
      });
      await separateFilePost.save();

      res.json({
        success: true,
        msg: "Separate post successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Interal server error" });
    }
  }

  // POST /search
  async searchPost(req, res) {
    try {
      const { query } = req.body;

      // Tim kiem file theo real google drive
      // let pageToken = null;
      // let querySearch =
      //   "name contains '" +
      //   query +
      //   "' and trashed = false and " +
      //   "not mimeType = 'application/vnd.google-apps.folder'";
      // const result = await drive.files.list({
      //   q: querySearch,
      //   fields: "nextPageToken, files(id, name), files/parents",
      //   spaces: "drive",
      //   pageToken,
      // });

      // Search posts
      const arrPost = await Post.find({
        user: req.userId,
      }).populate("user", "username");
      const resultPost = arrPost.filter((post) =>
        post.fileName.toLowerCase().includes(query)
      );

      // Search folders
      const arrFolder = await Folder.find({
        user: req.userId,
      }).populate("user", "username");
      const resultFolder = arrFolder.filter((folder) =>
        folder.folderName.toLowerCase().includes(query)
      );

      res.json({
        success: true,
        msg: "Find post successfully",
        posts: resultPost,
        folders: resultFolder,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Interal server error" });
    }
  }

  // PUT /:id
  async updatePost(req, res) {
    const { file } = req.body;

    if (!file.fileName)
      return res.status(400).json({ success: false, msg: "Title is required" });
    try {
      let updatedPost = file;

      // Edit name file in real Google Drive
      const result = await drive.files.get({
        fileId: `${file.fileImage.slice(38)}`,
      });
      let body = { name: file.fileName };
      let media = {
        mimeType: result.data.mimeType,
        body: fs.createReadStream(file.filePath),
      };
      await drive.files.update({
        fileId: `${result.data.id}`,
        media: media,
        resource: body,
      });

      const postUpdatedCondition = { _id: req.params.id, user: req.userId };
      updatedPost = await Post.findOneAndUpdate(
        postUpdatedCondition,
        updatedPost,
        { new: true }
      );

      if (!updatedPost)
        return res.status(401).json({
          success: false,
          msg: "Post not found or user not authorised",
        });

      res.json({
        success: true,
        msg: "Update post successfully!",
        post: updatedPost,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Interal server error" });
    }
  }

  // SOFT DELETE /:id
  async removePost(req, res) {
    try {
      const postDeletedCondition = { _id: req.params.id, user: req.userId };
      const removePost = await Post.delete(postDeletedCondition);

      if (!removePost)
        return res.status(401).json({
          success: false,
          msg: "Post not found or user not authorised",
        });
      res.json({
        success: true,
        msg: "Soft delete post successfully!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Interal server error" });
    }
  }

  // DELETE /my-trash/:id
  async deletePost(req, res) {
    try {
      const postDeletedCondition = { _id: req.params.id, user: req.userId };
      const deletePost = await Post.deleteOne(postDeletedCondition);

      if (!deletePost)
        return res.status(401).json({
          success: false,
          msg: "Post not found or user not authorised",
        });
      res.json({
        success: true,
        msg: "Delete post successfully!",
        post: deletePost,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Interal server error" });
    }
  }

  // GET /my-trash
  async getDeletedPosts(req, res) {
    try {
      const deletedPosts = await Post.findDeleted({
        user: req.userId,
      }).populate("user", "username");
      res.json({ success: true, deletedPosts });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Internal server error" });
    }
  }

  // POST /my-trash/restore/:id
  async restoreDeletedPost(req, res) {
    try {
      await Post.restore({ _id: req.params.id, user: req.userId });
      res.json({
        success: true,
        msg: "Restore post successfully!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Internal server error" });
    }
  }

  // GET /my-starr
  async getStarredPosts(req, res) {
    try {
      const starredPosts = await Post.find({ user: req.userId })
        .or([{ isStarred: 1 }])
        .populate("user", "username");

      res.json({ success: true, starredPosts });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Internal server error" });
    }
  }

  // PATCH /my-starr/:id
  async addStarrPost(req, res) {
    try {
      const starredPost = await Post.findByIdAndUpdate(req.params.id, {
        isStarred: 1,
      });

      res.json({
        success: true,
        msg: "Add post to starr successfully!",
        starredPost,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Internal server error" });
    }
  }

  // PATCH /remove-starr/:id
  async removeStarrPost(req, res) {
    try {
      const starredPost = await Post.findByIdAndUpdate(req.params.id, {
        isStarred: 0,
      });

      res.json({
        success: true,
        msg: "Remove post from starr successfully!",
        starredPost,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Internal server error" });
    }
  }
}

module.exports = new PostsController();

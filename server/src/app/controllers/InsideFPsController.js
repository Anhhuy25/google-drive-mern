const insideFP = require("../models/InsideFP");
const Folder = require("../models/Folder");
const { google } = require("googleapis");
const fs = require("fs");

// Link lấy token khi hết hạn: (1 tuần)
// https://console.cloud.google.com/apis/credentials/oauthclient/131805264054-mtf8o5v5dalrirats7nqag1bdjbf65ar.apps.googleusercontent.com?project=mern-project-320213&supportedpurview=project

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

// Format kich thuoc file
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

// Kiem tra post co ton tai truoc hay chua
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

// Dem so luong document trong collection
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

class InsideFPsController {
  // GET /insidefolders-myposts
  async getInsideFoldersMyPosts(req, res) {
    try {
      const insideFolders_Posts = await insideFP
        .find({
          user: req.userId,
        })
        .populate("user", "username");
      res.json({ success: true, insideFolders_Posts });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Interal server error" });
    }
  }

  // POST /insidefolders-myposts/create-post
  async createInsideFoldersPosts(req, res, next) {
    // https://drive.google.com/thumbnail?id=YourFileID
    // Lấy dc hình ảnh khi upload file
    const fileUpload = req.file;
    const { folderId } = req.body;

    if (!fileUpload) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }

    try {
      // Tim danh sach ten tat ca cac post, roi kiem tra
      const listPosts = await insideFP.find({});
      const listNames = listPosts.map((post) => post.fileName);
      const valueCheck = checkPostExist(listNames, fileUpload.originalname);

      // Tim danh sach id tat ca folder, roi lay ra id phu hop
      const listFolders = await Folder.find({});
      const listIds = listFolders.map((folder) => folder._id.toString());
      const findFolderIdExist = listIds.find((id) => id === folderId);

      const findPostMatch = listPosts.find(
        (post) => post.fileName === fileUpload.originalname
      );

      if (valueCheck && findPostMatch.folder.toString() === folderId) {
        res.json({
          success: true,
          msg: "Post has in folder",
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

        const newInsideFolders_Post = new insideFP({
          user: req.userId,
          folder: findFolderIdExist,
          fileName: fileUpload.originalname,
          filePath: fileUpload.path,
          fileSize: fileSizeFormatter(fileUpload.size, 2),
          fileImage: `https://drive.google.com/thumbnail?id=${id}`,
          fileLinkDownload: result.data.webContentLink,
          fileMimeType: fileUpload.mimetype,
          isStarred: 0,
        });
        await newInsideFolders_Post.save();

        res.json({
          success: true,
          msg: "Upload post inside folder success",
          post: newInsideFolders_Post,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Interal server error" });
    }
  }

  // POST /insidefolders-myposts/separate-post
  async separateInsideFoldersPosts(req, res) {
    const { separateFile, id } = req.body;

    // Tim danh sach id tat ca folder, roi lay ra id phu hop
    const listFolders = await Folder.find({});
    const listIds = listFolders.map((folder) => folder._id.toString());
    const findFolderIdExist = listIds.find((listid) => listid === id);

    try {
      const separateFileInsideFP = new insideFP({
        user: req.userId,
        folder: findFolderIdExist,
        fileName: separateFile.fileName,
        filePath: separateFile.filePath,
        fileSize: separateFile.fileSize,
        fileImage: separateFile.fileImage,
        fileLinkDownload: separateFile.fileLinkDownload,
        fileMimeType: separateFile.fileMimeType,
        isStarred: separateFile.isStarred,
      });
      await separateFileInsideFP.save();

      const listPosts = await insideFP.find({});
      const listNames = listPosts.map((post) => post.fileName);

      // Dem so luong file trung ten voi file upload
      let count = countDocuments(listNames, separateFileInsideFP.fileName);

      // Khi separate file thi tao ben google drive 1 file nhu vay
      // Nhung khi download ve thi file se co dinh dang chua xac dinh
      const response = await drive.files.create({
        requestBody: {
          name: separateFileInsideFP.fileName + ` (${count - 1})`,
          mimeType: separateFileInsideFP.fileMimeType,
        },
        media: {
          mimeType: separateFileInsideFP.fileMimeType,
          body: fs.createReadStream(separateFileInsideFP.filePath),
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

      // Sau khi luu du lieu vao database thi thay doi ten cua file
      const query = { fileName: separateFileInsideFP.fileName };
      await insideFP.findOneAndUpdate(query, {
        fileName: separateFileInsideFP.fileName + ` (${count - 1})`,
        fileImage: `https://drive.google.com/thumbnail?id=${id}`,
        fileLinkDownload: `https://drive.google.com/uc?id=${id}&export=download`,
      });
      await separateFileInsideFP.save();

      res.json({
        success: true,
        msg: "Separate inside folders posts successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Interal server error" });
    }
  }

  // POST /insidefolders-myposts/search-post
  async searchInsideFoldersPosts(req, res) {
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

      const arr = await insideFP
        .find({
          user: req.userId,
        })
        .populate("user", "username");
      const result = arr.filter((post) =>
        post.fileName.toLowerCase().includes(query)
      );

      res.json({
        success: true,
        msg: "Find inside folders posts successfully",
        posts: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Interal server error" });
    }
  }

  // PUT /insidefolders-myposts/update-post/:id
  async updateInsideFoldersPosts(req, res) {
    const { file } = req.body;

    if (!file.fileName)
      return res.status(400).json({ success: false, msg: "Title is required" });
    try {
      let updatedInsideFPs = file;

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

      updatedInsideFPs = await insideFP.findOneAndUpdate(
        { _id: req.params.id, user: req.userId },
        updatedInsideFPs,
        { new: true }
      );

      if (!updatedInsideFPs)
        return res.status(401).json({
          success: false,
          msg: "Post not found or user not authorised",
        });

      res.json({
        success: true,
        msg: "Update inside folders posts successfully!",
        post: updatedInsideFPs,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Interal server error" });
    }
  }

  // SOFT DELETE /insidefolders-myposts/remove-post/:id
  async removeInsideFoldersPosts(req, res) {
    try {
      const removeInsideFP = await insideFP.delete({
        _id: req.params.id,
        user: req.userId,
      });

      if (!removeInsideFP)
        return res.status(401).json({
          success: false,
          msg: "Post not found or user not authorised",
        });
      res.json({
        success: true,
        msg: "Soft delete inside FP successfully!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Interal server error" });
    }
  }

  // DELETE /insidefolders-myposts/my-trash/:id
  async deleteInsideFoldersPosts(req, res) {
    try {
      const deletePost = await insideFP.deleteOne({
        _id: req.params.id,
        user: req.userId,
      });

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

  // GET /insidefolders-myposts/my-trash
  async getDeletedInsideFoldersPosts(req, res) {
    try {
      const deletedInsideFPs = await insideFP
        .findDeleted({
          user: req.userId,
        })
        .populate("user", "username");
      res.json({ success: true, deletedInsideFPs });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Internal server error" });
    }
  }

  // POST /insidefolders-myposts/my-trash/restore/:id
  async restoreDeletedInsideFoldersPosts(req, res) {
    try {
      await insideFP.restore({ _id: req.params.id, user: req.userId });
      res.json({
        success: true,
        msg: "Restore post successfully!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Internal server error" });
    }
  }

  // GET /insidefolders-myposts/my-starr
  async getStarredInsideFoldersPosts(req, res) {
    try {
      const starredInsideFPs = await insideFP
        .find({ user: req.userId })
        .or([{ isStarred: 1 }])
        .populate("user", "username");

      res.json({ success: true, starredInsideFPs });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Internal server error" });
    }
  }

  // PATCH /insidefolders-myposts/my-starr/:id
  async addStarrInsideFoldersPosts(req, res) {
    try {
      const starrInsideFP = await insideFP.findByIdAndUpdate(req.params.id, {
        isStarred: 1,
      });

      res.json({
        success: true,
        msg: "Add post to starr successfully!",
        starrInsideFP,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Internal server error" });
    }
  }

  // PATCH /insidefolders-myposts/remove-starr/:id
  async removeStarrInsideFoldersPosts(req, res) {
    try {
      const removestarrFP = await insideFP.findByIdAndUpdate(req.params.id, {
        isStarred: 0,
      });

      res.json({
        success: true,
        msg: "Remove post from starr successfully!",
        removestarrFP,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Internal server error" });
    }
  }
}

module.exports = new InsideFPsController();

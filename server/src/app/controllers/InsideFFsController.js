const InsideFF = require("../models/InsideFF");
const Folder = require("../models/Folder");
const { google } = require("googleapis");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

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

class InsideFFsController {
  // GET /insidefolders-myfolders
  async getInsideFoldersMyFolders(req, res) {
    try {
      const folders = await InsideFF.find({ user: req.userId }).populate(
        "user",
        "username"
      );

      res.json({ success: true, folders });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: error });
    }
  }

  // POST /insidefolders-myfolders/create-folder
  async createInsideFoldersFolders(req, res) {
    const { name, id } = req.body;

    try {
      // Tim danh sach id tat ca folder, roi lay ra id phu hop
      const listFolders = await Folder.find({});
      const listIds = listFolders.map((folder) => folder._id.toString());
      const findFolderIdExist = listIds.find((listid) => listid === id);

      // Tao folder ben google drive
      const fileMetadata = {
        name: name,
        mimeType: "application/vnd.google-apps.folder",
        // parents: folderIds,
      };
      const response = await drive.files.create({
        resource: fileMetadata,
        fields: "id",
      });

      const newFolder = new InsideFF({
        user: req.userId,
        folder: findFolderIdExist,
        folderName: response.config.data.name,
        folderMimeType: response.config.data.mimeType,
        folderType: "Google Drive Folder",
        isStarred: 0,
      });
      await newFolder.save();

      res.json({
        success: true,
        msg: "Create folder success",
        folder: newFolder,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: error });
    }
  }

  // PUT /insidefolders-myfolders/update-folder/:id
  async updateInsideFoldersFolders(req, res) {
    const { folder } = req.body;

    if (!folder.folderName)
      return res.status(400).json({ success: false, msg: "Title is required" });
    try {
      let updatedFolder = folder;
      updatedFolder = await InsideFF.findOneAndUpdate(
        { _id: req.params.id, user: req.userId },
        updatedFolder
      );

      res.json({
        success: true,
        msg: "Update inside folder successfully",
        updatedFolder,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: error });
    }
  }

  // SOFT DELETE /insidefolders-myfolders/remove-folder/:id
  async removeInsideFoldersFolders(req, res) {
    try {
      const removeFolder = await InsideFF.delete({
        _id: req.params.id,
        user: req.userId,
      });

      if (!removeFolder)
        return res.status(401).json({
          success: false,
          msg: "Folder not found or user not authorised",
        });
      res.json({
        success: true,
        msg: "Soft delete folder successfully!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: error });
    }
  }

  // GET SOFT DELETE /insidefolders-myfolders/my-trash
  async getDeletedInsideFoldersFolders(req, res) {
    try {
      const deletedFolders = await InsideFF.findDeleted({
        user: req.userId,
      }).populate("user", "username");
      res.json({ success: true, deletedFolders });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: error });
    }
  }

  // DELETE /insidefolders-myfolders/my-trash/:id
  async deleteInsideFoldersFolders(req, res) {
    try {
      const folderDeletedCondition = { _id: req.params.id, user: req.userId };
      const deleteFolder = await InsideFF.deleteOne(folderDeletedCondition);

      if (!deleteFolder)
        return res.status(401).json({
          success: false,
          msg: "Folder not found or user not authorised",
        });
      res.json({
        success: true,
        msg: "Delete folder successfully!",
        folder: deleteFolder,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: error });
    }
  }

  // POST /insidefolders-myfolders/my-trash/restore/:id
  async restoreDeletedInsideFoldersFolders(req, res) {
    try {
      await InsideFF.restore({ _id: req.params.id, user: req.userId });
      res.json({
        success: true,
        msg: "Restore folder successfully!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: error });
    }
  }

  // GET /insidefolders-myfolders/my-starr
  async getStarredInsideFoldersFolders(req, res) {
    try {
      const starredFolders = await InsideFF.find({ user: req.userId })
        .or([{ isStarred: 1 }])
        .populate("user", "username");

      res.json({ success: true, starredFolders });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: error });
    }
  }

  // PATCH /insidefolders-myfolders/my-starr/:id
  async addStarrInsideFoldersFolders(req, res) {
    try {
      const starredFolder = await InsideFF.findByIdAndUpdate(req.params.id, {
        isStarred: 1,
      });

      res.json({
        success: true,
        msg: "Add folder to starr successfully!",
        starredFolder,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: error });
    }
  }

  // PATCH /insidefolders-myfolders/remove-starr/:id
  async removeStarrInsideFoldersFolders(req, res) {
    try {
      const starredFolder = await InsideFF.findByIdAndUpdate(req.params.id, {
        isStarred: 0,
      });

      res.json({
        success: true,
        msg: "Remove folder from starr successfully!",
        starredFolder,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: error });
    }
  }
}

module.exports = new InsideFFsController();

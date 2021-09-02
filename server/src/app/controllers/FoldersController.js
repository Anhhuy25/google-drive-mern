const Folder = require("../models/Folder");
const InsideFF = require("../models/InsideFF");
const InsideFP = require("../models/InsideFP");
const { google } = require("googleapis");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
//const REDIRECT_URL = 'http://localhost:3000/api/v1/drive';

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

class FoldersController {
  // GET /
  async getAllFolders(req, res) {
    try {
      const folders = await Folder.find({ user: req.userId }).populate(
        "user",
        "username"
      );

      res.json({ success: true, folders });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Interal server error" });
    }
  }

  // POST /create-folder
  async createFolder(req, res) {
    const { name } = req.body;

    try {
      const fileMetadata = {
        name: name,
        mimeType: "application/vnd.google-apps.folder",
        // parents: folderIds,
      };
      const response = await drive.files.create({
        resource: fileMetadata,
        fields: "id",
      });

      const newFolder = new Folder({
        user: req.userId,
        folderName: response.config.data.name,
        folderMimeType: response.config.data.mimeType,
        folderType: "Google Drive Folder",
        folderPathId: response.data.id,
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
      res.status(500).json({ success: false, msg: "Interal server error" });
    }
  }

  // PUT /update-folder/:id
  async updateFolder(req, res) {
    const { folder } = req.body;

    if (!folder.folderName)
      return res.status(400).json({ success: false, msg: "Title is required" });
    try {
      let updatedFolder = folder;
      updatedFolder = await Folder.findOneAndUpdate(
        { _id: req.params.id, user: req.userId },
        updatedFolder
      );

      res.json({
        success: true,
        msg: "Update folder successfully",
        updatedFolder,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Interal server error" });
    }
  }

  // SOFT DELETE /softdelete-folder/:id
  async removeFolder(req, res) {
    try {
      const removeFolder = await Folder.delete({
        _id: req.params.id,
        user: req.userId,
      });
      await InsideFP.delete({});
      await InsideFF.delete({});

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
      res.status(500).json({ success: false, msg: "Interal server error" });
    }
  }

  // GET SOFT DELETE /trash-folders
  async getDeletedFolders(req, res) {
    try {
      const deletedFolders = await Folder.findDeleted({
        user: req.userId,
      }).populate("user", "username");
      res.json({ success: true, deletedFolders });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Interal server error" });
    }
  }

  // DELETE /trash-folders/:id
  async deleteFolder(req, res) {
    try {
      const folderDeletedCondition = { _id: req.params.id, user: req.userId };
      const deleteFolder = await Folder.deleteOne(folderDeletedCondition);
      await InsideFF.deleteMany({});
      await InsideFP.deleteMany({});

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
      res.status(500).json({ success: false, msg: "Interal server error" });
    }
  }

  // POST /trash-folders/restore/:id
  async restoreDeletedFolder(req, res) {
    try {
      await Folder.restore({ _id: req.params.id, user: req.userId });
      await InsideFF.restore({});
      await InsideFP.restore({});

      res.json({
        success: true,
        msg: "Restore folder successfully!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Internal server error" });
    }
  }

  // GET /starr-folders
  async getStarredFolders(req, res) {
    try {
      const starredFolders = await Folder.find({ user: req.userId })
        .or([{ isStarred: 1 }])
        .populate("user", "username");

      res.json({ success: true, starredFolders });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Internal server error" });
    }
  }

  // PATCH /starr-folders/:id
  async addStarrFolder(req, res) {
    try {
      const starredFolder = await Folder.findByIdAndUpdate(req.params.id, {
        isStarred: 1,
      });

      res.json({
        success: true,
        msg: "Add folder to starr successfully!",
        starredFolder,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Internal server error" });
    }
  }

  // PATCH /remove-starr-folders/:id
  async removeStarrFolder(req, res) {
    try {
      const starredFolder = await Folder.findByIdAndUpdate(req.params.id, {
        isStarred: 0,
      });

      res.json({
        success: true,
        msg: "Remove folder from starr successfully!",
        starredFolder,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Internal server error" });
    }
  }
}

module.exports = new FoldersController();

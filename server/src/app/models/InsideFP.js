const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const InsideFPsSchema = new Schema(
  {
    fileName: { type: String, required: true },
    filePath: { type: String, required: true },
    fileSize: { type: String, required: true },
    fileImage: { type: String, required: true },
    fileLinkDownload: { type: String, required: true },
    fileMimeType: { type: String, required: true },
    isStarred: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "user" },
    folder: { type: Schema.Types.ObjectId, ref: "folder" },
  },
  { timestamps: true }
);

InsideFPsSchema.plugin(mongooseDelete, {
  deletedAd: true,
  deletedBy: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("insidefp", InsideFPsSchema);

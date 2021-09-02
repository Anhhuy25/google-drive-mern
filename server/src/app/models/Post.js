const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const PostsSchema = new Schema(
  {
    fileName: { type: String, required: true },
    filePath: { type: String, required: true },
    fileSize: { type: String, required: true },
    fileImage: { type: String, required: true },
    fileLinkDownload: { type: String, required: true },
    fileMimeType: { type: String, required: true },
    isStarred: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);

PostsSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("post", PostsSchema);

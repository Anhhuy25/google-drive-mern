const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const InsideFFsSchema = new Schema(
  {
    folderName: { type: String, required: true },
    folderMimeType: { type: String, required: true },
    folderType: { type: String, required: true },
    isStarred: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "user" },
    folder: { type: Schema.Types.ObjectId, ref: "folder" },
  },
  { timestamps: true }
);

InsideFFsSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("insideff", InsideFFsSchema);

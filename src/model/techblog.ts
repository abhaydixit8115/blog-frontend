import mongoose, { Model } from "mongoose";

const { Schema } = mongoose;

const TechBlogSchema = new Schema(
  {
    slug: { type: String, unique: true, required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], required: true },
    keywords: { type: [String], required: true },
    content: {
      type: {
        type: String,
        enum: ["markdown", "html"],
        required: true,
      },
      content: { type: String, required: true },
    },
    mcontent: {
      present: { type: Boolean, required: true, default: false },
      visible: { type: Boolean, required: true, default: false },
      content: { type: String, required: true, default: "" },
      type: {
        type: String,
        enum: ["markdown", "html"],
        required: true,
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    rank: { type: Number, index: true, required: true },
    thumbnail: {
      present: {
        type: Boolean,
        default: false,
      },
      url: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

// export default mongoose.model("TechBlog", TechBlogSchema);

let TechBlog: Model<any>;
if (mongoose.models.TechBlog) TechBlog = mongoose.models.TechBlog;
else TechBlog = mongoose.model("TechBlog", TechBlogSchema);
export default TechBlog;

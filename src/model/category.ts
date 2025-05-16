import mongoose, { Model } from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    count: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
let Category: Model<any>;
if (mongoose.models.Category) Category = mongoose.models.Category;
else Category = mongoose.model("Category", categorySchema, "Category");
export default Category;

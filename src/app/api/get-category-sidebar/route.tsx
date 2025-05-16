import { NextResponse } from "next/server";
import Category from "@/model/category"; // Category model
import TechBlog from "@/model/techblog";
import dbConnect from "@/lib/mongodb";

export async function GET() {
  try {
    await dbConnect(); // Ensure DB connection

    // Fetch all category IDs from the Category collection
    const categories = await Category.find({}, "_id");
    // console.log(categories);
    const categoryIds = categories.map((cat: any) => cat._id);

    if (!categoryIds.length) {
      return NextResponse.json(
        { message: "No categories found" },
        { status: 404 }
      );
    }

    // Aggregation to fetch three blogs per category
    const blogs = await TechBlog.aggregate([
      { $match: { category: { $in: categoryIds } } },
      { $group: { _id: "$category", blogs: { $push: "$$ROOT" } } },
      {
        $lookup: {
          from: "Category", // Replace with your actual category collection name
          localField: "_id",
          foreignField: "_id",
          as: "categoryData",
        },
      },
      {
        $unwind: "$categoryData",
      },
      {
        $project: {
          _id: 1,

          title: "$categoryData.title",
          slug: "$categoryData.slug",

          blogs: { $slice: ["$blogs", 3] },
        },
      },
    ]);

    const data = {
      navmain: blogs.map((item: any) => {
        return {
          title: item.title,
          url: `/${item.slug}`,
          icon: "none",
          isActive: true,
          items: item.blogs.map((blog: any) => {
            return { title: blog.title, url: `/${item.slug}/${blog.slug}` };
          }),
        };
      }),
    };
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // console.log(error.message);
    console.error("Error fetching tech blogs:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

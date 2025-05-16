import TechBlog from "@/model/techblog";
import dbConnect from "@/lib/mongodb";
import moment from "moment";

export async function GET() {
  try {
    await dbConnect();

    const limit = 5;
    const condition: any = {};

    const blogs = await TechBlog.find(condition)
      .sort({ createdAt: -1 })
      .populate({ path: "category", select: "title slug createdAt" })
      .limit(limit)
      .lean();

    // Format the createdAt field
    const formattedBlogs = blogs.map((blog) => ({
      ...blog,
      formattedDate: moment(blog.createdAt).format("Do MMMM YYYY"),
    }));

    const totalBlogs = await TechBlog.countDocuments();

    const response = {
      blogs: formattedBlogs,
      totalBlogs,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        message: "Failed to fetch blogs",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

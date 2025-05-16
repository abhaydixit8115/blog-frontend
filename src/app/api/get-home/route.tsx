import TechBlog from "@/model/techblog";
import dbConnect from "@/lib/mongodb";
import Category from "@/model/category";

export async function GET() {
  try {
    await dbConnect();

    const explore = await TechBlog.find()
      .sort({ createdAt: -1 })
      .populate({ path: "category", select: "title slug createdAt" })
      .limit(8)
      .lean();
    const category = await Category.find().select("title slug image").lean();
    const blogs = await TechBlog.find()
      .populate({ path: "category", select: "title slug image createdAt" })
      .limit(5)
      .lean();
    const popular = await TechBlog.find({})
      .limit(3)
      .populate({ path: "category", select: "title slug image createdAt" })
      .lean();
    console.log({ explore, popular, category, blogs });
    return new Response(JSON.stringify({ explore, popular, category, blogs }), {
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

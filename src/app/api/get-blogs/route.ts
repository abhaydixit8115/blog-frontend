import TechBlog from "@/model/techblog";
import Category from "@/model/category";
import dbConnect from "@/lib/mongodb";

export async function GET(request: Request) {
  try {
    // Connect to the database
    await dbConnect();

    // Get query parameters from the request URL
    const url = new URL(request.url);
    const category = url.searchParams.get("category") || "";
    const page = parseInt(url.searchParams.get("page") || "1", 10); // Default to page 1
    const limit = parseInt(url.searchParams.get("limit") || "10", 10); // Default to 10 items per page
    let condition: any = {};
    let categoryObj: any = null;
    if (category) {
      categoryObj = await Category.findOne({ slug: category }).select(
        "_id image"
      );
      condition = { category: categoryObj._id };
    }
    // Calculate the number of blogs to skip (based on the page number)
    const skip = (page - 1) * limit;
    console.log(categoryObj);
    // Fetch the blogs from the database, using pagination

    const blogs = await TechBlog.find(condition)
      .skip(skip)
      .limit(limit)
      .select("slug title thumbnail description tags createdAt")
      .populate({ path: "category", select: "title slug image" })
      .lean();

    // Get the total number of blogs (for calculating total pages)
    const totalBlogs = await TechBlog.countDocuments();

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalBlogs / limit);

    // Create the response object with pagination info
    const response = {
      blogs,
      page,
      totalPages,
      totalBlogs,
      limit,
      category: categoryObj,
    };

    // Return the response as JSON
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    // If an error occurs, return an error response
    return new Response(
      JSON.stringify({
        message: "Failed to fetch blogs",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

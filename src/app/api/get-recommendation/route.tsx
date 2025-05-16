import TechBlog from "@/model/techblog";
import dbConnect from "@/lib/mongodb";

export async function GET(request: Request) {
  try {
    // Connect to the database
    await dbConnect();

    // Get search query from request URL
    const url = new URL(request.url);
    const query = url.searchParams.get("query") || "";
    console.log(query);
    if (!query) {
      return new Response(
        JSON.stringify({ message: "Query parameter is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    console.log(query);

    // Find matching blogs (case-insensitive search on slug)
    const blogs = await TechBlog.find({
      slug: { $regex: query, $options: "i" },
    })
      .limit(5)
      .select("slug title description tags createdAt")
      .lean();

    return new Response(JSON.stringify({ blogs }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        message: "Failed to search blogs",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

import TechBlog from "@/model/techblog";
import dbConnect from "@/lib/mongodb";

function getRange(id: number, count: number) {
  const rangeSize = 17;
  let leastRange = 1;
  let maxRange = count;
  const isLeftValid = id > 8;
  const isRightValid = id <= count - 9;

  if (count <= rangeSize) {
    // Do nothing
  } else if (isLeftValid && isRightValid) {
    leastRange = id - 8;
    maxRange = id + 8;
  } else if (isLeftValid) {
    const rangeToAdd = 8 - (count - id);
    if (id - (rangeToAdd + 8) > 0) {
      leastRange = id - (rangeToAdd + 8);
    }
  } else {
    const rangeToAdd = 9 - id;
    if (id + (rangeToAdd + 8) <= count) {
      maxRange = id + (rangeToAdd + 8);
    }
  }

  return { leastRange, maxRange };
}

export async function GetBlogs(slug: string) {
  try {
    // Connect to the database
    await dbConnect();

    if (!slug) {
      return { success: false };
    }

    // Fetch the blog from the database by slug
    const blog: any = await TechBlog.findOne({ slug })
      .select(
        "slug title rank category description keywords thumbnail tags createdAt content mcontent"
      )
      .populate({ path: "category", select: "title slug image count" })
      .lean();

    if (!blog) {
      return { success: false };
    }

    if (blog.thumbnail.present === false) {
      blog.thumbnail.present = true;
      blog.thumbnail.url = blog.category.image;
    }

    const { leastRange, maxRange } = getRange(blog.rank, blog.category.count);

    // Fetch blogs in the same category within the count range
    const blogs = await TechBlog.find({
      category: blog.category._id,
      rank: { $gte: leastRange, $lte: maxRange },
    }).select("title slug category thumbnail");

    const data = {
      navmain: [
        {
          title: blog.category.title,
          url: `/${blog.category.slug}`,
          isActive: true,
          items: blogs.map((item: any) => ({
            title: item.title,
            url: `/${blog.category.slug}/${item.slug}`,
          })),
        },
      ],
    };

    // Return the response as JSON
    return { success: true, data, blog };
  } catch (error: any) {
    return { success: false };
  }
}

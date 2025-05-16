import dbConnect from "@/lib/mongodb";
import Category from "@/model/category";
import TechBlog from "@/model/techblog";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await dbConnect();
  const slugs = await TechBlog.find()
    .select("slug")
    .populate({ path: "category", select: "slug" })
    .lean();
  const categories = await Category.find().select("slug").lean();
  const ids: any = slugs.map((slug) => {
    return {
      url: `${process.env.BASE_URL_OG}/${slug.category.slug}/${slug.slug}`,
      priority: 1,
    };
  });
  const categoryIds = categories.map((category) => {
    return { url: `${process.env.BASE_URL_OG}/${category.slug}`, priority: 1 };
  });
  return [
    { url: process.env.BASE_URL_OG, priority: 1 },
    ...categoryIds,
    ...ids,
  ];
}

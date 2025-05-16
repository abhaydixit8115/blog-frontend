import BlogCard from "@/components/base-card";
import LandingCard from "@/components/landing-card";
import { Navbar } from "@/components/navbar";
import PopularCategories from "@/components/categories";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import Footer from "@/components/footer";

const colors = [
  "bg-blue-500", // Blue
  "bg-green-500", // Green
  "bg-red-500", // Red
  "bg-purple-500", // Purple
  "bg-yellow-500", // Yellow
];

export default async function Home() {
  const { popular, explore, blogs, category }: any = await fetchBlogsData();

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Navbar isHome={true} />
      <div className="md:max-w-5xl max-w-full px-4 md:px-0">
        <LandingCard item={popular} />
        <PopularCategories categories={category} />
        <div className="flex gap-6 mt-6 md:flex-row flex-col">
          <div className="flex flex-[3] max-w-full items-center justify-center flex-col gap-5">
            {blogs.map((item: any, index: number) => (
              <BlogCard
                key={index}
                slug={item.slug}
                title={item.title}
                thumbnail={item.thumbnail.url}
                category={item.category.title}
                categorySlug={item.category.slug}
                description={item.description}
                date={"today"}
                // author="CodeExpres"
              />
            ))}
          </div>
          {/* <div className="flex flex-[2] flex-col items-center justify-center"> */}
          <div className="flex-[1] md:max-w-xl max-w-full mx-auto space-y-4 bg:[red]">
            {explore.map((item: any, index: number) => (
              <Card key={index} className="max-w-full pt-4 bg-muted">
                <CardContent className="space-y-4">
                  <Badge
                    className={`px-2 py-1 text-white ${
                      colors[index % colors.length]
                    }`}
                  >
                    {item.category.title}
                  </Badge>
                  <h3 className="text-lg font-semibold leading-snug">
                    <Link href={`/${item.category.slug}/${item.slug}`}>
                      {item.title}
                    </Link>
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

async function fetchBlogsData() {
  const response = await fetch(`${process.env.BASE_URL}/api/get-home`, {
    cache: "no-store",
  });
  if (!response.ok) {
    notFound();
    return;
  }

  const data = await response.json();

  const { popular, explore, blogs, category } = data;
  return { popular, explore, blogs, category };
}
// export default BlogPage;

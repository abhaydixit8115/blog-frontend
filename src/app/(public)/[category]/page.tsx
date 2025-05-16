import { Navbar } from "@/components/navbar";
import React from "react";
import BlogCard from "@/components/base-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

function formatString(str: string) {
  return str.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
export async function generateMetadata({
  params,
  searchParams,
}: any): Promise<Metadata> {
  const paramsObj = await params;
  const searchParamsObj = await searchParams;
  const { category } = paramsObj;
  const page = Number(searchParamsObj.page) || 1;
  const bloglist = await fetchBlogsData(page, 10, category);
  const formattedTitle = formatString(category);
  const titleArr: string[] = bloglist.blogs.map((item: any) => item.title);
  const titleStr: string = titleArr.join(", ") + ".";
  return {
    title: `${formattedTitle} page ${page}`,
    description: `Explore the latest blogs on ${titleStr}`,
    keywords: titleStr,
    openGraph: {
      images: [
        {
          url: bloglist.category.image + "?format=webp&quality=75",
        },
      ],
    },
  };
}
async function fetchBlogsData(page: number, limit: number, category: string) {
  const response = await fetch(
    `${process.env.BASE_URL}/api/get-blogs?page=${page}&limit=${limit}&category=${category}`,
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    notFound();
  }
  const data = await response.json();
  return data;
}

export default async function BlogPage({ params, searchParams }: any) {
  const paramsObj = await params;
  const searchParamsObj = await searchParams;

  const page = Number(searchParamsObj.page) || 1;
  const limit = Number(searchParamsObj.limit) || 10;
  const { category } = paramsObj;

  const bloglist = await fetchBlogsData(page, limit, category);

  const response = await fetch(
    `${process.env.BASE_URL}/api/get-category-sidebar`,
    {
      cache: "no-store",
    }
  );
  // console.log(response);
  if (!response.ok) notFound();

  const data: any = await response.json();

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center">
        <Navbar />

        <div className="w-full max-w-8xl lg:flex-row  flex-col flex items-center justify-center content-center">
          <div className="w-full flex flex-col items-center content-center gap-5 p-6">
            {bloglist.blogs.map((item: any, index: number) => (
              <BlogCard
                category={item.category.title}
                categorySlug={item.category.slug}
                title={item.title}
                description={item.description}
                date={"23 days ago"}
                slug={item.slug}
                key={index}
                thumbnail={item.thumbnail.url}
              />
            ))}
            <div className="w-full flex justify-between py-4">
              {page === 1 ? (
                <Button
                  disabled={page === 1}
                  variant="outline"
                  size="lg"
                  className="text-lg p-6"
                >
                  <ChevronLeft className="mr-2" />
                  Previous
                </Button>
              ) : (
                <Link href={`/${paramsObj.category}?page=${page - 1}`}>
                  <Button
                    disabled={page === 1}
                    variant="outline"
                    size="lg"
                    className="text-lg p-6"
                  >
                    <ChevronLeft className="mr-2" />
                    Previous
                  </Button>
                </Link>
              )}
              {page === bloglist.totalPages ? (
                <Button
                  disabled={page === bloglist.totalPages}
                  variant="outline"
                  size="lg"
                  className="text-lg p-6"
                >
                  Next
                  <ChevronRight className="ml-2" />
                </Button>
              ) : (
                <Link href={`/${paramsObj.category}?page=${page + 1}`}>
                  <Button variant="outline" size="lg" className="text-lg p-6">
                    Next
                    <ChevronRight className="ml-2" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
          <div className="flex-[1.3] p-6">{/* <Pick></Pick> */}</div>
        </div>
      </div>
    </>
  );
}

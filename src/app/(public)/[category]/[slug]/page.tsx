import { Navbar } from "@/components/navbar";
import Image from "next/image";
import { notFound } from "next/navigation";
import TechBlog from "@/model/techblog";
import dbConnect from "@/lib/mongodb";
import React from "react";

const MarkdownIt = require("markdown-it");
import { GetBlogs } from "@/lib/get-blogs";
import Onthispage from "@/components/on-this-page";
import MostPopular from "@/components/pick";
import { Metadata } from "next";
const md = new MarkdownIt();
export async function generateStaticParams() {
  await dbConnect();
  const slugs = await TechBlog.find().select("slug").lean();
  const ids = slugs.map((slug) => slug.slug);

  return ids.map(async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    return { category: "dsa-questions", slug: id };
  });
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = await params;

  const data1 = await GetBlogs(slug);
  if (!data1.success) {
    return notFound();
  }
  const { blog, data }: any = data1;

  const keywordsArr = [...blog.keywords, ...blog.tags];
  const titleStr = keywordsArr.join(", ") + ".";
  return {
    title: blog.title,
    description: blog.description,
    keywords: titleStr,
    openGraph: {
      images: [
        {
          url: blog.thumbnail.url + "?format=webp&quality=75",
        },
      ],
    },
  };
}
export default async function BlogPage({ params }: any) {
  const { slug } = await params;

  const data1 = await GetBlogs(slug);
  if (!data1.success) {
    return notFound();
  }
  console.log(data1);
  const { blog, data }: any = data1;
  const post = blog;
  const markdown = post.content?.content;
  const markdownString =
    typeof markdown === "string" ? markdown : JSON.stringify(markdown);
  const htmlContent = md.render(markdownString);
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center">
        <Navbar />
        <div className="flex items-start justify-center md:max-w-6xl pt-2 max-w-full bg-background">
          <main className="flex-[4] md:max-w-4xl max-w-full mx-auto px-4 pb-8">
            <section className="prose dark:prose-invert">
              <div className="w-full h-60 relative rounded-lg overflow-hidden">
                <Image
                  src={post.thumbnail.url}
                  alt={"blog image"}
                  layout="fill"
                  className="w-full"
                  objectFit="cover"
                />
              </div>
              <div
                className="markdown-container text-xl lg:text-2xl leading-loose max-w-full tracking-wide
  [&_h1]:text-4xl lg:[&_h1]:text-5xl [&_h1]:my-8 [&_h1]:mb-6
  [&_h2]:text-3xl lg:[&_h2]:text-4xl [&_h2]:my-7 [&_h2]:mb-5
  [&_h3]:text-2xl lg:[&_h3]:text-3xl [&_h3]:my-6 [&_h3]:mb-4
  [&_h4]:text-xl lg:[&_h4]:text-2xl [&_h4]:my-5 [&_h4]:mb-3
  [&_h5]:text-lg lg:[&_h5]:text-xl [&_h5]:my-4 [&_h5]:mb-3
  [&_h6]:text-lg lg:[&_h6]:text-xl [&_h6]:my-4 [&_h6]:mb-3
  [&_p]:text-xl lg:[&_p]:text-2xl [&_p]:my-4 [&_p]:leading-loose [&_pre]:bg-muted [&_pre]:rounded-md [&_pre]:p-2
  [&_pre]:text-lg lg:[&_pre]:text-xl [&_pre]:break-words [&_pre]:overflow-x-auto [&_pre]:scrollbar-thin [&_pre]:overflow-y-hidden [&_pre]:scrollbar-thumb-gray-500 [&_pre]:scrollbar-track-transparent [&_pre]:scrollbar-thumb-rounded-full [&_pre]:my-4
  [&_blockquote]:text-xl lg:[&_blockquote]:text-2xl [&_blockquote]:border-l-4 [&_blockquote]:border-muted [&_blockquote]:pl-4 [&_blockquote]:my-4
  [&_ul]:text-xl lg:[&_ul]:text-2xl [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:my-4
  [&_li]:text-xl lg:[&_li]:text-2xl [&_li]:leading-loose [&_li]:my-2
  [&_a]:text-xl lg:[&_a]:text-2xl [&_a]:text-primary [&_a]:underline
  [&_img]:max-w-full [&_img]:h-auto [&_img]:my-5
  [&_code]:text-lg lg:[&_code]:text-xl [&_code]:rounded-sm
  [&_.katex]:bg-muted [&_.katex]:px-3 [&_.katex]:py-2 [&_.katex]:rounded-md
  [&_.katex-display]:bg-muted [&_.katex-display]:p-4 [&_.katex-display]:rounded-lg [&_li>code]:bg-muted [&_p>code]:bg-muted [&_code]:p-1
  [&_hr]:border-none [&_hr]:border-t [&_hr]:border-muted [&_hr]:my-6 [&_img]:w-[75%] [&_img]:mx-auto [&_img]:rounded-sm"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </section>
          </main>
          <div className="hidden lg:block flex-[1] px-5">
            <Onthispage
              className="markdown-container"
              htmlContent={htmlContent}
            />
            <h1 className="text-xl my-5">Also Explore</h1>
            <MostPopular
              data={data.navmain[0].items}
              category={data.navmain[0].title}
            />
          </div>
        </div>
      </div>
    </>
  );
}

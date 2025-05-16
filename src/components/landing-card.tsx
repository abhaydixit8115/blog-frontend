import BlogCard from "./base-card-small";
import BaseCardImage from "@/components/base-card-image";
export default function LandingCard({ item }: any) {
  return (
    <section className="flex w-full flex-col items-center justify-center py-16 md:px-12">
      <div className="w-full">
        <div className="w-full text-center">
          <h1 className="text-4xl md:text-3xl font-bold text-foreground">
            {process.env.HEADING}
          </h1>
          <p className="my-8 text-lg md:text-xl text-muted-foreground">
            {process.env.SUBHEADING}
          </p>
        </div>
        <div className="flex w-full md:flex-row flex-col gap-5 justify-center">
          <div className="flex w-full items-center justify-center">
            <BaseCardImage
              slug={item[0].slug}
              title={item[0].title}
              categorySlug={item[0].category.slug}
              thumbnail={item[0].thumbnail.url}
              category={item[0].category.title}
              description={item[0].description}
              date={"today"}
            />
          </div>
          <div className="w-full flex gap-3 flex-col justify-between">
            <BlogCard
              slug={item[1].slug}
              title={item[1].title}
              categorySlug={item[1].category.slug}
              thumbnail={item[1].thumbnail.url}
              category={item[1].category.title}
              description={item[1].description}
              date={"today"}
            />
            <BlogCard
              slug={item[2].slug}
              title={item[2].title}
              categorySlug={item[2].category.slug}
              thumbnail={item[2].thumbnail.url}
              category={item[2].category.title}
              description={item[2].description}
              date={"today"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

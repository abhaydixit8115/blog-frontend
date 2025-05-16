import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const categoriess = [
  { name: "Fashion", image: "/desktop.webp", bg: "bg-red-100" },
  { name: "Food", image: "/desktop.webp", bg: "bg-green-100" },
  { name: "Coding", image: "/desktop.webp", bg: "bg-purple-100" },
  { name: "Style", image: "/desktop.webp", bg: "bg-blue-100" },
  { name: "Travel", image: "/desktop.webp", bg: "bg-pink-100" },
  { name: "Culture", image: "/desktop.webp", bg: "bg-orange-100" },
];

interface PopularCategoryParams {
  image: string;
  title: string;
  slug: string;
}
export default function PopularCategories({
  categories,
}: {
  categories: PopularCategoryParams[];
}) {
  return (
    <section>
      <div>
        {/* <h2 className="text-lg font-semibold mb-4">Popular Categories</h2> */}
        <div className="flex gap-4 overflow-x-auto py-1 justify-start items-stretch">
          {categories.map((category, index) => (
            <Card
              key={index}
              className={`rounded-lg p-3 text-[black] gap-2 min-w-max ${
                categoriess[index % 5].bg
              }`}
            >
              <Link
                className="flex items-center justify-center gap-2"
                href={`/${category.slug}`}
              >
                <div className="w-8 h-8 relative overflow-hidden rounded-full">
                  <Image
                    src={category.image}
                    alt={category.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="whitespace-nowrap">
                  <span className="text-lg font-medium">{category.title}</span>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

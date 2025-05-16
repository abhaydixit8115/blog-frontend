import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
function truncateString(str: string, maxLength: number) {
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
}
export default function BlogCard({
  thumbnail,

  category,
  title,
  categorySlug,
  description,
  slug,
}: {
  thumbnail: string;
  date: string;
  category: string;
  title: string;
  description: string;
  categorySlug: string;
  slug: string;
}) {
  return (
    // flex flex-col md:flex-row gap-6 p-6
    <Card className="flex md:flex-row w-full gap-6 p-2 md:max-w-6xl max-w-full shadow-md rounded-lg bg-muted flex-col">
      <div className="relative md:w-1/2 w-full h-60">
        <Image
          src={thumbnail}
          alt="Zustand and React State Management"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <CardContent className="p-4 flex flex-col justify-between md:w-1/2 w-full gap-1.5">
        <div className="flex items:center justify-between">
          <p className="text-base text-muted-500">{category}</p>
          {/* <p className="text-base text-muted-500">{date}</p> */}
        </div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-xl text-muted-600">
          {truncateString(description, 40)}
        </p>
        <Link href={`/${categorySlug}/${slug}`}>
          <Button>Read More</Button>
        </Link>
      </CardContent>
    </Card>
  );
}

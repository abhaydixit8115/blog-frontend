import Image from "next/image";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "./ui/button";

export default function BaseCardImage({
  thumbnail,
  date,
  category,
  title,
  description,
  categorySlug,
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
    <Card className="flex flex-col w-full h-full rounded-lg bg-muted overflow-hidden">
      <div className="relative h-full w-full aspect-square">
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="text-white">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm">{category}</p>
              <p className="text-sm">{date}</p>
            </div>
            <h2 className="text-xl font-semibold mb-3 line-clamp-2">{title}</h2>
            <Link href={`/${categorySlug}/${slug}`}>
              <Button size="sm">Read More</Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}

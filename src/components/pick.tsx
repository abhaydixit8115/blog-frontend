import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const colors = [
  "bg-blue-500", // Blue
  "bg-green-500", // Green
  "bg-red-500", // Red
  "bg-purple-500", // Purple
  "bg-yellow-500", // Yellow
];

export default function MostPopular({
  data,
  category,
}: {
  data: any;
  category: any;
}) {
  console.log(data, category);
  return (
    <div className="max-w-xl mx-auto space-y-4">
      {data.map((item: any, index: number) => (
        <Card key={index} className="pt-4 bg-muted">
          <CardContent className="space-y-4">
            <Badge
              className={`px-2 py-1 text-white ${
                colors[index % colors.length]
              }`}
            >
              {category}
            </Badge>
            <h3 className="text-lg font-semibold leading-snug">
              <Link href={`${item.url}`}>{item.title}</Link>
            </h3>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

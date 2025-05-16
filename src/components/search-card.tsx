import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Logo } from "./logo";
import { Avatar } from "@/components/ui/avatar";

export default function LargeCard({ title, description, date, author }: any) {
  return (
    <Card className="p-4 cursor-pointer w-full max-w-lg shadow-md hover:shadow-lg transition-shadow rounded-2xl">
      <CardHeader>
        <h2 className="text-3xl font-semibold">{title}</h2>
      </CardHeader>
      <CardContent>
        <p className="text-base text-600 mt-1">{description}</p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Avatar className="w-12 h-12 flex items-center justify-center">
              <Logo />
            </Avatar>
            <span className="text-base font-medium text-800">{author}</span>
          </div>
          <span>{date}</span>
        </div>
      </CardContent>
    </Card>
  );
}

"use server";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function NotFound() {
  return (
    <div className="flex flex-col w-full items-center justify-center h-screen text-center p-4">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
        Oops! The page you are looking for does not exist.
      </p>
      <Button className="mt-6" asChild>
        <Link href="/">
          <ArrowLeft className="mr-2 h-5 w-5" /> Go Back Home
        </Link>
      </Button>
    </div>
  );
}

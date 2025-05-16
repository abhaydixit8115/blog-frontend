// prettier-ignore
"use client";
import { ModeToggle } from "./toggle-theme";
import * as React from "react";
import { Search, Menu } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "./ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";
import Image from "next/image";
import {
  CommandInput,
  CommandList,
  CommandItem,
  CommandDialog,
} from "@/components/ui/command";
export const Navbar = ({ isHome = false }) => {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [results, setResults]: [any, any] = React.useState([]);
  let debounceTimeout: NodeJS.Timeout | null = null;
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.ctrlKey) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  const handleSearch = async (searchString: any) => {
    setSearchQuery(searchString);

    if (debounceTimeout) clearTimeout(debounceTimeout); // Clear previous timeout

    if (searchString.length > 1) {
      debounceTimeout = setTimeout(async () => {
        const query = searchString.toLowerCase().replace(/\s+/g, "-");
        try {
          const res = await fetch(`/api/get-recommendation?query=${query}`);
          const data = await res.json();
          setResults(data.blogs);
        } catch (error) {
          console.error("Error fetching search results", error);
        }
      }, 300); // Delay API call by 300ms
    } else {
      setResults([]);
    }
  };

  return (
    <div className="w-full flex items-center justify-center border-b border-b-accent px-3">
      <div className="flex w-full items-center justify-center py-2">
        <div className="flex flex-[1] items-center">
          <div>
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              size="icon"
              className="rounded-full p-4"
            >
              <Search size={"full"} className="size-full" />
            </Button>
          </div>
        </div>
        <div className="flex flex-[1] items-center justify-center">
          <Link href="/">
            <Image
              alt="HealthExpres Logo"
              width={40}
              height={40}
              src="/favicon.svg"
            ></Image>
          </Link>
        </div>
        <div className="flex flex-[1] items-center justify-end">
          <ModeToggle />
        </div>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput
            className="text-lg"
            placeholder="Search Blogs..."
            value={searchQuery}
            onValueChange={handleSearch}
          />
          <VisuallyHidden>
            <DialogTitle>Search</DialogTitle>{" "}
            {/* Still included for accessibility */}
          </VisuallyHidden>
          <CommandList>
            {results.map((blog: any) => (
              <CommandItem
                key={blog.slug}
                className="cursor-pointer text-lg"
                onSelect={() => (window.location.href = `/blog/${blog.slug}`)}
              >
                {blog.title}
              </CommandItem>
            ))}
          </CommandList>
        </CommandDialog>
      </div>
    </div>
  );
};

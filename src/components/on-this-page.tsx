"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface LinkType {
  id: string;
  text: string;
  level: number;
  children?: LinkType[];
}

const OnThisPage = ({
  htmlContent,
  className,
}: {
  htmlContent: string;
  className: string;
}) => {
  const [links, setLinks] = useState<LinkType[]>([]);

  useEffect(() => {
    const temp = document.createElement("div");
    temp.innerHTML = htmlContent;

    const headings = Array.from(
      temp.querySelectorAll("h1, h2, h3, h4")
    ) as HTMLElement[];

    const parsedLinks: LinkType[] = [];
    const stack: LinkType[] = [];

    headings.forEach((heading, index) => {
      const id = heading.id || `heading-${index}`;
      heading.id = id;
      const level = parseInt(heading.tagName.substring(1));
      const newItem: LinkType = {
        id,
        text: heading.innerText,
        level,
        children: [],
      };

      while (stack.length > 0 && stack[stack.length - 1].level >= level) {
        stack.pop();
      }

      if (stack.length === 0) {
        parsedLinks.push(newItem);
      } else {
        stack[stack.length - 1].children?.push(newItem);
      }

      stack.push(newItem);
    });

    setLinks(parsedLinks);
  }, [htmlContent]);

  const renderLinks = (items: LinkType[]) => {
    return (
      <ul className="ml-4 border-l pl-2">
        {items.map((link) => (
          <li key={link.id} className="pt-2 text-xl">
            <a href={`#${link.id}`} className="block">
              {link.text.slice(0, 50)}
              {link.text.length > 50 ? "..." : ""}
            </a>
            {link.children &&
              link.children.length > 0 &&
              renderLinks(link.children)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div
      className={cn(
        "hidden md:block bg-muted p-5 box-border rounded-md",
        className
      )}
    >
      <div className="sticky top-20">
        <h2 className="text-xl font-semibold">On This Page</h2>
        {renderLinks(links)}
      </div>
    </div>
  );
};

export default OnThisPage;

"use client";
import { Category } from "@/payload-types";
import React, { useRef } from "react";
import { CategoryDropdown } from "./category-dropdown";

interface Props {
  data: any;
}
export const Categories = ({ data }: Props) => {
  const measureRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full">
      <div
        ref={measureRef}
        // className="absolute opacity-0 pointer-events-none flex"
        // style={{ position: "fixed", top: -9999, left: -9999 }}
        className="flex flex-nowrap items-center"
      >
        {data.map((category: Category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={false}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

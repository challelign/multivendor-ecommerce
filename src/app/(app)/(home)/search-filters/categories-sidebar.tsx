import { useState } from "react";
import { CustomCategory } from "../types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: CustomCategory[];
}
export const CategoriesSidebar = ({ open, onOpenChange, data }: Props) => {
  const router = useRouter();
  const [parentCategories, setParentCategories] = useState<
    CustomCategory[] | null
  >(null);
  const [selectedCategory, setSelectedCategory] =
    useState<CustomCategory | null>(null);

  // If we have parent categories show those , otherwise show root categories
  const currentCategories = (parentCategories ?? data) || null;
  const handleOpenChange = (open: boolean) => {
    setParentCategories(null);
    setSelectedCategory(null);
    onOpenChange(open);
  };
  const handleCategoryClick = (category: CustomCategory) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as CustomCategory[]);
      setSelectedCategory(category);
    } else {
      // This is a leaf category (no subcategories)
      if (parentCategories && selectedCategory) {
        // this is a subcategory - navigate to  /category/subcategory
        router.push(`/category/${selectedCategory.slug}/${category.slug}`);
      } else {
        // this is a main category - naviagete to /category
        if (category.slug === "all") {
          router.push("/");
        } else {
          router.push(`/category/${category.slug}`);
        }
      }
      handleOpenChange(false);
    }
  };

  const backgroundColor = selectedCategory?.color || "white";

  const handleBackClick = () => {
    if (parentCategories) {
      setParentCategories(null);
      setSelectedCategory(null);
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{ backgroundColor }}
      >
        <SheetHeader className="p-4 border-b ">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-auto h-full pb-2">
          {parentCategories && (
            <button
              onClick={handleBackClick}
              className="cursor-pointer w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
            >
              <ChevronLeftIcon className="size-4 mr-2" />
              Back
            </button>
          )}
          {currentCategories?.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleCategoryClick(category)}
              className="cursor-pointer w-full text-left p-4 hover:bg-black hover:text-white flex items-center justify-between text-base font-medium"
            >
              {category.name}{" "}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRightIcon className="size-4" />
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

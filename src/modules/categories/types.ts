import type { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export type CategoriesGetManyOutput =
  inferRouterOutputs<AppRouter>["categories"]["getMany"];

export type CategoriesGetManyOutputSingle = CategoriesGetManyOutput[0];

// Type for subcategories array
export type CategoriesSubcategories = NonNullable<
  CategoriesGetManyOutputSingle["subcategories"]
>;

// Union type for both root categories and subcategories
export type CategoryItem =
  | CategoriesGetManyOutputSingle
  | CategoriesSubcategories[0];

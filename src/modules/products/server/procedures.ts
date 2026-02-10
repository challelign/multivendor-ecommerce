import { createTRPCRouter, baseProcedure } from "@/trpc/init";
import { z } from "zod";
import type { Sort, Where } from "payload";
import { Category } from "@/payload-types";
import { sortValues } from "../search-params"; // to import sort values from search-params.ts nuqs/server

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        tags: z.array(z.string()).nullable().optional(), // Optional array of strings
        sort: z.enum(sortValues).default("curated"),
      }),
    )

    .query(async ({ ctx, input }) => {
      const where: Where = {};

      // if (input.minPrice) {
      //   where["price"] = {
      //     greater_than_equal: input.minPrice,
      //   };
      // }

      // if (input.maxPrice) {
      //   where["price"] = {
      //     less_than_equal: input.maxPrice,
      //   };
      // }

      /*
      const priceFilter: Record<string, unknown> = {};
      if (input.minPrice) {
        priceFilter.greater_than_equal = input.minPrice;
      }
      if (input.maxPrice) {
        priceFilter.less_than_equal = input.maxPrice;
      }
      if (Object.keys(priceFilter).length > 0) {
        where["price"] = priceFilter;
      }
      */

      // for sort filter
      let sort: Sort = "-createdAt";

      if (input.sort === "curated") {
        sort = "-createdAt";
      } else if (input.sort === "hot_and_new") {
        sort = "name";
      } else if (input.sort === "trending") {
        sort = "+createdAt";
      }
      // for price filter
      if (input.minPrice && input.maxPrice) {
        where.price = {
          greater_than_equal: input.minPrice,
          less_than_equal: input.maxPrice,
        };
      } else if (input.minPrice) {
        where.price = {
          greater_than_equal: input.minPrice,
        };
      } else if (input.maxPrice) {
        where.price = {
          ...where.price,
          less_than_equal: input.maxPrice,
        };
      }

      // for category filter
      if (input.category) {
        const categoriesData = await ctx.db.find({
          collection: "categories",
          limit: 1,
          depth: 1, // Populate "subcategories", subcategores.[0] will be a type of "Category"
          pagination: false,
          where: {
            slug: {
              equals: input.category,
            },
          },
        });

        console.log(
          "[categoriesData]",
          JSON.stringify(categoriesData, null, 2),
        );
        const formatedData = categoriesData.docs.map((doc) => ({
          ...doc,
          subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
            // Because of "depth:1" we are getting the subcategories as an object
            // So we need to spread it to get the actual subcategories
            // Because of "depth:1" we are confident "doc" will be a type of "Category"
            ...(doc as Category),
            subcategories: undefined,
          })),
        }));

        console.log("[formatedData]", JSON.stringify(formatedData, null, 2));
        const subcategoriesSlugs = [];
        const parentCategory = formatedData[0];
        if (parentCategory) {
          subcategoriesSlugs.push(
            ...parentCategory.subcategories.map(
              (subcategory) => subcategory.slug,
            ),
          );
          where["category.slug"] = {
            in: [parentCategory.slug, ...subcategoriesSlugs],
          };
        }
      }

      // for tags filter
      if (input.tags?.length) {
        where["tags.name"] = {
          in: input.tags,
        };
      }
      const data = await ctx.db.find({
        collection: "products",
        depth: 1, // Populate "category"& "image"
        where,
      });

      return data;
    }),
});

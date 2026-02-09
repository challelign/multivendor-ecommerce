import { createTRPCRouter, baseProcedure } from "@/trpc/init";

import { Category } from "@/payload-types";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    //   getMany: baseProcedure.query(async () => {
    // const payload = await getPayload({
    //   config: configPromise,
    // });
    const data = await ctx.db.find({
      // const data = await payload.find({
      collection: "categories",
      depth: 1, // Populate subcategories ,subcategories.[0] will be a type of "Category"
      pagination: false,
      where: {
        parent: {
          exists: false,
        },
      },
      sort: "name",
    });

    const formatedData = data.docs.map((doc) => ({
      ...doc,
      subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
        // Because of "depth:1" we are getting the subcategories as an object
        // So we need to spread it to get the actual subcategories
        // Because of "depth:1" we are confident "doc" will be a type of "Category"
        ...(doc as Category),
        // subcategories: undefined,
      })),
    }));

    // console.log("[formatedData]", formatedData);

    return formatedData;
  }),
});

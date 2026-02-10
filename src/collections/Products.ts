import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",

  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
      required: true,
    },
    {
      name: "price",
      type: "number",
      required: true,
      admin: {
        description: "Price in ETB",
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories", // refers to  slug: "categories",
      hasMany: false, // 1 Product only have 1 Category 1-to-1 relation
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "refundPolicy",
      type: "select",
      options: ["30-day", "14-day", "7-day", "3-day", "1-day", "no-refunds"],
      defaultValue: "30-day",
    },
  ],
};

import type { CollectionConfig } from "payload";

export const Tags: CollectionConfig = {
  slug: "tags",

  admin: {
    useAsTitle: "name",
  },

  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
    },
    /**
     * Bidirectional relationship risks data inconsistency.
Both Tags.products and Products.tags (in src/collections/Products.ts) independently store the many-to-many relationship. Payload does not automatically synchronize these — updating one side won't reflect on the other. This will lead to stale/conflicting data.
     */
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
    },
  ],
};

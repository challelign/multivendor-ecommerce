import { CollectionConfig } from "payload";

export const Tenants: CollectionConfig = {
  slug: "tenants",

  admin: {
    useAsTitle: "slug",
  },
  fields: [
    {
      name: "name",
      required: true,
      type: "text",
      label: "Store Name",
      admin: {
        description: "This is the name of the store (e.g. Hien's Store)",
      },
    },
    {
      name: "slug",
      type: "text",
      index: true,
      required: true,
      unique: true,

      admin: {
        description:
          "This is the subdomain for the store (e.g. [slug].funroad.com)",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "stripeAccountId",
      type: "text",
      required: true,

      admin: {
        description: "Stripe Account ID associated with your product store",
      },
    },
    {
      name: "stripeDetailsSubmitted",
      type: "checkbox",

      admin: {
        readOnly: true,
        description:
          "You cannot create product until you submit your Stripe details",
      },
    },
  ],
};

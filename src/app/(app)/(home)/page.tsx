import configPromise from "@payload-config";
import { getPayload } from "payload";

/**
 * Renders the homepage and fetches categories from Payload CMS.
 *
 * Also logs the retrieved categories to the server console.
 *
 * @returns The homepage JSX with the fetched `categories` rendered as JSON.
 */
export default async function Home() {
  const payload = await getPayload({
    config: configPromise,
  });

  const categories = await payload.find({
    collection: "categories",
    depth: 2,
  });

  console.log(categories);

  return (
    <div className="p-4">
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-5xl font-semibold">Funroad</h1>
          <p className="text-lg">
            Funroad is a multi-vendor ecommerce platform
            {/* {JSON.stringify(categories, null, 2)} */}
          </p>
          <p className="text-lg">{JSON.stringify(categories, null, 2)}</p>
        </div>
      </div>
    </div>
  );
}
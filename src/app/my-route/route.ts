import configPromise from "@payload-config";
import { getPayload } from "payload";

export default async function GET(request: Request) {
  const payload = await getPayload({
    config: configPromise,
  });

  const categories = await payload.find({
    collection: "categories",
    depth: 2,
  });

  console.log(categories);
  return Response.json({
    categories,
  });
}

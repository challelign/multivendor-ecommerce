// "use client";

// import { useTRPC } from "@/trpc/client";
// import { useQuery } from "@tanstack/react-query";

// export default function Home() {
//   const trpc = useTRPC();
//   const { data } = useQuery(trpc.auth.session.queryOptions());
//   return (
//     <div className="p-4">
//       <div className="flex flex-col gap-y-4">
//         <div className="flex flex-col gap-y-2">
//           <h1 className="text-5xl font-semibold">Funroad</h1>
//           <p className="text-lg">
//             Funroad is a multi-vendor ecommerce platform <br />
//             User-name: {JSON.stringify(data?.user, null, 2)}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { SearchParams } from "nuqs/server";
import { loadProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { DEFAULT_LIMIT } from "@/constants";

interface Props {
  searchParams: Promise<SearchParams>;
}
const CategoryPage = async ({ searchParams }: Props) => {
  const filters = await loadProductFilters(searchParams);
  // const products = await caller.products.getMany();

  console.log("filter", JSON.stringify(filters, null, 2));
  const queryClient = getQueryClient();
  // void queryClient.prefetchQuery(
  //   trpc.products.getMany.queryOptions({ ...filters, category }),
  // );

  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      limit: DEFAULT_LIMIT,
    }),
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView />
    </HydrationBoundary>
  );
};

export default CategoryPage;

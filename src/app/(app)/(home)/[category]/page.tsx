import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { SearchParams } from "nuqs/server";
import { loadProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { DEFAULT_LIMIT } from "@/constants";

interface Props {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<SearchParams>;
}
const CategoryPage = async ({ params, searchParams }: Props) => {
  const { category } = await params;
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
      category,
      limit: DEFAULT_LIMIT,
    }),
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView category={category} />
    </HydrationBoundary>
  );
};

export default CategoryPage;

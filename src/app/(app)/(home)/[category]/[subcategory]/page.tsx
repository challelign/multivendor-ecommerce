import {
  ProductList,
  ProductListSkeleton,
} from "@/modules/products/ui/components/product-list";
import { caller, getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  params: Promise<{
    subcategory: string;
  }>;
}
const CategoryPage = async ({ params }: Props) => {
  const { subcategory } = await params;
  // const products = await caller.products.getMany();

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({ category: subcategory }),
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList category={subcategory} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default CategoryPage;

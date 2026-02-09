import { parseAsString, useQueryStates } from "nuqs";

export const useProductFilters = () => {
  return useQueryStates(
    {
      minPrice: parseAsString.withOptions({ clearOnDefault: true }),
      maxPrice: parseAsString.withOptions({ clearOnDefault: true }),
      category: parseAsString.withOptions({ clearOnDefault: true }),
    },
    {
      shallow: true,
    },
  );
};

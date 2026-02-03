import { categoriesProcedures } from "@/modules/categories/server/procedures";
import { createTRPCRouter } from "../init";
export const appRouter = createTRPCRouter({
  categories: categoriesProcedures,
});
// export type definition of API
export type AppRouter = typeof appRouter;

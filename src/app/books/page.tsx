import { Books } from "@/components/module/Home/Books";

import getQueryClient from "@/app/service/getQueryClient";
import { getBooks } from "@/components/module/Home/hooks";
import { dehydrate } from "@tanstack/react-query";
import { Hydrate } from "../service/ReactQueryHydrate";

export default async function page() {
  const filters = {
    q: "react",
    orderBy: "Relevance",
    projection: "full",
  };
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    [`Books-${filters.q}-${filters.orderBy}-${filters.projection}`],
    () => getBooks(filters),
  );

  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      {" "}
      <Books />
    </Hydrate>
  );
}

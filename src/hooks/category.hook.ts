import { useQuery } from "@tanstack/react-query";

import { getAllCategories } from "../services/CategoryService";

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["CATEGORY"],
    queryFn: async () => await getAllCategories(),
  });
};

import api from "@/app/service/api";
import { errorHandler } from "@/lib/helpers";
import { useQuery } from "@tanstack/react-query";
import { Book, DataPayload, Filters } from "../types";

export const getBooks = async (filters: Filters) => {
  const response = await api.get<DataPayload<Array<Book>>>({
    url: ``,
    config: { params: filters },
  });
  return response.data;
};
export const useGetBooks = (filters: Filters) => {
  const onError = (err: unknown) => {
    errorHandler(err);
  };

  const { data, isLoading } = useQuery(
    [`Books-${filters.q}-${filters.orderBy}-${filters.projection}`],
    () => getBooks(filters),
    {
      onError,
    },
  );
  const books = data?.items ?? [];
  return { books, isLoading };
};
export const getBookDetails = async (id: string) => {
  const response = await api.get<Book>({
    url: `/${id}`,
    // config: { params: { page: 2 } },
  });
  return response.data;
};
export const useGetBookDetails = (id: string) => {
  const onError = (err: unknown) => {
    errorHandler(err);
  };

  const { data, isLoading } = useQuery(
    [`Book-${id}`],
    () => getBookDetails(id),
    {
      onError,
    },
  );
  const details = data;
  return { details, isLoading };
};

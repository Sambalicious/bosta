"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Modal } from "../common";
import { PageLoader } from "../common/PageLoader";
import { SearchInput } from "../common/SearchInput";
import { BookCard } from "./BookCard";
import { useGetBooks } from "./hooks";
import { Filters } from "./types";

export function Books() {
  const [searchQuery, setSearchQuery] = useState("react");
  const [showFilter, setShowFilter] = useState(false);

  const initialState = {
    q: searchQuery,
    orderBy: "Relevance",
    projection: "full",
    maxResults: 40,
  };
  const [filters, setFilters] = useState(initialState);
  const handleSearch = () => {
    if (!searchQuery) {
      toast.error("Please input a search term");
      return;
    }
    const params = {
      ...filters,
      q: searchQuery,
    };
    setFilters(params);
  };
  const form = useForm<Filters>();
  const { books, isLoading } = useGetBooks(filters);

  const onSubmit = (data: Filters) => {
    const params = {
      ...filters,
      ...(data.orderBy && { orderBy: data.orderBy }),
      ...(data.projection && { projection: data.projection }),
    };
    setFilters(params);
    setShowFilter(!showFilter);
  };

  const reset = () => {
    setFilters({ ...filters, ...initialState });
    setShowFilter(!showFilter);
  };

  return (
    <div className="max-w-5xl mx-auto ">
      {isLoading && <PageLoader text="Loading search results" />}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <SearchInput
            placeholder="Search books by name..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            type="search"
            className="max-w-sm my-5"
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
        <Modal
          modalTrigger={
            <Button
              variant="outline"
              className="bg-primary-light px-6 text-primary"
              icon={
                <Icons.Filter
                  size={16}
                  className="text-primary bg-primary-light hover:text-white-100"
                />
              }
            >
              Filter
            </Button>
          }
          isOpen={showFilter}
          isOpenChange={() => setShowFilter(!showFilter)}
        >
          <Modal.Content title="Filter by">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="orderBy"
                  render={({ field: { onChange, value } }) => (
                    <FormItem>
                      <FormLabel className="text-black-100 font-gotham font-normal text-sm">
                        Sort By
                      </FormLabel>
                      <Select
                        aria-label="select status"
                        onValueChange={onChange}
                        defaultValue={value}
                      >
                        <SelectTrigger className="w-full mt-3">
                          <SelectValue
                            className="font-mulish text-black-100 font-medium md:px-3 px-1 text-[10px] md:text-xs"
                            placeholder="Select sort order"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel className="text-black-100">
                              Sort By
                            </SelectLabel>
                            {["Relevance", "Newest"]?.map(el => (
                              <SelectItem key={el} value={el}>
                                {el}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />{" "}
                <FormField
                  control={form.control}
                  name="projection"
                  render={({ field: { onChange, value } }) => (
                    <FormItem className="mt-5">
                      <FormLabel className="text-black-100 font-gotham font-normal text-sm">
                        Projection
                      </FormLabel>
                      <Select
                        aria-label="select projection"
                        onValueChange={onChange}
                        defaultValue={value}
                      >
                        <SelectTrigger className="w-full mt-3">
                          <SelectValue
                            className="font-mulish text-black-100 font-medium md:px-3 px-1 text-[10px] md:text-xs"
                            placeholder="Select projection"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel className="text-black-100">
                              Projection
                            </SelectLabel>
                            {["Full", "Lite"]?.map(el => (
                              <SelectItem key={el} value={el}>
                                {el}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />{" "}
                <Modal.Footer className="mt-10">
                  <div className="flex justify-start gap-4">
                    <Button onClick={form.handleSubmit(onSubmit)} type="submit">
                      Apply
                    </Button>
                    <Button
                      onClick={reset}
                      type="reset"
                      variant="link"
                      className="text-red-200 "
                    >
                      Reset
                    </Button>
                  </div>
                </Modal.Footer>
              </form>
            </Form>
          </Modal.Content>
        </Modal>
      </div>

      <div className="my-10 border py-4 px-4 md:px-6 border-gray-200 md:grid grid-cols-3 gap-5 ">
        {books?.length > 0
          ? books?.map(book => (
              <BookCard
                key={book.id}
                image={book?.volumeInfo?.imageLinks?.thumbnail}
                name={book?.volumeInfo?.title}
                authors={book?.volumeInfo?.authors}
                description={book?.volumeInfo?.description}
                publishedDate={book?.volumeInfo?.publishedDate}
                // isAvailable={book.saleInfo.saleability}
                // country={book.saleInfo.country}
                id={book.id}
              />
            ))
          : null}
      </div>
    </div>
  );
}

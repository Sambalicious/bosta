/* eslint-disable react/no-danger */

"use client";

import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useGetBookDetails } from "./hooks";

export function BookDetails() {
  const { id } = useParams();

  const { details, isLoading } = useGetBookDetails(id as string);
  const router = useRouter();
  return (
    <div className="max-w-3xl mx-auto">
      <Button
        onClick={() => router.back()}
        variant="ghost"
        icon={<Icons.Back />}
      >
        Go back
      </Button>
      <Card className=" text-white-200 my-10 rounded-sm shadow-sm border border-gray-200">
        <CardContent>
          <div className="flex mb-5 justify-center">
            {isLoading ? (
              <Skeleton className="md:w-[300px] h-full w-full  md:h-[500px] " />
            ) : (
              <Image
                src={
                  details?.volumeInfo?.imageLinks?.extraLarge ?? "/image.png"
                }
                alt={details?.volumeInfo?.title ?? ""}
                height={300}
                width={500}
                quality={100}
                placeholder="blur"
                blurDataURL="logourl"
                className="flex justify-center"
              />
            )}
          </div>
          {isLoading ? (
            <div className="">
              <Skeleton className="w-[35px] my-5 h-[35px]" />
              <Skeleton className="w-[35px] my-5 h-[35px]" />
              <Skeleton className="w-[35px] my-5 h-[35px]" />
              <Skeleton className="w-[35px] my-5 h-[35px]" />
              <Skeleton className="w-[35px] my-5 h-[35px]" />
              <Skeleton className="w-[35px] my-5 h-[400px]" />
            </div>
          ) : (
            <div>
              <p className="font-medium text-base md:text-3xl text-black-200">
                {details?.volumeInfo?.title}
              </p>

              <p className="text-black-100 text-sm font-normal font-gotham">
                {details?.volumeInfo?.subtitle}{" "}
              </p>

              <div className="flex md:text-lg items-center mt-3 text-base gap-2">
                <p>Author: </p>
                {details?.volumeInfo?.authors?.map(el => (
                  <Badge className="text-black-100 font-normal text-sm ">
                    {el}{" "}
                  </Badge>
                ))}
              </div>

              <p className="my-2">
                Published Date:{" "}
                <span>{details?.volumeInfo?.publishedDate} </span>
              </p>

              <div
                dangerouslySetInnerHTML={{
                  __html: details?.volumeInfo?.description ?? "",
                }}
                className=" my-2 prose"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

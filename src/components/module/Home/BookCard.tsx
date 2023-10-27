import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface BookCardProps {
  image: string;
  name: string;
  authors: Array<string>;
  description: string;
  publishedDate: string;
  id: string;

  // isAvailable: boolean;
  // country: string;
}
export function BookCard({
  image,
  name,
  id,
  authors,
  description,

  publishedDate,
}: // country,
BookCardProps) {
  return (
    <Link href={`/books/${id}`} className="border border-gray-200">
      <Card className="rounded-sm">
        <CardContent>
          <Image
            className="md:w-[350px] md:h-[350px] "
            quality={100}
            src={image ?? "/image.png"}
            alt={name}
            width={200}
            height={200}
            placeholder="blur"
            blurDataURL="logourl"
          />

          <div className="p-3">
            <h2 className="mb-2">{name} </h2>
            <div className="flex flex-wrap gap-2">
              <p>Author: </p>
              {authors?.join(", ")}
            </div>

            <p className="my-2">
              Published Date: <span>{publishedDate} </span>
            </p>

            <p className="line-clamp-3 my-2">{description} </p>

            <div className="flex justify-center mt-5">
              <Button>Read more</Button>
            </div>

            {/* <Badge className="mty-3">
              {isAvailable ? "For Sale" : "Not for sale"}{" "}
            </Badge>

            <p className="mt-2">Price: 100 </p> */}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

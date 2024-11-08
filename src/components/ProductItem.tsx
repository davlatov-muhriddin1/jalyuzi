import { Product } from "@/types";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Button } from "./ui/button";
import Image from "next/image";

export default function ProductItem({
  _id,
  imgs,
  title,
  description,
  price,
  getProductDetail,
}: Product) {
  return (
    <Card className="max-w-[450px] w-[450px] overflow-hidden p-4">
      <CardContent className="w-full p-0">
        <Carousel className="w-full h-[150px] sm:w-full sm:h-[250px] rounded-md overflow-hidden">
          <CarouselContent>
            {imgs.map((img, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-[150px] sm:w-full sm:h-[250px]">
                  <Image src={img} alt="image" fill className="object-cover" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-2">
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardTitle className="text-xl my-2">${price}</CardTitle>
          <CardDescription className="text-xl">
            {description.slice(0, 50)}...
          </CardDescription>
          <div className="flex items-center gap-1 sm:gap-3 flex-col sm:flex-row">
            <a
              href="https://t.me/Muhriddin_Davlatov"
              className="w-full sm:w-auto"
            >
              <Button className="mt-3 w-full sm:w-auto">Buyurtma Berish</Button>
            </a>
            <Button
              className="mt-3 w-full sm:w-auto"
              onClick={() =>
                getProductDetail ? getProductDetail(_id) : undefined
              }
            >
              Ko&apos;proq Malumot Olish
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

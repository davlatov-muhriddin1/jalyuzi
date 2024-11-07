import { Product } from "@/types";
import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Button } from "./ui/button";

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
        <Carousel className="w-full h-[250px] rounded-md overflow-hidden">
          <CarouselContent>
            {imgs.map((img, index) => (
              <CarouselItem key={index}>
                <img
                  src={img}
                  alt="image"
                  className="h-full rounded-md object-cover"
                />
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
          <div className="flex items-center gap-3">
            <a href="https://t.me/Muhriddin_Davlatov">
              <Button className="mt-3">Buyurtma Berish</Button>
            </a>
            <Button
              className="mt-3"
              onClick={() =>
                getProductDetail ? getProductDetail(_id) : undefined
              }
            >
              Ko'proq Malumot Olish
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

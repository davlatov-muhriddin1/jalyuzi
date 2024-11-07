import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Product } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

interface ProductDialogProps {
  productDetail?: Product;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ProductDialog({
  isOpen,
  productDetail,
  setIsOpen,
}: ProductDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="w-[70vw] max-w-[70vw] h-[90vh] overflow-auto">
        <Carousel className="w-[100%] h-[500px] rounded-md overflow-hidden">
          <CarouselContent>
            {productDetail?.imgs.map((img, index) => (
              <CarouselItem key={index}>
                <img
                  src={img}
                  alt="image"
                  className="w-full h-full rounded-md object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-2">
          <CardTitle className="text-2xl">{productDetail?.title}</CardTitle>
          <CardTitle className="text-xl my-2">
            ${productDetail?.price}
          </CardTitle>
          <CardDescription className="text-xl">
            {productDetail?.description}
          </CardDescription>
          <div className="flex items-center gap-3">
            <a href="https://t.me/Muhriddin_Davlatov">
              <Button className="mt-3">Buyurtma Berish</Button>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

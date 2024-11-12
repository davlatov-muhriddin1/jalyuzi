import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Product } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CardDescription, CardTitle } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

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
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="w-[70vw] max-w-[70vw] h-[90vh]  overflow-auto custom-scrollbar">
        <Carousel className="w-[100%] h-[500px] rounded-md overflow-hidden">
          <CarouselContent>
            {productDetail?.imgs.map((img, index) => (
              <CarouselItem key={index}>
                <div className="relative w-[70vw] h-[500px]">
                  <Image src={img} alt="image" fill className="object-cover" />
                </div>
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

"use client";

import Loader from "@/components/Loader";
import ProductDialog from "@/components/ProductDialog";
import ProductItem from "@/components/ProductItem";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productDetail, setProdcutDetail] = useState<Product>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getAllProduct = async () => {
    try {
      const { data } = await axios.get("/api/product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductDetail = async (id: string) => {
    setIsOpen(true);
    const { data } = await axios.get(`/api/product/${id}`);
    setProdcutDetail(data.product);
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div className="p-10">
      <div className="flex justify-center flex-wrap gap-5">
        {products.length ? (
          products.map((product) => (
            <ProductItem
              key={product._id}
              {...product}
              getProductDetail={getProductDetail}
            />
          ))
        ) : (
          <Loader />
        )}
      </div>
      <ProductDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        productDetail={productDetail}
      />
    </div>
  );
}

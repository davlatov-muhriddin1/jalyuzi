"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";

export default function Admin() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  // upload image in pinata
  const fileImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileData = new FormData();
    fileData.set("images", e.target.files?.[0] as File);

    setIsLoading(true);
    const { data } = await axios.post("/api/productimgs", fileData);
    setImgUrls((prev) => [...prev, data]);
    setIsLoading(false);
  };

  // upload product in mongodb

  const uploadData = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imgUrls || !title || !description || !price) {
      return;
    }

    try {
      await axios.post("/api/product", {
        imgs: imgUrls,
        title,
        description,
        price,
      });

      setTitle("");
      setDescription("");
      setPrice("");
      setImgUrls([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-20">
      {/* file input */}
      <div>
        <input
          type="file"
          className="absolute right-[99999px]"
          ref={fileInputRef}
          onChange={fileImageUpload}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-blue-500 text-white px-4 py-2 rounded-sm self-center font-semibold"
        >
          {!isLoading ? "Rasm Yuklash" : "Yuklanmoqda..."}
        </button>

        <div className="flex items-center gap-3 mt-3">
          {imgUrls.length
            ? imgUrls.map((item, index) => (
                <div className="relative w-[70px] h-[70px] rounded-md">
                  <Image
                    src={item}
                    alt="img"
                    key={index}
                    className="rounded-md object-cover"
                    fill
                  />
                </div>
              ))
            : null}
        </div>
      </div>

      {/* form */}

      <form onSubmit={uploadData} className="mt-5">
        <div>
          <label
            htmlFor="title"
            className="block mb-1 text-xl font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-[400px] outline-none border border-gray-700 px-2 py-1 rounded-md text-xl"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="py-3">
          <label
            htmlFor="description"
            className="block mb-1 text-xl font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            className="w-[400px] resize-none h-[150px] outline-none border border-gray-700 px-2 py-1 rounded-md text-xl"
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="price"
            className="block mb-1 text-xl font-medium text-gray-900 dark:text-white"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            className="w-[400px] outline-none border border-gray-700 px-2 py-1 rounded-md text-xl"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <Button className="mt-4">Mahsulot Yaratish</Button>
      </form>
    </div>
  );
}

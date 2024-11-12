"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

export default function Admin() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  // upload image in pinata
  const fileImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}-${Date.now()}`);

    try {
      setIsLoading(true);
      const snapshot = await uploadBytes(storageRef, file);
      console.log("File upload successfully");

      const url = await getDownloadURL(snapshot.ref);
      console.log("Download URL:", url);

      setImgUrls((prev) => [...prev, url]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
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
    <div className="p-2 sm:p-20">
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
                <div
                  className="relative w-[70px] h-[70px] rounded-md"
                  key={index}
                >
                  <Image
                    src={item}
                    alt="img"
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
            className="w-[400px] max-w-[100%] outline-none border border-gray-700 px-2 py-1 rounded-md text-xl"
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
            className="w-[400px] max-w-[100%] resize-none h-[150px] outline-none border border-gray-700 px-2 py-1 rounded-md text-xl"
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
            className="w-[400px] max-w-[100%] outline-none border border-gray-700 px-2 py-1 rounded-md text-xl"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <Button className="mt-4">Mahsulot Yaratish</Button>
      </form>
    </div>
  );
}

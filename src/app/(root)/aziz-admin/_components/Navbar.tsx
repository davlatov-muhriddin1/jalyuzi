import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="py-4 border-b shadow-md">
      <ul className="flex items-center gap-4 justify-center">
        <li>
          <Link
            href={"/"}
            className="text-xl bg-gray-500 py-2 px-4 rounded-md text-white"
          >
            Bosh Sahifa
          </Link>
        </li>
        <li>
          <Link
            href={"/aziz-admin/create"}
            className="text-xl bg-gray-500 py-2 px-4 rounded-md text-white"
          >
            Mahsulot Qo'shish
          </Link>
        </li>
        <li>
          <Link
            href={"/aziz-admin/products"}
            className="text-xl bg-gray-500 py-2 px-4 rounded-md text-white"
          >
            Mahsulotlar Ro'yxati
          </Link>
        </li>
      </ul>
    </nav>
  );
}

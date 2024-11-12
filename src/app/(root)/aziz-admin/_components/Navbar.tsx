import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="py-4 border-b shadow-md">
      <ul className="flex items-center gap-4 justify-center">
        <li>
          <Link href={"/aziz-admin/create"} className="text-xl">
            Mahsulot Qo'shish
          </Link>
        </li>
        <li>
          <Link href={"/aziz-admin/products"} className="text-xl">
            Mahsulotlar Ro'yxati
          </Link>
        </li>
      </ul>
    </nav>
  );
}

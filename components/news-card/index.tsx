import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NewsCard({ index, className, product }: any) {
  return (
    <Link
      className={className ?? ""}
      href={`/news/${index}`}
      key={index}
      passHref
    >
      <div className=" group relative select-none">
        <div className=" aspect-h-3 aspect-w-4  overflow-hidden rounded-lg bg-gray-100">
          <Image
            width={300}
            height={600}
            src={product.imageSrc}
            alt={product.imageAlt}
            className="group-hover:scale-110 transition-all duration-150 ease-in"
          />
        </div>
        <div className="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-slate-100">
          <h3 className="line-clamp-2 text-ellipsis group-hover:text-slate-300">
            {product.title}
          </h3>
        </div>
        <p className="mt-1 text-sm text-gray-600">{product.pubDate}</p>
      </div>
    </Link>
  );
}

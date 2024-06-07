import NewsCard from "@/components/news-card";
import { filterNewsByYear, getYearsFromNews } from "@/lib";
import Link from "next/link";
import React from "react";

export default function ArchiveNews({ params }: any) {
  const availableYears = getYearsFromNews();

  const selectedYear = params?.filters?.[0] ?? availableYears[0];

  const news = filterNewsByYear(selectedYear);

  if (news.length === 0) {
    return (
      <div className="text-center my-6 text-gray-400">
        No news found for the year {selectedYear}
      </div>
    );
  }
  return (
    <>
      <ul className="flex ">
        {availableYears.map((year, index) => {
          return (
            <li
              key={index}
              className={`mr-2 hover:text-white cursor-pointer transition-all duration-150 ease-in-out ${
                year == selectedYear ? "text-white" : "text-slate-500 "
              } $`}
            >
              <Link href={`/archives/${year}`}>{year}</Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 h-full gap-x-8 gap-y-8 sm:gap-y-10 overflow-x-auto flex flex-row flex-grow-1 ">
        {news.map((news: any, index) => {
          news = {
            ...news,
            imageSrc: `https://picsum.photos/seed/${index + 1}/200/300`,
            imageAlt: "News Image :https://picsum.photos/seed/200/300",
          };

          return (
            <NewsCard
              className="min-w-[200px] w-full max-w-[200px]  pb-10"
              key={index}
              index={index}
              product={news}
            />
          );
        })}
      </div>
    </>
  );
}

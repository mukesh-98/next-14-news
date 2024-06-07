import NewsCard from "@/components/news-card";
import { getTop10News } from "@/lib";
import React from "react";

export default function LatestNews() {
  const latestNews = getTop10News();

  return (
    <>
      <div className="mt-2 text-xl text-center">Top 10 news</div>
      <div className="mt-6 gap-x-8 gap-y-8 sm:gap-y-10 overflow-x-auto flex flex-row flex-grow-1 ">
        {latestNews.map((news: any, index) => {
          news = {
            ...news,
            imageSrc: `https://picsum.photos/seed/${index + 1}/200/300`,
            imageAlt: "News Image :https://picsum.photos/seed/200/300",
          };

          return (
            <NewsCard
              key={index}
              className="min-w-[200px]  pb-10"
              index={index}
              product={news}
            />
          );
        })}
      </div>
    </>
  );
}

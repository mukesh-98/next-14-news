import Image from "next/image";
import Link from "next/link";
import news from "../../../Sample_Report.json";
import NewsCard from "@/components/news-card";
export default function NewsList() {
  return (
    <div className="z-10">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between space-x-4">
          <h2 className="text-lg font-medium text-slate-200">Latest News</h2>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          {news.map((product: any, index: any) => {
            product = {
              ...product,
              imageSrc: `https://picsum.photos/seed/${index + 1}/200/300`,
              imageAlt: "News Image :https://picsum.photos/seed/200/300",
            };
            return (
              <NewsCard
                key={index}
                index={index}
                product={product}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

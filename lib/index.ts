import news from "../Sample_Report.json";

export const getTop10News = () => {
  return news.slice(0, 10);
};
export const getYearsFromNews = () => {
  const years: number[] = [];
  news.forEach((item: any) => {
    const year = new Date(item.pubDate.split("-")[0]).getFullYear();
    if (!years.includes(year)) {
      years.push(year);
    }
  });
  return years.sort();
};
export const filterNewsByYear = (year: number) => {
  return news.filter((item: any) => {
    const itemYear = new Date(item.pubDate.split("-")[0]).getFullYear();
    return itemYear == year;
  });
};

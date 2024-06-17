import DUMMY_NEWS from "../Sample_Report.json";
import sql from "better-sqlite3";
const newsParser = ({ keywords, creator, country, category, ...news }: any) => {
  return {
    ...news,
    keywords: JSON.parse(keywords),
    creator: JSON.parse(creator),
    country: JSON.parse(country),
    category: JSON.parse(category),
  };
};

const db = sql("data.db", { verbose: console.log });
export function initDb() {
  db.prepare(
    `CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    link TEXT,
    keywords TEXT  NULL,
    creator TEXT  NULL,
    video_url TEXT NULL,
    description TEXT  NULL,
    content TEXT  NULL,
    pubDate TEXT  NULL,
    full_description TEXT  NULL,
    image_url TEXT  NULL,
    source_id TEXT  NULL,
    country TEXT  NULL,
    category TEXT  NULL,
    language TEXT  NULL
)`
  ).run();

  const { count }: any = db.prepare("SELECT COUNT(*) as count FROM news").get();

  if (count === 0) {
    const insert = db.prepare(
      `INSERT INTO news (
        title, 
        link, 
        keywords, 
        creator, 
        video_url, 
        description, 
        content, 
        pubDate, 
        full_description, 
        image_url, 
        source_id, 
        country, 
        category, 
        language
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );

    DUMMY_NEWS.forEach((news) => {
      insert.run(
        news.title,
        news.link,
        JSON.stringify(news.keywords), // serialize array to JSON string
        JSON.stringify(news.creator),
        news.video_url,
        news.description,
        news.content,
        news.pubDate,
        news.full_description,
        news.image_url,
        news.source_id,
        JSON.stringify(news.country),
        JSON.stringify(news.category),
        news.language
      );
    });
  }
}
export const getAllNews = () => {
  const news = db.prepare("SELECT * FROM news").all();
  return news.map((news) => newsParser(news));
};
export const getTop10News = () => {
  return getAllNews().slice(0, 10);
};
export const getYearsFromNews = () => {
  const years: number[] = [];
  getAllNews().forEach((item: any) => {
    const year = new Date(item.pubDate.split("-")[0]).getFullYear();
    if (!years.includes(year)) {
      years.push(year);
    }
  });
  return years.sort();
};
export const filterNewsByYear = (year: number) => {
  return getAllNews().filter((item: any) => {
    const itemYear = new Date(item.pubDate.split("-")[0]).getFullYear();
    return itemYear == year;
  });
};

export const getNewsById = (id: number) => {
  const news = db.prepare("SELECT * FROM news WHERE id = ?").get(id);
  return newsParser(news);
};

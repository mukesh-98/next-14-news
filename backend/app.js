import express from "express";
import sqlite from "better-sqlite3";
import cors from "cors";
import { data as DUMMY_NEWS } from "./Sample_Report.js";
const db = sqlite("data.db");
function initDb() {
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

  const { count } = db.prepare("SELECT COUNT(*) as count FROM news").get();

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

const app = express();

app.use(cors());

const newsParser = ({ keywords, creator, country, category, ...news }) => {
  return {
    ...news,
    keywords: JSON.parse(keywords),
    creator: JSON.parse(creator),
    country: JSON.parse(country),
    category: JSON.parse(category),
  };
};

app.get("/news", (req, res) => {
  const news = db.prepare("SELECT * FROM news").all();
  res.json(news.map((news) => newsParser(news)));
});
app.get("/news/:id", (req, res) => {
  const { id } = req.params;
  const news = db.prepare("SELECT * FROM news WHERE id = ?").get(id);
  if (news) {
    res.json(newsParser(news));
  } else {
    res.status(404).json({ error: "News not found" });
  }
});

initDb();

app.listen(4001);

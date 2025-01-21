import { defineEventHandler } from 'h3';
import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

interface Article {
  metadata: {
    [key: string]: any;
  };
  content: string;
}

export default defineEventHandler(() => {
  const filePath = path.resolve('src/content/blog/articles.md'); // Path to your Markdown file

  if (!fs.existsSync(filePath)) {
    return { statusCode: 404, body: { error: 'File not found.' } };
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const articles: Article[] = [];

  // Split articles by delimiter
  const rawArticles = fileContent.split('===');

  console.log(rawArticles);

  rawArticles.forEach((rawArticle) => {
    const parsed = matter(rawArticle.trim());
    articles.push({
      metadata: parsed.data, // Metadata like title, date, tags
      content: parsed.content, // Article content
    });
  });

  return { statusCode: 200, body: { articles } };
});

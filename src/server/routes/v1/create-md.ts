import * as fs from 'fs';
import * as path from 'path';
import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.markdown) {
    return { statusCode: 400, body: { error: 'Markdown content is required.' } };
  }

  const markdown = body.markdown;

  const fileName = `post-${Date.now()}.md`;
  const dir = path.resolve('src/content/blog');

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const filePath = path.join(dir, fileName);
  fs.writeFileSync(filePath, markdown, 'utf8');

  return { statusCode: 200, body: { message: `Markdown file ${fileName} created successfully!` } };
});

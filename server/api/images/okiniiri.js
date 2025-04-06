// filepath: server/api/images/okiniiri.js
import fs from 'node:fs/promises';
import path from 'node:path';
import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  const imageName = event.context.params.imageName;
  const imagePath = path.join(process.cwd(), 'assets/favorite-images', imageName); // 画像の保存場所

  try {
    const imageBuffer = await fs.readFile(imagePath);
    const contentType = `image/${path.extname(imagePath).slice(1)}`; // 拡張子から Content-Type を決定

    event.node.res.setHeader('Content-Type', contentType);
    return imageBuffer;
  } catch (error) {
    console.error(error);
    event.node.res.statusCode = 404;
    return 'Image not found';
  }
});
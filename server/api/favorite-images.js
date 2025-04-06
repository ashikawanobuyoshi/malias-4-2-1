// /server/api/favorite-images.js
import fs from 'node:fs/promises';
import path from 'node:path';

export default defineEventHandler(async (event) => {
  try {
    // 画像が保存されているディレクトリ
    const imageDir = path.join(process.cwd(), 'assets/favorite-images');

    // ディレクトリ内のファイル一覧を取得
    const files = await fs.readdir(imageDir);

    // 画像ファイルのみをフィルタリング
    const imageFiles = files.filter(file => ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(file).toLowerCase()));

    // 画像データの配列を生成
    const favoriteImages = imageFiles.map((file, index) => ({
      id: index + 1,
      url: `/api/images/${file}`, // 修正: APIエンドポイントを使用
      alt: `お気に入り画像${index + 1}`
    }));

    return favoriteImages;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch favorite images'
    });
  }
});
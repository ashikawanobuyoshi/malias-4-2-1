<!-- pages/TemplatePage.vue -->
<template>
  <div class="template-page">
    <!-- 選択中の画像の表示 -->
    <div class="favorite-image-display" v-if="currentImage">
      <img :src="currentImage.url" :alt="currentImage.alt" />
    </div>
    <div v-else>
      <p>画像を読み込み中…</p>
    </div>

    <!-- サムネイル一覧 -->
    <div class="template-controls">
      <h2>台紙を選んで画像を仕上げましょう！</h2>
      <div class="favorite-items" v-if="images && images.length">
        <div
          class="favorite-item"
          v-for="image in images"
          :key="image.id"
          @click="selectImage(image)"
        >
          <img :src="image.url" :alt="image.alt" loading="lazy" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/*
  1. 自動インポート
     ~/assets/favorite-images/ にある .jpg ファイルをすべて取得します。
*/
const imageModules = import.meta.glob('~/assets/favorite-images/*.jpg', { eager: true })

/*
  2. URL を変換
     各キー（ファイルパス）から画像ファイル名を抽出し、手動で '/okiniiri' の形に変換します。
*/
const images = Object.entries(imageModules).map(([path, _], index) => {
  // 例: '~/assets/favorite-images/11.jpg' から '11.jpg' を取得
  const imageName = path.split('/').pop() || '';
  return {
    id: index,
    url: `/okiniiri/${imageName}`, // 希望するエンドポイントでパスを生成
    alt: `お気に入り画像 ${index + 1}`
  }
})

const route = useRoute();
const router = useRouter();

/*
  3. 表示する画像の選択
     クエリパラメータ ?image= にマッチする画像があるか確認し、なければ最初の画像を表示
*/
const currentImage = computed(() => {
  if (route.query.image && images && images.length) {
    const found = images.find(img => img.url === (route.query.image as string))
    return found || images[0]
  }
  return images && images.length ? images[0] : null
})

/*
  4. サムネイル選択時の処理
     選択した画像の URL をクエリパラメータとして画面に反映する
*/
function selectImage(image: { id: number; url: string; alt: string }) {
  router.push({ query: { image: image.url } })
}
</script>

<style scoped>
.template-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.favorite-image-display {
  text-align: center;
  margin-bottom: 20px;
}

.favorite-image-display img {
  max-width: 90%;
  height: auto;
  border: 2px solid #ccc;
  border-radius: 4px;
}

.template-controls {
  text-align: center;
}

/* サムネイル一覧のスタイル */
.favorite-items {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.favorite-item img {
  max-width: 100px;
  height: auto;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.3s ease;
}

.favorite-item img:hover {
  border-color: #aaa;
}
</style>
<template>
  <div class="container">
    <!-- 左右の大モニター表示部分（連動なし） -->
    <div class="monitors">
      <div class="monitor left">
        <img 
          :src="leftImages[leftIndex]" 
          alt="Left Main Image" 
          @click="addFavorite(leftImages[leftIndex])" 
        />
        <button @click="addFavorite(leftImages[leftIndex])">
          お気に入りに追加（左）
        </button>
      </div>
      <div class="monitor right">
        <img 
          :src="rightImages[rightIndex]" 
          alt="Right Main Image" 
          @click="addFavorite(rightImages[rightIndex])" 
        />
        <button @click="addFavorite(rightImages[rightIndex])">
          お気に入りに追加（右）
        </button>
      </div>
    </div>

    <!-- サムネイル部分：左右各モニターの下に、横並び表示 -->
    <div class="thumbnails">
      <div class="thumbnail left">
        <div 
          v-for="(image, index) in leftImages" 
          :key="index" 
          class="thumb"
          :class="{ active: index === leftIndex }"
          @click="selectLeftImage(index)"
        >
          <img :src="image" alt="" />
        </div>
      </div>
      <div class="thumbnail right">
        <div 
          v-for="(image, index) in rightImages" 
          :key="index" 
          class="thumb"
          :class="{ active: index === rightIndex }"
          @click="selectRightImage(index)"
        >
          <img :src="image" alt="" />
        </div>
      </div>
    </div>

    <!-- お気に入り画像出力機構 -->
    <div class="favorites">
      <h3>お気に入り画像一覧</h3>
      <div class="favorite-list">
        <div 
          v-for="(fav, index) in favorites" 
          :key="index" 
          class="favorite"
        >
          <img :src="fav" alt="" />
        </div>
      </div>
      <button @click="exportFavorites">お気に入りを書き出す</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// サンプル画像の配列（必要に応じて API 等から動的取得可能）
const leftImages = [
  '/images/1.jpg', 
  '/images/2.jpg',
  '/images/3.jpg',
  '/images/4.jpg',
  '/images/5.jpg',
  '/images/6.jpg',
  '/images/7.jpg',
  '/images/8.jpg',
  '/images/9.jpg',
  '/images/10.jpg',
  '/images/11.jpg',
  '/images/12.jpg', 
  '/images/13.jpg',
  '/images/14.jpg',
  '/images/15.jpg',
  '/images/16.jpg',
  '/images/17.jpg',
  '/images/18.jpg'
]
const rightImages = [
  '/images/1.jpg', 
  '/images/2.jpg',
  '/images/3.jpg',
  '/images/4.jpg',
  '/images/5.jpg',
  '/images/6.jpg',
  '/images/7.jpg',
  '/images/8.jpg',
  '/images/9.jpg',
  '/images/10.jpg',
  '/images/11.jpg',
  '/images/12.jpg', 
  '/images/13.jpg',
  '/images/14.jpg',
  '/images/15.jpg',
  '/images/16.jpg',
  '/images/17.jpg',
  '/images/18.jpg'
]

// 初期表示は配列の先頭（若い番号）の画像
const leftIndex = ref(0)
const rightIndex = ref(0)

// お気に入り用の配列
const favorites = ref([])

// サムネイルクリックで大モニター画像を切替
function selectLeftImage(index) {
  leftIndex.value = index
}
function selectRightImage(index) {
  rightIndex.value = index
}

// お気に入り画像の追加（重複チェック付き）
function addFavorite(image) {
  if (!favorites.value.includes(image)) {
    favorites.value.push(image)
  }
}

// お気に入りを JSON ファイルとして書き出す例
function exportFavorites() {
  const dataStr = JSON.stringify(favorites.value, null, 2)
  const blob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'favorites.json'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}

/* モニター部分のスタイル */
.monitors {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
.monitor {
  flex: 1;
  border: 1px solid #ccc;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.monitor img {
  max-width: 100%;
  max-height: 80%;
  object-fit: contain;
}
.monitor button {
  margin-top: 5px;
}

/* サムネイル部分 --> 横並びに変更 */
.thumbnails {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
}
.thumbnail {
  flex: 1;
  border: 1px solid #ccc;
  /* 横スクロールを有効に */
  overflow-x: auto;
  display: flex;
  flex-direction: row; /* 横並び */
  padding: 5px;
}
.thumb {
  margin-right: 5px;
  cursor: pointer;
  border: 2px solid transparent;
}
.thumb.active {
  border-color: #007bff;
}
.thumb img {
  width: 100px;
  height: 80px;
  object-fit: cover;
}

/* お気に入り画像表示部分 */
.favorites {
  margin-top: 20px;
}
.favorite-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
}
.favorite {
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  overflow: hidden;
}
.favorite img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
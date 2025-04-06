<template>
  <div class="image-selector">
    <!-- モニター部（左右独立） -->
    <div class="monitor-container">
      <div class="monitor monitor-left">
        <img :src="leftImage" alt="Left Selected Image" />
      </div>
      <div class="monitor monitor-right">
        <img :src="rightImage" alt="Right Selected Image" />
      </div>
    </div>

    <!-- サムネイル部（左右独立で横スクロール） -->
    <div class="thumbnail-container">
      <!-- 左サムネイル -->
      <div ref="leftThumbnail" class="thumbnail left-thumbnail">
        <div
          v-for="(img, index) in images"
          :key="'left-' + index"
          class="thumbnail-item"
          :class="{ active: index === leftIndex }"
          @click="selectLeftImage(index)"
        >
          <img :src="img" alt="Thumbnail" />
        </div>
      </div>
      <!-- 右サムネイル -->
      <div ref="rightThumbnail" class="thumbnail right-thumbnail">
        <div
          v-for="(img, index) in images"
          :key="'right-' + index"
          class="thumbnail-item"
          :class="{ active: index === rightIndex }"
          @click="selectRightImage(index)"
        >
          <img :src="img" alt="Thumbnail" />
        </div>
      </div>
    </div>

    <!-- お気に入り追加ボタン -->
    <div class="controls">
      <button @click="addToFavorites(leftImage)">お気に入りに追加（左画像）</button>
      <button @click="addToFavorites(rightImage)">お気に入りに追加（右画像）</button>
    </div>

    <!-- お気に入り画像出力部（ここでクリックすると削除） -->
    <div class="favorites">
      <h3>お気に入り画像</h3>
      <div class="favorites-gallery">
        <div
          v-for="(favImg, index) in favoriteImages"
          :key="index"
          class="favorite-item"
          @click="removeFavorite(index)"
        >
          <img :src="favImg" alt="Favorite Image" />
        </div>
      </div>
    </div>

    <!-- お気に入りが決定したら台紙選択画面へ移動するボタン -->
    <div class="template-navigation">
      <button @click="gotoTemplatePage">台紙選択へ進む</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 動的に画像を読み込む例（画像は src/assets/images 以下に配置）
const imageModules = import.meta.glob('/src/assets/images/*.jpg', {
  eager: true,
  query: '?url',
  import: 'default'
})
const images = Object.entries(imageModules)
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(([, url]) => url as string)

// 左右の画像インデックスとその computed プロパティ
const leftIndex = ref<number>(0)
const rightIndex = ref<number>(0)
const leftImage = computed(() => images[leftIndex.value] || '')

const rightImage = computed(() => images[rightIndex.value] || '')

// お気に入り画像を格納する配列
const favoriteImages = ref<string[]>([])

// サムネイルクリックで画像を選択する関数
function selectLeftImage(index: number) {
  leftIndex.value = index
}
function selectRightImage(index: number) {
  rightIndex.value = index
}

// お気に入り追加関数（既に追加されていなければ追加する）
function addToFavorites(image: string) {
  if (image && !favoriteImages.value.includes(image)) {
    favoriteImages.value.push(image)
  }
}

// お気に入り画像がクリックされたときに、その画像を削除する関数
function removeFavorite(index: number) {
  favoriteImages.value.splice(index, 1)
}

// 「台紙選択へ進む」ボタンをクリックしたときの処理
function gotoTemplatePage() {
  // お気に入り画像が1枚以上あれば、ここでは最初の1枚を選択例としています
  if (favoriteImages.value.length > 0) {
    // 最初の画像ではなく、最後に選択された画像を使用する
    const selectedImage = favoriteImages.value[favoriteImages.value.length - 1];
    // ルータの push を使い、クエリパラメータとして画像URLを渡してページ遷移
    router.push({ name: "TemplatePage", query: { image: selectedImage } })
  } else {
    alert("お気に入り画像を追加してください！")
  }
}
</script>

<style scoped>
.favorite-item {
  cursor: pointer;
}
.image-selector {
  max-width: 1200px;
  margin: 0 auto;
}
.monitor-container {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
.monitor {
  flex: 1;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  overflow: hidden;
}
.monitor img {
  max-width: 100%;
  max-height: 100%;
}
.thumbnail-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}
.thumbnail {
  flex: 1;
  height: 150px;
  overflow-x: auto;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 5px;
}
.thumbnail-item {
  line-height: 0;
  font-size: 0;
  margin: 0;
  padding: 0;
}
.thumbnail-item.active {
  border: 2px solid blue;
}
.thumbnail-item img {
  display: block;
  width: auto;
  height: 100%;
}
.controls {
  text-align: center;
  margin-bottom: 20px;
}
.favorites {
  border-top: 1px solid #ccc;
  padding-top: 20px;
}
.favorites-gallery {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.favorite-item img {
  width: 100px;
  height: auto;
  border: 1px solid #ccc;
}
.template-navigation {
  text-align: center;
  margin-top: 20px;
}
</style>
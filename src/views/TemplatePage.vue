<template>
    <div class="template-page">
      <!-- ページ上部にお気に入り画像を表示 -->
      <div class="favorite-image-display">
        <img :src="favImage" alt="お気に入り画像" />
      </div>
  
      <!-- 台紙選択や画像加工の操作をここに記述 -->
      <div class="template-controls">
        <h2>台紙を選んで画像を仕上げましょう！</h2>
        <!-- 台紙選択コンテンツなど -->
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  // クエリパラメータの "image" を取得（なければ空文字）
  const favImage = computed(() => route.query.image || "")
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
  }
  .template-controls {
    text-align: center;
  }
  </style>
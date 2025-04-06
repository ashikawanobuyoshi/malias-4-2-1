<!-- layouts/default.vue -->
<template>
    <div class="layout">
      <!-- グローバルヘッダー -->
      <header class="global-header">
        <nav>
          <ul>
            <li><NuxtLink to="/">Home</NuxtLink></li>
            <li><NuxtLink to="/gallery">Gallery</NuxtLink></li>
            <li><NuxtLink to="/about">About</NuxtLink></li>
            <li><NuxtLink to="/contact">Contact</NuxtLink></li>
          </ul>
        </nav>
      </header>
  
      <!-- 各ページコンテンツ -->
      <main>
        <NuxtPage />
      </main>
  
      <!-- グローバルフッター -->
      <footer class="global-footer">
        <p>&copy; 2025 My Image Selector Project</p>
      </footer>
    </div>
  </template>
  
  <style scoped>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .global-header {
    background-color: #f8f8f8;
    padding: 10px 20px;
    border-bottom: 1px solid #ccc;
  }
  
  .global-header ul {
    display: flex;
    list-style: none;
    gap: 20px;
    margin: 0;
    padding: 0;
  }
  
  .global-header li {
    font-size: 1rem;
  }
  
  .global-footer {
    background-color: #f8f8f8;
    text-align: center;
    margin-top: auto;
    padding: 15px 0;
    border-top: 1px solid #ccc;
  }
  </style>
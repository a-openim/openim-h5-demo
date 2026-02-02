<template>
  <div class="flex flex-col h-screen bg-[#111] text-white overflow-hidden">
    <header class="p-4 flex justify-between items-center bg-[#1a1a1a]">
      <div class="flex items-center gap-2">
        <span class="text-xl font-black italic tracking-tighter">至尊天下</span>
      </div>
      <div class="flex items-center bg-[#2a2a2a] rounded-full px-3 py-1 gap-3 border border-gray-700">
        <div class="flex flex-col items-end">
          <span class="text-[10px] text-gray-400 leading-none">CNY</span>
          <span class="text-sm font-mono font-bold text-yellow-500">888,888,888.00</span>
        </div>
        <button class="bg-gradient-to-r from-yellow-600 to-yellow-300 text-black text-xs font-bold px-3 py-1 rounded-md active:opacity-80">
          充值
        </button>
      </div>
    </header>

    <main class="flex-1 overflow-y-auto pb-20 px-4">
      <nav class="grid grid-cols-4 gap-2 my-4">
        <button 
          v-for="nav in categories" :key="nav.name"
          @click="currentTab = nav.name"
          :class="[
            'flex flex-col items-center py-3 rounded-xl transition-all',
            currentTab === nav.name ? 'bg-gradient-to-b from-[#e2bc8a] to-[#8d663e] shadow-lg scale-95' : 'bg-[#262626]'
          ]"
        >
          <span class="text-xl mb-1">{{ nav.icon }}</span>
          <span class="text-xs font-medium">{{ nav.name }}</span>
        </button>
      </nav>

      <div class="flex items-center justify-center gap-3 py-4 opacity-60 text-xs tracking-[0.2em]">
        <span>———</span> 热门游戏选择 <span>———</span>
      </div>

      <div class="grid grid-cols-3 gap-3">
        <div v-for="game in games" :key="game.id" class="relative bg-[#262626] rounded-xl overflow-hidden shadow-lg active:scale-95 transition-transform">
          <div class="aspect-[3/4] bg-[#333]">
             <img :src="game.image" class="w-full h-full object-cover" />
          </div>
          <div class="absolute bottom-0 w-full bg-black/70 py-1 px-1">
            <p class="text-[10px] text-center truncate">{{ game.title }}</p>
          </div>
        </div>
      </div>
    </main>

    <footer class="fixed bottom-0 w-full bg-[#1a1a1a] border-t border-white/10 flex justify-around py-2 shadow-[0_-5px_15px_rgba(0,0,0,0.5)]">
      <div v-for="item in footerNav" :key="item.label" class="flex flex-col items-center opacity-60 hover:opacity-100">
        <div class="text-xl">{{ item.icon }}</div>
        <span class="text-[10px] mt-1">{{ item.label }}</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentTab = ref('热门');

const categories = [
  { name: '热门', icon: '🔥' },
  { name: '弹珠', icon: '🎱' },
  { name: '彩票', icon: '🎲' },
  { name: '体育', icon: '⚽' },
];

const footerNav = [
  { label: '首页', icon: '🏠' },
  { label: '动态', icon: '🧭' },
  { label: '聊天室', icon: '💬' },
  { label: '代理', icon: '🤝' },
  { label: '我的', icon: '👤' },
];

const games = [
  { id: 1, title: 'PG麻将胡了', image: 'https://placehold.co/150x200/444/white?text=PG+1' },
  { id: 2, title: 'PG麻将胡了2', image: 'https://placehold.co/150x200/444/white?text=PG+2' },
  { id: 3, title: 'PG横财来呀', image: 'https://placehold.co/150x200/444/white?text=PG+3' },
  { id: 4, title: 'JDB财神捕鱼', image: 'https://placehold.co/150x200/444/white?text=JDB+1' },
  { id: 5, title: 'JDB五龙捕鱼', image: 'https://placehold.co/150x200/444/white?text=JDB+2' },
  { id: 6, title: 'PG火树赢花', image: 'https://placehold.co/150x200/444/white?text=PG+4' },
];
</script>

<style scoped>
/* 隐藏滚动条但保持可滚动 */
main::-webkit-scrollbar {
  display: none;
}
main {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
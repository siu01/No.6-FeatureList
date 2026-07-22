<script setup>
import ChatList from "@/components/ChatList.vue";
</script>

<template>
  <section class="top-view">
    <h1>トップ画面</h1>
    <ChatList />
  </section>
</template>

<style scoped>
.top-view {
  max-width: 420px;
  margin: 0 auto;
  display: grid;
  gap: 24px;
}
</style>

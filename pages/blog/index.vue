<template>
  <div v-for="(value, key) in data">
    <nuxt-link :to="{name: 'blog-pages-id___fa', params: {id: key}}">{{ key }}</nuxt-link>
  </div>
</template>

<script setup lang="ts">
const { $notion } = useNuxtApp()
const { data } = await useAsyncData("notion", () => $notion.getPageBlocks("dec0b9e78ba34712aadb22c44c95fc9d"))
</script>

<style scoped>

</style>
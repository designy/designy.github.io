<template>
  <NotionRenderer :blockMap="data" fullPage prism />
</template>

<script setup lang="ts">

import { useRoute } from 'vue-router'

definePageMeta({
  layout: "pages",
});

const route = useRoute();
const { $notion } = useNuxtApp()

const { data } = await useAsyncData("notion", () => $notion.getPageBlocks(route.params.id))

</script>

<style scoped>

</style>
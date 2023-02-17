<template>
  <NotionRenderer :blockMap="data" fullPage prism />
</template>

<script setup lang="ts">


definePageMeta({
  layout: "pages",
});

const { $notion } = useNuxtApp()

const { data } = await useAsyncData("notion", () => $notion.getPageBlocks('dec0b9e78ba34712aadb22c44c95fc9d'))
console.log(data)
</script>

<style scoped>

</style>
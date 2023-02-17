<template>
<!--  <NotionRenderer :blockMap="data" fullPage prism />-->
</template>

<script setup lang="ts">
// const { $notion } = useNuxtApp()
// const { data } = await useAsyncData("notion", () => $notion.getPageBlocks("19bd5a4bddf3426ebd2d28c82cffd9f7"))
import {Client} from "@notionhq/client";

// Initializing a client
const notion = new Client({
  auth: "secret_Be3jMuvCRtZGlvQz0p0yVpCTIpkWc2LsqYfomPTEjE3",
})
const result = await notion.databases.list({})
console.log(result)
</script>

<style scoped>

</style>
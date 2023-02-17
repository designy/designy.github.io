<template>
  <div>
    <v-layout dir="rtl">
      <v-app-bar>
        <v-btn icon="mdi-home" :to="{ path: '/'}"></v-btn>
        <v-app-bar-title>Ali Esmaeili</v-app-bar-title>
        <template v-slot:append>
          <v-btn icon="mdi-heart"></v-btn>

          <v-btn icon="mdi-magnify"></v-btn>

          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
      </v-app-bar>
      <v-main>
        <slot />
      </v-main>
    </v-layout>
  </div>
</template>
<script>
export default {

  layout: "pages",
}

</script>
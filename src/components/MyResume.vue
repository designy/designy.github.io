<template>
  <div
    class="bg-white rounded rounded-tr-none rounded-br-none h-full w-full lg:absolute lg:overflow-auto"
  >
    <heading-title first-word="رزومه" another-words="کاری/شغلی" />
    <div
      v-for="item in workExperiences"
      :key="item.name"
      class="p-8 flex flex-col md:flex-row items-center justify-start relative centerEllipsisGradiantGutter"
    >
      <a
        :href="item.website"
        target="_blank"
        class="flex flex-col justify-between items-center ml-3 w-10"
      >
        <img
          :src="item.logo"
          width="150"
          height="150"
          class="rounded w-8"
          :alt="item.name"
        />
        <span class="mt-2"> {{ item.name }} </span>
      </a>
      <p v-html="item.description"></p>
    </div>
    <div class="bg-blue-100"></div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'MyResume',
    computed: {
      ...mapGetters('profile', ['workExperiences']),
    },
  };
</script>

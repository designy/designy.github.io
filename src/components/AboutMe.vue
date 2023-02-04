<template>
  <div
    class="bg-white rounded rounded-tr-none rounded-br-none h-full w-full lg:absolute lg:overflow-auto"
  >
    <heading-title first-word="درباره" another-words="من" />
    <div class="flex flex-col md:flex-row">
      <div class="text-justify p-8 topEllipsisGradiantGutter relative">
        <p class="text-gray-600" v-html="aboutMeParagraph"></p>
      </div>
      <div class="p-8 relative flex-grow">
        <ul>
          <li
            v-for="item in aboutMeTips"
            :key="item.label"
            class="flex justify-between items-center py-2 relative centerEllipsisGradiantGutter,"
          >
            <small>
              <strong
                class="px-2 bg-green-800 rounded text-start text-white whitespace-nowrap"
              >
                {{ item.label }}
              </strong>
            </small>
            <span class="text-gray-600 pr-2">{{ item.value }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'AboutMe',
    computed: {
      ...mapGetters('profile', ['aboutMeTips', 'aboutMeParagraph']),
    },
  };
</script>

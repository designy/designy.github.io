<template>
  <div class="lg:w-2/5 relative w-full mt-20 lg:mt-0">
    <div
      :class="[
        'h-full w-full rounded z-10 hidden sm:block',
        $style.profileShadow,
      ]"
    ></div>

    <div
      :class="[
        'bg-white h-full rounded shadow-2xl relative z-20 flex flex-col justify-between',
        $style.profileCard,
      ]"
    >
      <div :class="['relative rounded', $style.profilePictureWrapper]">
        <img :src="image" width="600" height="400" :alt="name" />
      </div>
      <div class="mt-8 text-center font-bold text-2xl">
        {{ name }}
        <span class="text-3xl" v-html="emoji"></span>
      </div>
      <div class="mt-3 text-center text-green-800 h-6">
        {{ aboutMeSentencesTyping }}
      </div>
      <div class="my-3 h-16 flex justify-between items-center">
        <a
          v-for="item in socials"
          :key="item.network"
          :href="item.link"
          target="_blank"
          :aria-label="item.network"
          rel="noopener"
          class="mx-4 flex-grow hover:text-green-500 flex justify-center items-center"
        >
          <i :class="`fab fa-2x fa-${item.network}`"></i>
        </a>
      </div>
      <div :class="['w-full h-16 relative', $style.profileFooterButtons]">
        <div :class="['flex h-full justify-center items-center']">
          <div
            class="relative h-full flex-1 flex justify-center items-center topEllipsisGradiantGutter"
          >
            <a
              href=""
              class="text-center hover:text-green-500"
              @click.prevent="$emit('changeTab', 'my-resume')"
            >
              رزومه
            </a>
          </div>
          <div class="relative h-full flex-1 flex justify-center items-center">
            <a
              href=""
              class="text-center text-green-500 hover:text-green-700"
              @click.prevent="$emit('changeTab', 'contact-me')"
            >
              ارتباط داشته باشیم ؟
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'ProfileCard',
    computed: {
      ...mapGetters('profile', [
        'socials',
        'name',
        'emoji',
        'image',
        'aboutMeSentences',
      ]),
    },
    data: (vm) => ({
      subtitleCounter: 1,
      aboutMeSentencesTyping: vm.$store.state.profile.aboutMeSentences[0],
    }),
    mounted() {
      this.typeCharacterByCharacter();
    },
    methods: {
      typeCharacterByCharacter() {
        const word = this.aboutMeSentencesTyping;
        const nextWord = this.aboutMeSentences[this.subtitleCounter];
        for (let i = 0; i < word.length; i++) {
          setTimeout(() => {
            this.aboutMeSentencesTyping = word.slice(0, word.length - 1 - i);
          }, i * 50);
        }
        for (let i = 0; i <= nextWord.length; i++) {
          setTimeout(() => {
            this.aboutMeSentencesTyping = nextWord.slice(0, i);
          }, word.length * 50 + i * 50);
        }
        this.subtitleCounter =
          (this.subtitleCounter + 1) % this.aboutMeSentences.length;
        setTimeout(() => {
          this.typeCharacterByCharacter();
        }, word.length * 50 + nextWord.length * 50 + 4000);
      },
    },
  };
</script>

<style module lang="scss">
  .profileCard {
    position: relative;
  }

  .profileShadow {
    position: absolute;
    right: -15px;
    top: -15px;
    background: linear-gradient(
      135deg,
      rgba(120, 204, 109, 0.4) 0%,
      rgba(120, 204, 109, 0.01) 100%
    );
  }
  .profilePictureWrapper {
    overflow: hidden;
    &::after {
      content: '';
      width: 100%;
      height: 70px;
      display: block;
      background-color: white;
      transform: rotate(-8deg);
      right: -10px;
      position: absolute;
      bottom: -70px;
    }
    &::before {
      content: '';
      width: 100%;
      height: 70px;
      display: block;
      background-color: white;
      transform: rotate(8deg);
      left: -10px;
      position: absolute;
      bottom: -70px;
    }
  }
  .profileFooterButtons {
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 1px;
      background: radial-gradient(
        ellipse at center,
        #ddd 0%,
        rgba(255, 255, 255, 0) 70%
      );
    }
  }
</style>

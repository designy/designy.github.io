<template>
  <div :class="['text-start p-8 pb-0', $style.title]">
    <span
      :class="[
        'text-green-800 font-semibold inline-block mb-8 text-lg relative',
        $style.firstWord,
      ]"
    >
      {{ firstWord }}
    </span>
    <span class="font-semibold text-lg"> {{ anotherWords }} </span>
  </div>
</template>

<script>
  export default {
    name: 'HeadingTitle',
    props: {
      firstWord: {
        type: String,
        default: '',
      },
      anotherWords: {
        type: String,
        default: '',
      },
    },
  };
</script>

<style module lang="scss">
  .title {
    .firstWord {
      &::before {
        position: absolute;
        border-radius: 30px;
        right: -17px;
        top: 0;
        background: -webkit-linear-gradient(
          -45deg,
          rgba(46, 202, 127, 0.15) 0%,
          rgba(46, 202, 127, 0.01) 100%
        );
        width: 30px;
        height: 28px;
        content: '';
      }
    }
    &::after {
      right: -2rem;
      position: relative;
      content: '';
      display: block;
      height: 1px;
      background: -moz-radial-gradient(
        right,
        ellipse cover,
        #ddd 0%,
        rgba(255, 255, 255, 0) 70%
      );
      background: -webkit-radial-gradient(
        right,
        ellipse cover,
        #ddd 0%,
        rgba(255, 255, 255, 0) 70%
      );
      background: radial-gradient(
        ellipse at right,
        #ddd 0%,
        rgba(255, 255, 255, 0) 70%
      );
    }
  }
</style>

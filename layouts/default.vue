<template>
  <div>
    <slot />
  </div>
</template>
<script setup lang="ts">
const i18nHead = useLocaleHead({
  addDirAttribute: true,
});
useHead({
  htmlAttrs: {
    dir: i18nHead.value.htmlAttrs!.dir
    }
})
</script>
<style>
  html {
    font-family: 'IRANSans', 'Source Sans Pro', -apple-system,
      BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
      sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
  }

  /* bg bubbles */
  .background.gradient {
    background: #50a3a2;
    background: -webkit-linear-gradient(bottom left, #50a3a2 0%, #78cc6d 100%);
    background: linear-gradient(to bottom left, #50a3a2 0%, #78cc6d 100%);
    position: fixed;
    overflow: hidden;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .bg-bubbles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .bg-bubbles li {
    position: absolute;
    list-style: none;
    display: block;
    width: 80px;
    height: 80px;
    background-color: rgba(255, 255, 255, 0.1);
    bottom: -320px;
    -webkit-animation: square 50s infinite;
    animation: square 50s infinite;
    -webkit-transition-timing-function: linear;
    transition-timing-function: linear;
    border-radius: 4px;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    -khtml-border-radius: 4px;
  }

  .bg-bubbles li:nth-child(1) {
    left: 10%;
  }

  .bg-bubbles li:nth-child(2) {
    left: 20%;
    width: 160px;
    height: 160px;
    -webkit-animation-delay: 2s;
    animation-delay: 2s;
    -webkit-animation-duration: 34s;
    animation-duration: 34s;
  }

  .bg-bubbles li:nth-child(3) {
    left: 25%;
    -webkit-animation-delay: 4s;
    animation-delay: 4s;
  }

  .bg-bubbles li:nth-child(4) {
    left: 40%;
    width: 120px;
    height: 120px;
    -webkit-animation-duration: 44s;
    animation-duration: 44s;
  }

  .bg-bubbles li:nth-child(5) {
    left: 70%;
  }

  .bg-bubbles li:nth-child(6) {
    left: 80%;
    width: 240px;
    height: 240px;
    -webkit-animation-delay: 3s;
    animation-delay: 3s;
  }

  .bg-bubbles li:nth-child(7) {
    left: 32%;
    width: 320px;
    height: 320px;
    -webkit-animation-delay: 7s;
    animation-delay: 7s;
  }

  .bg-bubbles li:nth-child(8) {
    left: 55%;
    width: 40px;
    height: 40px;
    -webkit-animation-delay: 15s;
    animation-delay: 15s;
    -webkit-animation-duration: 80s;
    animation-duration: 80s;
  }

  .bg-bubbles li:nth-child(9) {
    left: 25%;
    width: 20px;
    height: 20px;
    -webkit-animation-delay: 2s;
    animation-delay: 2s;
    -webkit-animation-duration: 80s;
    animation-duration: 80s;
  }

  .bg-bubbles li:nth-child(10) {
    left: 90%;
    width: 320px;
    height: 320px;
    -webkit-animation-delay: 22s;
    animation-delay: 22s;
  }

  @-webkit-keyframes square {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    100% {
      -webkit-transform: translateY(-1500px) rotate(600deg);
      transform: translateY(-1500px) rotate(600deg);
    }
  }

  @keyframes square {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    100% {
      -webkit-transform: translateY(-1500px) rotate(600deg);
      transform: translateY(-1500px) rotate(600deg);
    }
  }

  /* scrollbar */

  /* width */
  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 1px grey;
    border-radius: 5px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: gray;
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: darkgray;
  }
</style>

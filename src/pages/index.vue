<template>
  <div class="h-screen flex justify-center items-center">
    <div class="background gradient">
      <ul class="bg-bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div
      class="container mx-auto max-w-screen-xl md:max-w-screen-lg lg:h-5/6 xl:h-4/6 h-full relative flex flex-col lg:flex-row"
    >
      <div
        class="top-menu lg:ml-2 z-30 lg:top-4 lg:relative lg:w-20 lg:h-auto fixed w-full max-h-20 h-20"
      >
        <div class="flex lg:flex-col h-full">
          <a
            :class="[$style.menuBtn, 'w-20']"
            href="#"
            aria-label="menu"
            class="bg-white lg:w-full w-20 px-2 py-8 text-center inline-block lg:rounded hover:text-green-500 relative h-20 lg:h-auto"
          >
            <span></span>
          </a>
          <ul
            :class="[
              'flex lg:flex-col flex-1 bg-white items-center lg:rounded lg:mt-2',
              $style.topMenuUl,
            ]"
          >
            <li
              v-for="tab in tabs"
              :key="tab.label"
              class="px-2 py-4 text-center w-full h-full relative"
            >
              <a
                href=""
                :class="[
                  'hover:text-green-500',
                  { 'text-green-500': tab.component === currentTab },
                ]"
                :aria-label="$t(tab.label)"
                @click.prevent="changeTab(tab.component)"
              >
                <i :class="tab.icon"></i>
                <small class="whitespace-nowrap block">
                  {{ $t(tab.label) }}
                </small>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <profile-card @changeTab="changeTab" />
      <div
        :class="[
          'lg:w-3/5 w-full my-4 relative lg:overflow-x-hidden',
          $style.innerCard,
        ]"
      >
        <transition
          name="innerCardTransition"
          :enter-active-class="`animate__animated
            ${
              ['lg', 'xl', '2xl'].includes($screen.breakpoint)
                ? 'animate__fadeInRight'
                : 'animate__fadeIn'
            }
          `"
          :leave-active-class="`animate__animated
          ${
            ['lg', 'xl', '2xl'].includes($screen.breakpoint)
              ? 'animate__fadeOutRight'
              : 'animate__fadeOut'
          }
          `"
        >
          <component :is="currentTab" :key="currentTab" />
        </transition>
      </div>
    </div>
  </div>
</template>
<i18n lang="json">
{
  "en": {},
  "fa": {
    "About": "درباره من",
    "Resume": "رزومه من",
    "Works": "کارهای من",
    "Contact": "ارتباط با من"
  }
}
</i18n>
<script>
  export default {
    data: () => ({
      tabs: [
        { component: 'about-me', label: 'About', icon: 'fa fa-user-tie' },
        { component: 'my-resume', label: 'Resume', icon: 'fa fa-file-alt' },
        { component: 'my-works', label: 'Works', icon: 'fa fa-paint-brush' },
        { component: 'contact-me', label: 'Contact', icon: 'far fa-at' },
      ],
      currentTab: 'about-me',
    }),
    methods: {
      changeTab(tab) {
        this.currentTab = tab;
      },
    },
  };
</script>
<style module lang="scss">
  @mixin gutterGradiant($ellipsis, $horizontal: true) {
    &::after {
      content: '';
      position: absolute;
      @if $horizontal {
        right: 0;
        top: 100%;
        width: 100%;
        height: 1px;
      } @else {
        right: 100%;
        top: 0;
        width: 1px;
        height: 100%;
      }

      background: radial-gradient(
        ellipse at $ellipsis,
        #ddd 0%,
        rgba(255, 255, 255, 0) 70%
      );
    }
  }
  :global {
    .centerEllipsisGradiantGutter {
      @include gutterGradiant(center);
    }
    .bottomEllipsisGradiantGutter {
      @include gutterGradiant(bottom, $horizontal: false);
    }
    .topEllipsisGradiantGutter {
      @include gutterGradiant(top, $horizontal: false);
    }
  }

  .topMenuUl {
    li:not(:last-child) {
      @include gutterGradiant(bottom, $horizontal: false);
      @screen lg {
        @include gutterGradiant(left);
      }
    }
  }
  .menuBtn {
    span {
      margin-left: -13px;
      margin-top: -1px;
      position: absolute;
      left: 50%;
      top: 50%;
      display: block;
      width: 26px;
      height: 2px;
      background: #323232;
      transition: all 0.3s ease 0s;
      -moz-transition: all 0.3s ease 0s;
      -webkit-transition: all 0.3s ease 0s;
      -o-transition: all 0.3s ease 0s;
      &::after {
        content: '';
        position: absolute;
        right: 0;
        top: auto;
        bottom: -7px;
        width: 60%;
        height: 100%;
        background: #323232;
        transition: all 0.3s ease 0s;
        -moz-transition: all 0.3s ease 0s;
        -webkit-transition: all 0.3s ease 0s;
        -o-transition: all 0.3s ease 0s;
      }
      &::before {
        content: '';
        position: absolute;
        right: 0;
        top: -7px;
        width: 80%;
        height: 100%;
        background: #323232;
        transition: all 0.3s ease 0s;
        -moz-transition: all 0.3s ease 0s;
        -webkit-transition: all 0.3s ease 0s;
        -o-transition: all 0.3s ease 0s;
      }
    }
    &:hover {
      span {
        background: rgb(16, 185, 129);
        &::after,
        &::before {
          background: rgb(16, 185, 129);
          width: 100%;
        }
      }
    }
  }
</style>

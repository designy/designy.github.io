<template>
  <div
    class="bg-white rounded rounded-tr-none rounded-br-none h-full w-full lg:absolute overflow-auto"
  >
    <heading-title first-word="کار" another-words="های من" />
    <div class="p-3">
      <p>فعلا یکم بازی کنین با این به زودی کارهامو میذارم:دی</p>
      <section class="w-full">
        <div class="relative -mt-16 w-full">
          <img
            id="crash-ride"
            class="crash-cymbal"
            src="https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/img/crash.png"
            alt="Crash cymbal"
          />
          <img
            id="hihat-top"
            class="hihat-top-cymbal"
            src="https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/img/hihat-top.png"
            alt="Hi Hat cymbal"
          />
          <div data-key="74" class="key snare">
            <kbd>J</kbd>
          </div>
          <div data-key="66" class="key kick">
            <kbd>B</kbd>
          </div>
          <div data-key="86" class="key kick2">
            <kbd>V</kbd>
          </div>
          <div data-key="72" class="key tom-high">
            <kbd>H</kbd>
          </div>
          <div data-key="71" class="key tom-mid">
            <kbd>G</kbd>
          </div>
          <div data-key="70" class="key tom-low">
            <kbd>F</kbd>
          </div>
          <div data-key="69" class="key crash">
            <kbd>E</kbd>
          </div>
          <div data-key="82" class="key ride">
            <kbd>R</kbd>
          </div>
          <div data-key="73" class="key hihat-open">
            <kbd>I</kbd>
          </div>
          <div data-key="75" class="key hihat-close">
            <kbd>K</kbd>
          </div>
          <img
            class="drum-kit"
            src="https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/img/drum-kit.png"
            alt="Drum Kit"
          />
        </div>
        <ul class="grid grid-rows-2 grid-flow-col gap-2 h-28 mt-16">
          <li class="flex flex-col items-center">
            <kbd class="key-code">E</kbd>
            <span class="key-sound">Crash</span>
          </li>
          <li class="flex flex-col items-center">
            <kbd class="key-code">R</kbd>
            <span class="key-sound">Ride</span>
          </li>
          <li class="flex flex-col items-center">
            <kbd class="key-code">F</kbd>
            <span class="key-sound">Floor tom</span>
          </li>
          <li class="flex flex-col items-center">
            <kbd class="key-code">G</kbd>
            <span class="key-sound">Mid tom</span>
          </li>
          <li class="flex flex-col items-center">
            <kbd class="key-code">H</kbd>
            <span class="key-sound">High tom</span>
          </li>
          <li class="flex flex-col items-center">
            <kbd class="key-code">V, B</kbd>
            <span class="key-sound">Kick</span>
          </li>
          <li class="flex flex-col items-center">
            <kbd class="key-code">J</kbd>
            <span class="key-sound">Snare</span>
          </li>
          <li class="flex flex-col items-center">
            <kbd class="key-code">I</kbd>
            <span class="key-sound">Hi-Hat Open</span>
          </li>
          <li class="flex flex-col items-center">
            <kbd class="key-code">K</kbd>
            <span class="key-sound">Hi-Hat Closed</span>
          </li>
        </ul>
      </section>
      <audio
        data-key="74"
        src="https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/snare.wav"
      ></audio>
      <audio
        data-key="66"
        src="https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/kick.wav"
      ></audio>
      <audio
        data-key="86"
        src="https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/kick.wav"
      ></audio>
      <audio
        data-key="72"
        src="https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/tom-high.wav"
      ></audio>
      <audio
        data-key="71"
        src="https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/tom-mid.wav"
      ></audio>
      <audio
        data-key="70"
        src="https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/tom-low.wav"
      ></audio>
      <audio
        data-key="69"
        src="https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/crash.wav"
      ></audio>
      <audio
        data-key="82"
        src="https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/ride.wav"
      ></audio>
      <audio
        data-key="73"
        src="https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/hihat-open.wav"
      ></audio>
      <audio
        data-key="75"
        src="https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/hihat-close.wav"
      ></audio>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
  export default {
    name: 'MyWorks',
    mounted() {
      {
        const playingClass = 'playing',
          crashRide = document.getElementById('crash-ride'),
          hiHatTop = document.getElementById('hihat-top');

        const animateCrashOrRide = () => {
          crashRide.style.transform = 'rotate(0deg) scale(1.5)';
        };

        const animateHiHatClosed = () => {
          hiHatTop.style.top = '149px';
        };

        const playSound = (e) => {
          const keyCode = e.keyCode,
            keyElement = document.querySelector(`div[data-key="${keyCode}"]`);

          if (!keyElement) return;

          const audioElement = document.querySelector(
            `audio[data-key="${keyCode}"]`
          );
          audioElement.currentTime = 0;
          audioElement.play();

          switch (keyCode) {
            case 69:
            case 82:
              animateCrashOrRide();
              break;
            case 75:
              animateHiHatClosed();
              break;
          }

          keyElement.classList.add(playingClass);
        };

        const removeCrashRideTransition = (e) => {
          if (e.propertyName !== 'transform') return;

          e.target.style.transform = 'rotate(-7.2deg) scale(1.5)';
        };

        const removeHiHatTopTransition = (e) => {
          if (e.propertyName !== 'top') return;

          e.target.style.top = '144px';
        };

        const removeKeyTransition = (e) => {
          if (e.propertyName !== 'transform') return;

          e.target.classList.remove(playingClass);
        };

        const drumKeys = Array.from(document.querySelectorAll('.key'));

        drumKeys.forEach((key) => {
          key.addEventListener('transitionend', removeKeyTransition);
        });

        crashRide.addEventListener('transitionend', removeCrashRideTransition);
        hiHatTop.addEventListener('transitionend', removeHiHatTopTransition);

        window.addEventListener('keydown', playSound);
      }
    },
  };
</script>
<style>

.drum-kit {
	width: 100%;
	position: relative;
}

.crash-cymbal {
	position: absolute;
	top: 95px;
    left: 64px;
    transform: rotate(-7.2deg) scale(1.5);
    transition: all ease-in-out .042s;
}

.hihat-top-cymbal {
	position: absolute;
    top: 144px;
    right: 57px;
    transform: scale(1.2);
    z-index: 0;
    transition: all ease-in-out .042s;
}

.key {
	display: inline-block;
	transition: all ease-in-out .042s;
	position: absolute;
	background: #eaeaea;
    width: 32px;
    text-align: center;
    border-radius: 4px;
    color: #444;
    z-index: 2;
}

.key.kick {
	top: 355px;
    right: 235px;
}

.key.kick2 {
    top: 355px;
    right: 275px;
}

.key.snare {
	right: 130px;
    top: 245px;
}

.key.tom-high {
	right: 205px;
    top: 210px;
}

.key.tom-mid {
	left: 197px;
    top: 200px;
}

.key.tom-low {
	top: 320px;
    left: 133px;
}

.key.crash {
	top: 80px;
    left: 75px;
}

.key.ride {
	left: 165px;
    top: 87px;
}

.key.hihat-open {
	right: 165px;
    top: 134px;
}

.key.hihat-close {
	right: 60px;
    top: 136px;
}

.playing {
	transform: scale(1.12);
}



.key-code {
	  color: #444;
    background-color: #eaeaea;
    padding: 5px 10px;
    border-radius: 4px;
}

.key-sound {
	font-family: 'Handlee', cursive;
	vertical-align: middle;
}
</style>

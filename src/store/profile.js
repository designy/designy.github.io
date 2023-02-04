export const getters = {
  aboutMeTips: (state) => state.aboutMeTips,
  workExperiences: (state) => state.workExperiences,
  aboutMeParagraph: (state) => state.aboutMeParagraph,
  phoneNumber: (state) => state.phoneNumber,
  socials: (state) => state.socials,
  name: (state) => state.name,
  emoji: (state) => state.emoji,
  image: (state) => state.image,
  aboutMeSentences: (state) => state.aboutMeSentences,
};

export const mutations = {
  // setUserInfo(state, data) {
  //   for (const [key, value] of Object.entries(data)) {
  //     state.info[key] = value;
  //   }
  // },
};

export const actions = {
  // setUserInfo({ commit }, data) {
  //   commit('setUserInfo', data);
  // },
  // setUserBalance({ commit }) {
  //   userBalanceInfoAPI()
  //     .then(response => {
  //       const { data } = response;
  //       if (data) {
  //         commit('setUserInfo', { balance: data.balance });
  //       }
  //     })
  //     .catch(e => {
  //       console.error(e);
  //     });
  // },
};
export const state = () => ({
  name: 'علی اسماعیلی',
  image: '/images/me.jpg',
  emoji: '&#127828',
  aboutMeSentences: [
    'برنامه‌نویس',
    'توسعه دهنده فرانت‌اند',
    'چپترلید فرانت‌اند',
    'تیم‌لید',
  ],
  aboutMeParagraph: `
  من علی اسماعیلی هستم. <br />
  یک فرانت‌اند دولوپر از ایران.
  <br />
  در حال حاضر در شرکت یکتانت مشغول به کار هستم.
`,
  aboutMeTips: [
    {
      label: 'محل اقامت',
      value: 'ایران',
    },
    {
      label: 'وضعیت اشتغال',
      value: 'مشغول',
    },
    {
      label: 'آدرس',
      value: 'تهران',
    },
  ],
  phoneNumber: '09202062826',
  workExperiences: [
    {
      logo: '/images/logo/yektanet.png',
      name: 'یکتانت',
      website: 'https://yektanet.com',
      description: `
      از سال ۹۵ وارد مجموعه یکتانت شدم و اولین کارهام رو مثل تقریباً
      همه روی پروژه‌ای انجام دادم که هیچ‌وقت به مرحله Production
      نرسید:دی. اون پروژه که اسمش
      <strong> چطور پرو </strong>
      بود یه پنل حرفه‌ای برای
      <a
        href="https://chetor.com"
        class="text-green-500 underline"
        target="_blank"
      >
        وبسایت چطور
      </a>
      بود.
      <br />
      بعد از اون همزمان کار روی پروژه‌های
      <a
        href="https://najva.com"
        class="text-green-500 underline"
        target="_blank"
      >
        نجوا
      </a>
      و
      <a
        href="https://yektanet.com"
        class="text-green-500 underline"
        target="_blank"
      >
        یکتانت
      </a>
      رو شروع کردیم و من هم عضو تیم اولیه این پروژه‌ها بودم و کدهای
      اولیه این پروژه‌ها با جاوااسکریپت رو پیاده‌سازی کردم. <br />
      بعد‌ترها پنل‌هامون رو که با jquery زده بودیم رو با vue بازنویسی
      کردیم و کلی امکانات جذاب بهشون اضافه کردیم. <br />
      پروژه‌های مختلفی مثل
      <a
        href="https://triboon.net"
        class="text-green-500 underline"
        target="_blank"
      >
        تریبون
      </a>
      و
      <a
        href="https://jaryan.net"
        class="text-green-500 underline"
        target="_blank"
      >
        جریان
      </a>
      و ... رو شروع کردیم و در حال حاضر روی پروژه تریبون کار می‌کنم.
      `,
    },
    {
      logo: '/images/logo/arsh-logo.jpg',
      name: 'عرش',
      website: 'https://arsh.co',
      description: `
      شروع کارم رو در قالب کارآموزی با شرکت عرش گذروندم و بعد از اون چون دوست داشتم بیشتر یاد بگیرم حدود ۱.۵ سال باهمدیگه همکاری کردیم.
      <br>
       بعد از یادگیری پایتون و جنگو، توی پروژه‌های

       <a
       href="https://baadoom.ir/"
       class="text-green-500 underline"
       target="_blank"
     >
       بادوم
     </a>
       و فراکتال توی این شرکت همکاری کردم و البته بعد از نوشتن یه کراولر خبر و یه کراولر توییتر، بیشتر رفتم سمت فرانت‌اند و کارم رو توی اون پوزیشن ادامه دادم.
      `,
    },
  ],
  socials: [
    {
      network: 'telegram',
      link: 'https://t.me/aesmaeili777/',
    },
    {
      network: 'instagram',
      link: 'https://www.instagram.com/a.esmaeili/',
    },
    {
      network: 'twitter',
      link: 'https://twitter.com/aliesmaeili747/',
    },
    {
      network: 'linkedin',
      link: 'https://www.linkedin.com/in/ali-esmaeili/',
    },
    {
      network: 'github',
      link: 'https://github.com/designy',
    },
  ],
});

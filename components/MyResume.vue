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

<script setup lang="ts">
  const workExperiences :{logo: string, name: string, website: string, description: string}[] = [
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
      ];
</script>

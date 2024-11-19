<template>
<section class="footer">
  <div class="container mx-auto p-1">
    <div class="w-full h-auto">
      <div class="flex flex-row items-center w-full justify-between sm:grid sm:grid-cols-2 md:grid md:grid-cols-4 lg:flex lg:flex-row lg:items-center lg:justify-between lg:w-full xl:flex xl:flex-row xl:items-center xl:w-full xl:justify-between">
        <div class="w-4/12 sm:w-full h-[200px] flex flex-col">
          <div class="flex flex-row items-center">
            <NuxtImg src="/image/images.png" alt="" format="webp" quality="80" loading="lazy" class="w-[60px] h-[60px] mx-8"/>
            <div class="flex flex-col">
              <p class="text-[ff00a6] my-2">اسنپ فود</p>
              <p class="text-[12px]">تجربه سفارش غذا، از زودفود تا اسنپ‌فود</p>
            </div>
          </div>
          <div class="flex flex-row items-center justify-center my-8">
            <font-awesome-icon :icon="['fab','twitter']" class="text-slate-600 text-[20px]  p-2 rounded-full shadow-lg mx-2"/>
            <font-awesome-icon :icon="['fab','instagram']" class="text-slate-600 text-[20px]  p-2 rounded-full shadow-lg mx-2"/>
            <font-awesome-icon :icon="['fab','youtube']" class="text-slate-600 text-[20px]  p-2 rounded-full shadow-lg mx-2"/>
            <font-awesome-icon :icon="['fab','linkedin']" class="text-slate-600 text-[20px]  p-2 rounded-full shadow-lg mx-2"/>
          </div>
        </div>
        <div class="w-2/12 sm:w-full h-[200px]">
          <ul class="flex flex-col">
            <li class="p-2 text-slate-600 text-[12px]">درباره اسنپ فود</li>
            <li class="p-2 text-slate-600 text-[12px]">فرصت های شغلی</li>
            <li class="p-2 text-slate-600 text-[12px]">وبلاگ</li>
            <li class="p-2 text-slate-600 text-[12px]">قواننین سایت</li>
            <li class="p-2 text-slate-600 text-[12px]">حریم خصوصی</li>
            <li class="p-2 text-slate-600 text-[12px]">ثبت نام فروشندگان</li>
          </ul>
        </div>
        <div class="w-2/12 sm:w-full h-[200px]">
          <ul class="flex flex-col">
            <li class="p-2 text-slate-600 text-[12px]">تماس با اسنپ فود</li>
            <li class="p-2 text-slate-600 text-[12px]">پرسش های متداول</li>
            <li class="p-2 text-slate-600 text-[12px]">ثبت برنامه</li>
            <li class="p-2 text-slate-600 text-[12px]">اپلیکیشن موبایل</li>
          </ul>
        </div>
        <div class="w-2/12 sm:w-full h-[200px]">
          <NuxtImg  src="/image/senf.png" alt="" format="webp" loading="lazy" quality="80" class="w-[80px] h-[80px]"/>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script setup>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>

<style scoped>

</style>
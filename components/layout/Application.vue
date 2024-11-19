<template>
<section class="application bg-slate-100 h-[500px] p-4 my-4">
  <div class="container mx-auto p-1">
    <div class="w-full h-auto">
  <div class="flex flex-row items-center justify-around w-full sm:grid sm:grid-cols-1 md:grid md:grid-cols-1 lg:flex lg:flex-row lg:items-center lg:justify-around lg:w-full xl:flex xl:flex-row xl:items-center xl:justify-around xl:w-full 2xl:flex 2xl:flex-row 2xl:items-center 2xl:justify-around 2xl:w-full">
    <div class="w-5/12 sm:w-full md:w-full lg:w-5/12 flex flex-col xl:w-5/12 2xl:w-5/12">
      <p class="text-[30px] sm:text-[20px] my-8">اپلیکیشن اسنپ‌فود</p>
      <p class="text-slate-600 my-4" style="line-height: 30px">با اپلیکیشن اسنپ‌فود به راحتی و با چند کلیک ساده می‌توانید رستوران‌ها، کافه‌ها، شیرینی‌فروشی‌ها و سوپرمارکت‌های نزدیک خودتان را جست‌و‌جو کرده و از تجربه سفارش آسان از اسنپ‌فود لذت ببرید.</p>
      <div class="flex flex-col">
        <p class="text-[13px] my-4 text-slate-600"> برای دریافت لینک دانلود اپلیکیشن، شماره موبایلتان رو وارد کنید </p>
        <div class="relative w-8/12 sm:w-full">
        <input type="text" class="sm:w-full p-2 outline-none w-full mx-auto border border-1 border-slate-200 shadow-xl" placeholder=" ******09">
          <div class="absolute bottom-[5px] left-[10px]">
            <button type="button" class="px-4 py-2 rounded-xl text-slate-100 text-[13px] bg-[#ff00a6]">دریافت لینک</button>
          </div>
        </div>
      </div>
      <div class="flex flex-row items-center justify-between">

      </div>
    </div>
    <div class="w-4/12 my-4 sm:w-full md:w-full lg:w-4/12 xl:w-4/12 2xl:w-4/12">
      <NuxtImg src="/image/img_app_mockup@2x.png" alt="" format="webp" loading="lazy" quality="80" class="w-full h-[570px] sm:w-[300px] sm:h-[250px] sm:mx-auto lg:h-[500px] xl:w-full xl:h-[550px] 2xl:w-full 2xl:h-[550px]"/>
    </div>
  </div>
    </div>
  </div>
</section>
</template>

<script setup>

</script>

<style scoped>

</style>
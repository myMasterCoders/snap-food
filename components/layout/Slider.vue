<template>
<section class="slider">
  <div class="container-fluid p-2">
    <div class="w-full h-auto">
      <div class="flex flex-row items-center justify-between sm:grid sm:grid-cols-1 md:grid md:grid-cols-1 lg:flex lg:flex-row lg:items-center lg:justify-between xl:flex xl:flex-row xl:items-center xl:justify-between 2xl:flex 2xl:flex-row 2xl:items-center 2xl:justify-between">
        <div class="w-6/12 sm:w-full md:w-full lg:w-6/12 xl:w-6/12  2xl:w-6/12 flex flex-col">
          <div class="flex flex-row sm:text-center sm:justify-center">
          <p class="text-slate-700 text-[50px] sm:text-center sm:text-[30px] font-bold">سفارش آنلاین</p>
            <TransitionExpand :scale="0.8" origin="top right">
              <span class="text-[#ff00a6] text-center sm:text-center font-semibold text-[50px] mx-4 duration-500 transition sm:text-[30px]">{{text[counter]}}</span>
            </TransitionExpand>
          </div>
          <p class="text-slate-600 sm:text-center text-[15px]">سفارش آنلاین غذا ، میوه، نان، شیرینی و ...</p>
          <div class="relative  my-8">
            <input type="text" class="px-4 py-4 sm:w-full text-start shadow-xl outline-none border border-1 border-slate-300 w-10/12 mx-auto rounded-r-full rounded-l-full text-slate-400" placeholder="ابتدا ادرستان را انتخاب کنید...">
            <div class="absolute w-[50px] h-[50px] bg-[#ff00a6] rounded-full px-4 py-2 left-[110px] top-[5px] sm:left-[10px]">
              <font-awesome-icon :icon="['fas','search']" class="text-slate-100 text-center px-[2px] py-2"/>
            </div>
          </div>
        </div>
        <div class="w-6/12 sm:w-full md:w-full lg:w-6/12 xl:w-6/12 2xl:w-6/12 ">
          <NuxtImg src="/image/hero-image.png" alt="" format="webp" loading="lazy" quality="80" class="w-full h-full md:h-[350px] lg:w-full lg:h-full"/>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script setup>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {TransitionExpand} from "@morev/vue-transitions";
const text=reactive(['شیرینی','نان','خواربار','سبزیجات','میوه'])
const counter=ref(Number(0))
let timer;
onMounted(()=>{
  timer=setInterval(()=>{
    counter.value++;
   if(counter.value > text.length){
     counter.value=0
   }
   if(counter.value <=0){
     counter.value=0
   }
  },3000)
})
  onUnmounted(()=>{
    clearInterval(timer)
  })
</script>

<style scoped>

</style>
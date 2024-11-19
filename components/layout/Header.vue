<template>
<section class="header relative">
  <div class="container mx-auto p-2">
    <div class="w-full h-auto">
      <TransitionScale  origin="top right">
      <div  class="duration-500 transition absolute w-full right-[5px] lg:invisible" style="z-index: 10">
        <font-awesome-icon @click="showSlide" :icon="['fas', flag ? 'times' : 'bars']" class="relative duration-500 transition text-slate-900 text-start p-4 leading-1"/>
        <div v-if="flag" :style="{transform:`translateX(${transAction})px`}" class=" relative duration-500 transition p-2 w-[150px] h-[250px]" style="z-index: 20">
           <ul class="flex flex-col bg-slate-200 w-[500px] transition-all duration-500 motion">
            
             <NuxtLink to="/"><li @click="flag=false" class="p-2 cursor-pointer hover:bg-slate-900 hover:text-slate-100 duration-500 transition text-slate-900 rounded-xl text-[13px] bg-slate-200 shadow-xl my-2">صفحه اصلی</li></NuxtLink>
             <NuxtLink to="/menu"><li @click="flag=false" class="p-2 cursor-pointer hover:bg-slate-900 hover:text-slate-100 duration-500 transition text-slate-900 rounded-xl text-[13px] bg-slate-200 shadow-xl my-2">منو محصولات</li></NuxtLink>
             <NuxtLink to="/about"><li @click="flag=false" class="p-2 cursor-pointer hover:bg-slate-900 hover:text-slate-100 duration-500 transition text-slate-900 rounded-xl text-[13px] bg-slate-200 shadow-xl my-2">درباره ما</li></NuxtLink>
             <NuxtLink to="/contact"><li @click="flag=false" class="p-2 cursor-pointer hover:bg-slate-900 hover:text-slate-100 duration-500 transition text-slate-900 rounded-xl text-[13px] bg-slate-200 shadow-xl my-2">تماس با ما</li></NuxtLink>
           </ul>
        </div>
      </div>
      </TransitionScale>
      <div class="flex flex-row items-center justify-between p-4 w-full sm:invisible md:invisible lg:visible lg:flex lg:flex-row lg:items-center lg:justify-between xl:flex xl:flex-row xl:items-center xl:w-full xl:justify-between 2xl:flex 2xl:flex-row 2xl:items-center 2xl:justify-between">
      <div class="w-6/12 flex flex-row items-center lg:w-7/12 xl:w-6/12 2xl:w-6/12">
        <NuxtLink to="/">
        <NuxtImg src="/image/images.png" alt="" format="webp" loading="lazy" quality="80" class="w-[150px] h-[80px] lg:w-[100px] lg:h-[80px] xl:w-[150px] xl:h-[80px] p-2 mx-2 rounded-xl"/>
        </NuxtLink>
        <ul class="flex flex-row items-center justify-between">
          <NuxtLink to="/">
          <li class="p-2 text-slate-800 text-[13px] cursor-pointer">صفحه اصلی</li>
          </NuxtLink>
          <NuxtLink to="/menu">
          <li class="p-2 text-slate-800 text-[13px] cursor-pointer">منو محصولات</li>
          </NuxtLink>
          <NuxtLink to="/about">
          <li class="p-2 text-slate-800 text-[13px] cursor-pointer">درباره ما</li>
          </NuxtLink>
          <NuxtLink to="/contact">
          <li class="p-2 text-slate-800 text-[13px] cursor-pointer">تماس با ما</li>
          </NuxtLink>
        </ul>
      </div>
        <div class="w-3/12 flex flex-row items-center lg:w-4/12 xl:w-3/12 2xl:w-3/12 relative">
          <ClientOnly>
          <NuxtLink to="/cart">
          <font-awesome-icon :icon="['fas','cart-plus']" class="text-[#ff00a6] mx-4 text-[15px]"/>
            <div class="absolute text-center top-[0px] right-[5px] w-[15px] h-[15px] bg-[#ff00a6] rounded-full p-2">
              <p class="absolute top-[-3px] right-[3px]">{{sizeProducts}}</p>
            </div>
          </NuxtLink>
          </ClientOnly>
          <NuxtLink to="/saler">
          <p class="text-slate-900 mx-4 text-[15px]">
            ثبت نام فروشندگان
          </p>
          </NuxtLink>
          <div v-if="user">
            <NuxtLink to="/profile">
              <button type="button" class="bg-[#ff00a6] px-2 py-2 rounded-lg text-slate-100 text-[15px]">پنل کاربری</button>
            </NuxtLink>
          </div>
          <div v-else>
          <NuxtLink to="/Login">
          <button type="button" class="bg-[#ff00a6] px-2 py-2 rounded-lg text-slate-100 text-[15px]">ورود یا عضوبت</button>
          </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
const {user}=authUsers();
import {useCounterStore} from '../../store/useStore.js';
const store=useCounterStore();
const flag=ref(false)
const transAction=ref(160)
const sizeProducts=computed(()=>{
  return store.productsCounter;
})
function showSlide(){
  flag.value=!flag.value;
  transAction.value=0
}
</script>

<style scoped>
.parent::before{
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
}
.motion{
  animation: myAnimate 2s;
}
@keyframes myAnimate{
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
</style>
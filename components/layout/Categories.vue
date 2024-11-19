<template>
<section class="categories">
  <div class="container mx-auto p-1">
    <div class="w-full h-auto">
      <h1 class="text-start text-slate-800 my-4">دسته بندی ها</h1>
      <div class="flex flex-row items-center w-full justify-between flex-wrap">
       <div v-for="category in listCategories" :key="category.id" class="flex flex-col w-2/12 sm:w-4/12 lg:w-2/12 lg:flex-col xl:w-2/12 lg:flex xl:flex-col 2xl:w-2/12 2xl:flex 2zl:flex-col">
         <NuxtImg :src="`${category.image}`" alt="" format="webp" loading="lazy" quality="80" class="w-full h-[120px] p-2 rounded-2xl my-4"/>
         <div class="flex flex-row items-center w-[100px] shadow-xl">
         <p class="text-[13px] p-2 rounded-xl ">{{category.title}}</p>
           <font-awesome-icon :icon="['fas','angle-left']" class="text-[#ff00a6] text-[13px]"/>
         </div>
       </div>
      </div>
    </div>
  </div>
</section>
</template>

<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const listCategories=reactive([
  {id:1,image:"/image/ca-1.jpg",title:"ایرانی",category:""},
  {id:2,image:"/image/ca-2.jpg",title:"فست فود",category:""},
  {id:3,image:"/image/ca-3.jpg",title:"کباب",category:""},
  {id:4,image:"/image/ca-4.jpg",title:"پیتزا",category:""},
  {id:5,image:"/image/ca-5.jpg",title:"برگر",category:""},
  {id:6,image:"/image/ca-6.jpg",title:"ساندویچ",category:""},
  {id:7,image:"/image/ca-7.jpg",title:"سوخاری",category:""},
  {id:8,image:"/image/ca-8.jpg",title:"پاستا",category:""},
  {id:9,image:"/image/ca-9.jpg",title:"سالاد",category:""},
  {id:10,image:"/image/ca-10.jpg",title:"دریایی",category:""},
  {id:11,image:"/image/ca-1.jpg",title:"بین امللی",category:""},
  {id:12,image:"/image/ca-2.jpg",title:"دریایی",category:""},
])
</script>

<style scoped>

</style>
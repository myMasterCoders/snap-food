<template>
<section class="products">
  <div class="container mx-auto p-2">
    <div class="w-full h-auto mx-auto sm:grid sm:grid-cols-1 md:grid md:grid-cols-1 lg:w-full xl:w-full 2xl:w-full">
      <div class="w-6/12  sm:w-full md:w-full lg:w-6/12 lg:flex lg:flex-row lg:items-center lg:justify-between lg:mx-auto flex flex-row justify-between mx-auto my-4 xl:w-6/12 2xl:w-6/12">
      <div v-for="(product,index) in products.data.tabList" :key="product.id">
        <p @click="getNums(index)" :class="{bgBlack : counter === index}" class="px-4 py-1 cursor-pointer text-[15px] rounded-xl">{{product}}</p>
      </div>
      </div>
      <div class="w-full  sm:w-full md:w-10/12 lg:w-11/12 mx-auto lg:flex lg:flex-row lg:items-center lg:justify-around lg:flex-wrap flex flex-row items-center justify-around flex-wrap xl:w-full 2xl:w-full">
        <div v-for="product in products.data.tabPanel[counter]" :key="product.id" class="w-4/12 sm:w-10/12 lg:w-3/12 bg-slate-100 xl:w-4/12 2xl:w-4/12 p-4 rounded-xl">
          <img src="/image/not-found.jpg" v-img="`${product.primary_image}`" alt="" class="w-full h-[150px] md:h-[200px] lg:w-full lg:h-[150px] xl:h-[200px] 2xl:h-[200px] rounded-xl">
          <NuxtLink :to="`/products/${product.slug}`">
          <p class="text-slate-900 my-4">{{product.name}}</p>
          </NuxtLink>
          <p class="text-[13px]">{{product.description}}</p>
          <div v-if="product.is_sale">
            <del>{{numberFormat(product.price)}} تومان</del>
            <p>{{numberFormat(product.sale_price)}} تومان</p>
          </div>
          <div v-else>
            <p class="my-4">{{numberFormat(product.price)}} تومان</p>
          </div>
          <div class="flex flex-row items-center justify-between">
            <button @click="addProduct(product)" type="button" class="bg-green-600 px-4 py-2 rounded-xl text-white text-[12px]">
              افزودن به سبد خرید
            </button>
            <font-awesome-icon :icon="['fas','cart-plus']" class="bg-orange-400 p-2 rounded-full text-slate-100 "/>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {useCounterStore} from '../../store/useStore.js';
const store=useCounterStore();
const {public:{baseUrl}}=useRuntimeConfig();
const {data:products}=await useFetch(`${baseUrl}/products/products-tabs`);
const counter=ref(0)
function getNums(data){
  counter.value=data;
}
function addProduct(data){
  store.removeItems(data.id)
  store.addProducts(data,1)
}
</script>

<style scoped>
.bgBlack{
  background-color: black;
  color: #fff;
}
</style>
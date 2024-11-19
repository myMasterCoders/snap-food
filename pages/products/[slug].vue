<template>
<div class="flex flex-row items-center justify-around w-full p-4">
  <div class="w-4/12">
    <p class="my-2">{{products.data.name}}</p>
    <p>{{products.data.description}}</p>
    <div class="my-2" v-if="products.data.is_sale">
      <del class="text-slate-600">{{numberFormat(products.data.price)}} تومان</del>
      <p>{{numberFormat(products.data.sale_price)}} تومان</p>
    </div>
    <div class="my-4" v-else>
      <p>{{numberFormat(products.data.price)}} تومان</p>
    </div>

    <div class="w-full flex flex-row items-center justify-around">
      <button @click="addProduct(products.data)" type="button" class="bg-green-600 p-2 text-slate-100">افزودن به سبد خرید</button>
      <div class="flex flex-row">
        <button @click="()=>quantity < products.data.quantity && quantity++" type="button" class="mx-4">+</button>
        <span>{{quantity}}</span>
        <button @click="()=>quantity > 1 && quantity--" type="button" class="mx-4">- </button>
      </div>
    </div>
  </div>
  <div class="w-4/12">
 <img src="/image/not-Found.jpg" v-img="listImg[counter].image" alt="" class="w-full h-[250px]">
  </div>
</div>
  <div class="flex flex-row items-center w-full justify-around my-8">
    <div v-for="product in allProducts.data" :key="product.id" class="p-2 bg-slate-100 w-3/12 mx-2">
      <img :src="`${product.primary_image}`" alt="" class="w-[200px] h-[200px]">
      <p class="my-4 text-[15px]">{{product.name}}</p>
      <p class="my-4 text-[13px]">{{product.description}}</p>
      <div v-if="product.is_sale">
        <del>{{numberFormat(product.price)}} تومان</del>
        <p>{{numberFormat(product.sale_price)}} تومان</p>
      </div>
      <div v-else>
        <p>{{numberFormat(product.price)}} تومان</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useCounterStore} from '../../store/useStore.js';
const store=useCounterStore();
const {public:{baseUrl}}=useRuntimeConfig()
const quantity=ref(1)
const route=useRoute()
let counter=ref(0)
let showImg;
const {data:products}=await useFetch(`${baseUrl}/products/${route.params.slug}`);
console.log('products',products.value)
const {data:allProducts}=await useFetch(`${baseUrl}/random-products?count=4`)
const listImg=reactive([
  {image:`${products.value.data.primary_image}`},
  {image:`${products.value.data.images[0].image}`},
  {image:`${products.value.data.images[1].image}`},
])
console.log(counter.value)
function myImage(){
   counter.value++
 if(counter.value <= 0){
   counter.value=listImg.length-1
 }
 if(counter.value > listImg.length-1){
   counter.value=0
 }
}
onMounted(()=>{
  showImg=setInterval(myImage,4000)
})
onUnmounted(()=>{
  clearInterval(showImg)
})
function addProduct(data){
  store.removeItems(data.id)
  store.addProducts(data,quantity.value)
}
</script>

<style scoped>

</style>
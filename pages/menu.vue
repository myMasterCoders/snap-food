<template>
<section class="menu">
  <div class="container mx-ato p-1">
    <div class="w-full h-auto">
      <template v-if="pending" >
        <div class="w-8/12 mx-auto text-center p-4">
          <div  class="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status">
        </div>
        </div>
      </template>

      <template v-else>
      <div class="w-full flex flex-row items-center justify-between p-2 sm:flex sm:flex-col md:flex md:flex-col lg:flex lg:flex-row lg:items-center lg:justify-between xl:flex xl:flex-row xl:items-center xl:justify-between">
        <div class="w-3/12 sm:w-full md:w-full lg:w-3/12 xl:w-3/12 sm:bg-slate-200 p-4 flex h-[600px] flex-col">
          <div class="relative">
          <p class="text-slate-800 my-2">جستجو</p>
            <div class="absolute left-[10px] top-[50px]">
              <font-awesome-icon @click="search !=='' && getPage({search:search})" :icon="['fas','search']"/>
            </div>
          </div>
          <input @input="check" type="text" v-model="search" class="w-full p-2 outline-none border border-1 border-slate-200" placeholder="جستجو...">
          <p class="text-slate-200 p-2 bg-slate-700 my-2">دسته بندی</p>
          <ul class="flex flex-col">
          <li v-for="category in categories.data" :key="category.id" :class="{bgBlack : route.query.hasOwnProperty('category')} && route.query.category == category.id" class="hover:bg-slate-600 hover:text-slate-100 p-1 transition">
            <p @click="getPage({category:category.id})" class="my-2 cursor-pointer " >{{category.name}}</p>
          </li>
          </ul>
          <p class="text-slate-200 bg-slate-700 p-2 my-2">فیلتر محصولات</p>
          <ul class="flex flex-col">
            <li class="p-2 hover:bg-slate-600 hover:text-slate-100 transition"><button :class="{bgBlack : route.query.hasOwnProperty('sortBy') && route.query.sortBy == 'max'}" @click="getPage({sortBy:'max'})" type="button" class="px-4 py-1">بیشترین قیمت</button></li>
            <li class="p-2 hover:bg-slate-600 hover:text-slate-100 transition"><button :class="{bgBlack : route.query.hasOwnProperty('sortBy') && route.query.sortBy == 'min'}" @click="getPage({sortBy:'min'})" type="button" class="px-4 py-1">کمترین قیمت</button></li>
            <li class="p-2 hover:bg-slate-600 hover:text-slate-100 transition"><button :class="{bgBlack : route.query.hasOwnProperty('sortBy')} && route.query.sortBy == 'bestseller'" @click="getPage({sortBy:'bestseller'})" type="button" class="px-4 py-1">پرفروش ترین محصول</button></li>
            <li class="p-2 hover:bg-slate-600 hover:text-slate-100 transition"><button :class="{bgBlack : route.query.hasOwnProperty('sortBy')} && route.query.sortBy == 'sale'" @click="getPage({sortBy:'sale'})" type="button" class="px-4 py-1">بیشترین تخفیف</button></li>
          </ul>
        </div>
        <div v-if="data.data.products.length===0" class="w-4/12 mx-auto">
          <p class="text-slate-800 text-[20px]">محصول موردنظر یافت نشد</p>
        </div>
        <div v-else class="w-8/12 sm:w-full md:w-full lg:w-8/12 xl:w-8/12 lg:mx-auto xl:mx-auto mx-auto">
        <div class="w-full flex flex-row items-center justify-between flex-wrap">
          <div v-for="product in data.data.products" :key="product.is" class="p-2 bg-slate-100 w-4/12">
            <NuxtImg src="/image/not-Found.jpg" format="webp" loading="lazy" quality="80" v-img="`${product.primary_image}`" alt="" class="w-[250px] h-[150px]"/>
            <p class="my-2">{{product.name}}</p>
            <p class="my-2 text-[14px]">{{product.description}}</p>
            <div v-if="product.is_sale">
              <del class="my-4">{{numberFormat(product.price)}} تومان</del>
              <p class="my-4">{{numberFormat(product.sale_price)}} تومان</p>
            </div>
            <div v-else>
              <p class="my-4">{{numberFormat(product.price)}} تومان</p>
            </div>
            <div class="flex flex-row items-center justify-between">
              <button type="button" class="bg-green-600 px-4 py-1 rounded-xl sm:text-[12px] text-[13px] text-slate-100">
                افزودن به سبد خرید
              </button>
              <font-awesome-icon :icon="['fas','cart-plus']" class="p-2 rounded-full bg-orange-600 sm:invisible md:invisible lg:visible xl:visible text-slate-100"/>
            </div>
          </div>
        </div>
        </div>
      </div>
      </template>

      <!-- paginate -->
      <div class="w-4/12 mx-auto my-4">
      <ul class="flex flex-row item-center justify-center">
        <li v-for="page in data.data.meta.links.slice(1,-1)" :key="page.id" class="px-4 py-2" :class="{bgBlack : page.active}">
          <button @click="getPage({page:page.label})" type="button">{{page.label}}</button>
        </li>
      </ul>
      </div>
    </div>
  </div>
</section>
</template>

<script setup>
const search=ref('');
const router=useRouter();
const route=useRoute();
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
const query=ref({})
const {public:{baseUrl}}=useRuntimeConfig();
const {data:categories}=await useFetch(`${baseUrl}/categories`);
query.value=route.query;


const {data,refresh,pending}=await useFetch(`${baseUrl}/menu`,{
  query:query
});
watchEffect(()=>{
  if(Object.keys(route.query).length ===0){
    query.value={}
    refresh();
  }
})
function getPage(data){
  query.value={...route.query,...data}
  if(!data.hasOwnProperty('page')){
    delete query.value.page;
  }

  router.push({
    path:"/menu",
    query:query.value
  })
  refresh()
}
function check(element){
  if(element.target.value === ''){
    if(route.query.hasOwnProperty('search')){
      delete query.value.search;
    }
    router.push({
      path:'/menu',
      query:query.value
    })
  }
}

</script>

<style scoped>
.bgBlack{
  background-color: black;
  color: #fff;
}
</style>
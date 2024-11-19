<template>
<section class="cart">
  <template v-if="products.length > 0">
  <div class="flex flex-row items-center w-full justify-around">
    <div class="w-2/12 text-center">محصول</div>
    <div class="w-2/12 text-center">نام محصول</div>
    <div class="w-2/12 text-center">قیمت</div>
    <div class="w-2/12 text-center">تعداد</div>
    <div class="w-2/12 text-center">قیمت کل</div>
    <div class="w-2/12 text-center">حذف</div>
  </div>
  <div class="flex flex-col my-8">
    <div v-for="product in products" :key="product.id" class="flex flex-row justify-around items-center w-full my-2">
      <div class="w-2/12 text-center">
        <img :src="`${product.primary_image}`" alt="" class="w-[120px] h-[120px] items-center mx-auto rounded-xl">
      </div>
      <div class="w-2/12 text-center">
        <p>{{product.name}}</p>
      </div>
      <div class="w-2/12 text-center">
       <div v-if="product.is_sale">
         <del class="text-slate-600 my-4">{{numberFormat(product.price)}} تومان</del>
         <p class="my-2">{{numberFormat(product.sale_price)}} تومان</p>
       </div>
        <div v-else>
          <p class="my-2">{{numberFormat(product.price)}} تومان</p>
        </div>
      </div>
      <div class="w-2/12 text-center flex flex-row items-center justify-around">
        <button @click="()=> product.qty < product.quantity && store.increment(product.id)" type="button" class="bg-green-600 mx-4 p-2 rounded-lg text-slate-100">+</button>
        <span>{{product.qty}}</span>
        <button @click="()=> product.qty > 1 && store.decrement(product.id)" type="button" class="bg-red-600 mx-4 p-2 rounded-lg text-slate-100">-</button>
      </div>
      <div class="w-2/12 text-center">
        <div v-if="product.is_sale">
          <p>{{numberFormat(product.qty * product.sale_price)}} تومان</p>
        </div>
        <div v-else>
          <p>{{numberFormat(product.qty * product.price)}} تومان</p>
        </div>
      </div>
      <div class="w-2/12 text-center">
        <button @click="delProducts(product.id)" type="button" class="bg-red-600 p-2 text-slate-100">حذف</button>
      </div>
    </div>



  </div>
  <div class="mt-4">
    <button @click="clear" type="button" class="bg-sky-600 px-4 py-2 text-slate-100 rounded-xl text-[13px] mx-4">پاک کردن کل سبد خرید</button>
  </div>
    <div class="w-full flex flex-row items-center justify-around my-4">
      <div class="w-4/12 flex flex-row items-center">
        <input v-model="code" type="text" class="p-2 w-10/12 outline-none border border-1 border-slate-200 rounded-xl text-slate-600" placeholder="کد تخفیف">
        <button @click="checkCoupons" type="button" class="bg-sky-600 px-1 py-1 rounded-lg text-[12px] text-white">
          اعمال کد تخفیف
          <div v-if="loading" class="inline-block h-5 w-5 mx-2 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
               role="status">
          </div>
        </button>
      </div>
      <div class="w-4/12 flex flex-row items-center justify-around">
        <p>انتخاب ادرس:</p>
        <div v-if="addresses?.length !==0">
          <select @change="getAddressid" class="p-2">
            <option v-for="address in addresses" :key="address.id" :value="address.id">{{address.title}}</option>
          </select>
        </div>
        <div v-else>
          <NuxtLink to="/profile">
            <button type="button" class="bg-sky-600 px-2 py-2 rounded-xl text-white text-[13px]">ایجاد ادرس</button>
          </NuxtLink>

        </div>
      </div>
    </div>
    <div class="my-4 w-4/12 mx-auto flex flex-col">
      <h2>مجموع کل سبد خرید:</h2>
      <div class="flex flex-row items-center justify-between my-2">
        <p>مبلغ کل پرداختی</p>
        <span class="text-slate-600">{{numberFormat(allPrice)}} تومان</span>
      </div>
      <div class="flex flex-row items-center justify-between my-2">
        <p>  تخفیف:<span class="mx-2 text-green-600">{{percent}} %</span></p>
        <span class="text-slate-600">{{numberFormat((allPrice * percent) / 100)}} تومان</span>
      </div>
      <div class="flex flex-row items-center justify-between my-2">
        <p>مبلغ قابل پرداخت:</p>
        <span class="text-slate-600">{{numberFormat( allPrice - ((allPrice * percent) / 100))}} تومان</span>
      </div>
    </div>
    <div class="w-3/12 mx-auto my-4">
      <button @click="payment" type="button" class="bg-green-600 px-8 py-2 rounded-xl text-slate-100">
        پرداخت
        <div v-if="loading" class="inline-block h-5 w-5 mx-2 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
             role="status">
        </div>
      </button>
    </div>
  </template>
  <template v-else>
    <div class="w-4/12 mx-auto">
      <img src="/image/empty.png" alt="" class="w-full h-[300px]">
      <p class="text-center my-4">سبد خرید خالی است</p>
      <div class="w-4/12 mx-auto">
      <NuxtLink to="/menu">
      <button type="button" class="bg-[#ff00a6] my-4 text-center  text-[13px] text-slate-100 px-4 py-1 rounded-lg">مشاهده محصولات</button>
      </NuxtLink>
      </div>
    </div>
  </template>

</section>
</template>

<script setup>
import {useToast} from "vue-toastification";
const toast=useToast();
const loading=ref(false)
const errors=ref([])
import {useCounterStore} from '../store/useStore.js';
const store=useCounterStore();
const code=ref('')
const addressId=ref(null)
const products=computed(()=>{
  return store.allProducts;
})
console.log('products',products.value)
const allPrice=computed(()=>{
  return store.allAmount
})
const percent=ref(0)
const coupon=ref(null)
function delProducts(data){
  store.deleteProduct(data)
}
function clear(){
  store.clear()
}
async function checkCoupons(){
  if(code.value === '' || code.value === null){
    toast.error('کد تخفیف الزامی است',{
      position:"top-right",
      timeout:3000,
      rtl:true
    })
    return
  }
  if(isNaN(code.value)){
    toast.error('فیلد ورودی نامعتبر است',{
      position:"top-right",
      timeout:3000,
      rtl:true
    })
    return
  }
  try{
    loading.value=true
    const data = await $fetch('/api/global', {
      query:{url:`/check-coupon`},
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:{
        code:code.value
      }
    })
    toast.success('کد تخفیف را وارد کردید',{
      position:"top-right",
      timeout:3000,
      rtl:true
    })
    percent.value=data.percentage
    console.log(data)
  }catch (error){
    toast.error(Object.values(error.data.data.message).flat().toString())
  }finally {
    loading.value=false
  }

}
const { data: addresses } = await useFetch('/api/global', {
  query:{url:`/user/addresses`},
  headers:{
    'Content-Type':'application/json'
  }
})
function getAddressid(element){
 addressId.value=element.target.value
}
async function payment(){

  if(addressId.value === '' || addressId.value === null){
    toast.error('فیلد  ادرس  الزامی است',{
      position:"top-right",
      timeout:3000,
      rtl:true
    })
    return
  }

  try{
    loading.value=true
    const data = await $fetch('/api/global', {
      query:{url:`/payment/send`},
      method:'POST',
      body:{
        cart:products.value,
        coupon:code.value,
        address_id:addressId.value
      },
    })
    toast.success('در حال انتقال به سایت پذیرنده',{
      position:"top-right",
      timeout:3000,
      rtl:true
    })
    await navigateTo(data.url,{
      external:true
    })
    console.log('data',data)
  }catch (error){
    errors.value=Object.values(error.data.message).flat()
  }finally {
    loading.value=false
  }
}
</script>

<style scoped>

</style>
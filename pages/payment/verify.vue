<template>
<section>
  <ClientOnly>
  <div class="w-6/12 mx-auto flex flex-col">
    <div v-if="payment.status">
    <p class="text-green-600 text-center text-[20px]">
      پرداخت با موفقیت انجام شد
    </p>
      <div class="mx-auto w-3/12 my-4">
      <NuxtLink to="/">
      <button type="button" class="bg-slate-400 text-[13px] text-center px-4 py-2 rounded-xl text-slate-100">بازگشت به صفحه اصلی</button>
      </NuxtLink>
      </div>
    </div>
    <div v-else>
      <p class="text-red-600 text-center text-[20px]">
        پرداخت با موفقیت انجام نشد
      </p>
      <div class="flex flex-row items-center justify-around">
        <div class="w-3/12 mx-auto my-4">
        <NuxtLink to="/">
        <button type="button" class="bg-slate-400 text-[13px] px-4 py-2 rounded-xl text-slate-100">بازگشت به صفحه اصلی</button>
        </NuxtLink>
        </div>
        <div class="w-3/12 mx-auto my-4">
        <NuxtLink to="/menu">
        <button type="button" class="bg-slate-400 text-[13px] px-4 py-2 rounded-xl text-slate-100">بازگشت فروشگاه</button>
        </NuxtLink>
        </div>
      </div>
    </div>
  </div>
  </ClientOnly>
</section>
</template>

<script setup>
import {useCounterStore} from '../../store/useStore.js';
const store=useCounterStore();
const route=useRoute();
const errors=ref([])
const payment=ref(null)
const {public:{baseUrl}}=useRuntimeConfig();

if(process.client) {
  try {
    const data = await $fetch(`${baseUrl}/payment/verify`, {
      method: 'POST',
      body: {
        token: route.query.trackId,
        status: route.query.success
      },
      headers: {
        'Content-Type': "application/json"
      }
    })
    payment.value = data.data;
    store.clear()
  } catch (error) {
    errors.value = Object.values(error.data.message).flat()
  }
}

</script>

<style scoped>

</style>
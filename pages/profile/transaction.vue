<template>
<div class="w-full flex flex-row items-center justify-between">
      <div class="w-2/12 p-2">شماره سفارش</div>
      <div class="w-2/12 p-2">مبلغ</div>
      <div class="w-2/12 p-2">وضعیت</div>
      <div class="w-2/12 p-2">شماره پیگیری</div>
      <div class="w-2/12 p-2">تاریخ</div>
</div>
  <div class="w-4/12 mx-auto">
    <div :class="{bgBlack : label.active}" class="w-[20px] h-[20px] px-2" v-for="label in data.meta.links.slice(1,-1)" :key="label.id" :value="label.id">
      <p class="text-center">{{label.label}}</p>
    </div>
  </div>
</template>

<script setup>
const page=ref(0)
const { data, refresh, pending } = await useFetch('/api/global', {
  query:{url:`/profile/transactions`},
  headers:useRequestHeader(['cookie']),
})
console.log(data.value)
</script>

<style scoped>
.bgBlack{
  background-color: black;
  color: #fff;
}
</style>
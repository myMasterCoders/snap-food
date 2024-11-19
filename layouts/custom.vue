<template>
<section class="custom">
  <div class="container mx-auto p-1">
    <div class="w-ful h-auto">
      <div class="flex flex-row items-center justify-between">
        <div class="w-3/12 flex flex-col">
          <ul class="flex flex-col">
            <NuxtLink to="/profile">
            <li class="p-2 text-slate-900">اطلاعات کاربری</li>
            </NuxtLink>
            <NuxtLink to="/profile/addresses">
            <li class="p-2 text-slate-900"> آدرس ها</li>
            </NuxtLink>
            <NuxtLink to="/profile/transaction">
              <li class="p-2 text-slate-900">تراکنش ها</li>
            </NuxtLink>
            <div>
              <button @click="logPage" type="button" class="my-2 text-slate-900">خروج</button>
            </div>

          </ul>
        </div>
        <div class="w-8/12">
          <slot/>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script setup>
import {useToast} from "vue-toastification";
const toast=useToast()
const errors=ref([])
const {user}=authUsers()
async function logPage(){

  try{
    await $fetch('/api/auth/logout',{
      method:'POST',
      headers:useRequestHeader(['cookie'])
    })
    toast.warning('شما از پنل کاربری خارج شدید',{
      position:'top-right',
      timeout:3000,
      rtl:true
    })
    user.value=null
    return navigateTo('/')
  }catch (error){
    errors.value=Object.values(error.data.data.message).flat()
  }
}
</script>

<style scoped>

</style>
<template>
<section class="login">
  <div class="container mx-auto p-1">
    <div class="w-full h-auto">
      <div v-if="flag">
        <LayoutCheckOtp/>
      </div>
      <div v-else>
      <div class="w-4/12 mx-auto">
        <div class="flex flex-col">
          <div v-for="error in errors" :key="error.id" class="bg-red-600 text-slate-100">
            <p>{{error}}</p>
          </div>
          <form @submit.prevent="login">
            <label class="my-2">شماره موبایل خود را وارد کنید:</label>
            <br>
            <input type="text" v-model="cellphone" class="my-4 w-full p-2 outline-none border border-1 border-slate-200" placeholder="شماره موبایل">
            <br>
            <button type="submit" class="my-4 bg-sky-600 px-8 py-2 rounded-xl text-slate-100 text-[15px]">
              ارسال
               <div v-if="loading" class="inline-block h-5 w-5 mx-2 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                  role="status">
              </div>
            </button>
          </form>
        </div>
      </div>
      </div>
    </div>
  </div>
</section>

</template>

<script setup>
definePageMeta({
  middleware:"guest"
})
import {useToast} from "vue-toastification";
const toast=useToast();
const cellphone=ref('')
const errors=ref([])
const loading=ref(false)
const flag=ref(false)
async function login(){

  if(cellphone.value === ''){
    toast.error('فیلد روردی الزامی است',{
      position:"top-right",
      timeout:3000,
      rtl:true
    })
    return
  }

  const pattern=/^(\+98|0)?9\d{9}$/ig;
  if(!pattern.test(cellphone.value)){
    toast.error('شماره موبایل صحیح نیست',{
      position:'top-right',
      timeout:3000,
      rtl:true
    })
    return
  }

  try{
    loading.value=true
    const data=await $fetch('/api/auth/login',{
      method:'POST',
      body:{
        cellphone:cellphone.value
      },
      headers:{
        'Content-Type':'application/json'
      }
    })
    toast.success('کد تایید با موفقیت ارسال شد',{
      position:"top-right",
      timeout:3000,
      rtl:true
    })
    console.log(data)
    flag.value=true
  }catch (error){
    errors.value=Object.values(error.data.data.message).flat()
  }finally {
    loading.value=false
  }
}
</script>

<style scoped>

</style>
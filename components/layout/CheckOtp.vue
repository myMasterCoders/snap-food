<template>
<section class="check-otp">
  <div class="container mx-auto p-1">
    <div class="w-full h-auto">
      <div class="bg-red-600 text-slate-100" v-for="error in errors" :key="error.id">
        <p>{{error}}</p>
      </div>
      <div class="w-4/12 mx-auto">
        <div class="flex flex-col">
          <form @submit.prevent="checkOtp">
          <label>کد تایید را وارد کنید:</label>
            <br>
            <input type="text" v-model="otp" class="p-2 w-full my-4 border border-1 border-slate-200 outline-none" placeholder="کد تایید">
            <br>
            <button type="submit" class="bg-sky-600 rounded-xl px-8 py-2 text-slate-100 text-[15px]">
              کد تایید
              <div v-if="loading" class="inline-block h-5 w-5 mx-2 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                   role="status">
              </div>
            </button>
        </form>
          <LayoutResendOtp @resend-error="(error)=> errors=error" class="my-4"/>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script setup>
const {user}=authUsers()
import {useToast} from "vue-toastification";
const toast=useToast();
const errors=ref([])
const loading=ref(false)
const otp=ref('')
async function checkOtp(){

  if(otp.value === ''){
    toast.error('کد تایید را وارد کنید',{
      position:"top-right",
      timeout:3000,
      rtl:true
    })
    return
  }

  const pattern=/^[0-9]{6}$/ig;
  if(!pattern.test(otp.value)){
    toast.error('فیلد ورودی نامعتبر است',{
      position:"top-right",
      timeout:3000,
      rtl:true
    })
    return
  }

  try{
    loading.value=true
    const data=await $fetch('/api/auth/otp',{
      method:'POST',
      body:{
        otp:otp.value
      },
      headers:{
        'Content-Type':"application/json"
      }
    })
    toast.success('به پنل کاربری وارد شدید',{
      position:"top-right",
      timeout:3000,
      rtl:true
    })
    user.value=data;
    return navigateTo('/')
  }catch (error){
    errors.value=Object.values(error.data.data.message).flat()
  }finally {
    loading.value=false
  }
}
</script>

<style scoped>

</style>
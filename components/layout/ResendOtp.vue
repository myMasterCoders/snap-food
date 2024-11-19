<template>
<div class="flex flex-row items-center justify-end">

  <div v-if="flag">
    <button @click="resend" type="button" class="bg-sky-600 px-4 py-2 rounded-xl text-slate-100 text-[13px] mx-4">
      ارسال دوباره کد تایید
      <div v-if="loading" class="inline-block h-5 w-5 mx-2 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
           role="status">
      </div>
    </button>
  </div>
  <div v-else>
  <span>00</span>
  <span>:</span>
  <span>{{counter}}</span>
  </div>
</div>
</template>

<script setup>
import {useToast} from "vue-toastification";
const toast=useToast();
const loading=ref(false)
const emit=defineEmits(['resendError'])
const counter=ref(10);
const flag=ref(false);
let timer;

async function resend(){

  try{
    loading.value=true
    const data=await $fetch('/api/auth/resend',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      }
    })
    toast.success('کد تایید دوباره ارسال شد',{
      position:"top-right",
      timeout:3000,
      rtl:true
    })
    flag.value=false;
    counter.value=10;
    timer=setInterval(clock,1000)
    console.log(data)
  }catch (error){
    emit('resendError',Object.values(error.data.data.message).flat())
  }finally {
    loading.value=false
  }
}
const clock=()=>{
  if(counter.value > 0){
    counter.value--;
  }
  if(counter.value < 10){
    counter.value='0'+counter.value
  }
  if(counter.value <= 0){
    counter.value='00'
    flag.value=true
    clearInterval(timer)
  }
}

onMounted(()=>{
  timer=setInterval(clock,1000)
})
onUnmounted(()=>{
  clearInterval(timer)
})


</script>

<style scoped>

</style>
<template>
<section class="contact-us">
  <div class="container mx-auto p-1">
    <div class="w-full h-auto">
      <div class="flex flex-row items-center justify-between sm:grid sm:grid-cols-1 md:grid md:grid-cols-1 lg:flex lg:flex-row lg:items-center lg:justify-between xl:flex xl:flex-row xl:items-center xl:justify-between 2xl:flex 2xl:flex-row 2xl:items-center 2xl:justify-between">
        <div class="w-6/12 sm:w-full md:w-full lg:w-6/12 xl:w-6/12 2xl:w-6/12 flex flex-col" >
          <div v-for="error in errors" :key="error.id" class="bg-red-600 text-slate-100">
            <p>{{error}}</p>
          </div>
          <form @submit.prevent="send">
            <input v-model="formData.name" type="text" class=" my-2 w-full p-2 rounded-lg outline-none border border-1 border-slate-100" placeholder="نام و نام خانوادگی...">
            <br/>
            <input v-model="formData.email" type="email" class=" my-2 w-full p-2 rounded-lg outline-none border border-1 border-slate-100" placeholder="ایمیل">
            <br/>
            <input v-model="formData.subject" type="text" class=" my-2 w-full p-2 rounded-lg outline-none border border-1 border-slate-100" placeholder="موضوع پیام">
            <br/>
            <textarea v-model="formData.text" rows="5"  class="my-2 outline-none w-full" placeholder="پیام"></textarea>
            <br>
            <button type="submit" class="bg-sky-600 px-4 py-2 rounded-xl text-slate-100">
              ارسال پیام

               <div v-if="loading"  class=" mx-2 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                  role="status">
              </div>
            </button>
          </form>
        </div>
        <div class="w-6/12 sm:w-full md:w-full lg:w-6/12 xl:w-6/12 2xl:w-6/12 sm:mt-2" >
          <div id="map" style="width: 100%;height: 320px">

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script setup>
import {useToast} from "vue-toastification";
const toast=useToast();
const errors=ref([])
const loading=ref(false)
const formData=ref({
  name:"",
  email:"",
  subject:"",
  text:""
})
const {public:{baseUrl}}=useRuntimeConfig();
const {$leaflet}=useNuxtApp();
async function send(){

  if(formData.value.name === '' || formData.value.email === '' || formData.value.subject === '' || formData.value.text === ''){
    toast.error('فیلد رورودی الزامی است',{
      position:"top-right",
      timeout:3000,
      rtl:true
    })
    return;
  }
  try{
    loading.value=true;
    const data=await useFetch(`${baseUrl}/contact-us`,{
      method:'POST',
      body:formData.value,
      headers:{
        'Content-Type':"Application/json"
      }
    })
    toast.success('ارسال پیغام با موفقیت انجام شد',{
      position:"top-right",
      timeout:3000,
      rtl:true
    })
    formData.value=''
    console.log(data)
  }catch (error){
    errors.value=Object.values(error.data.message).flat();
  }finally {
    loading.value=false;
  }
}
onMounted(()=>{
  let map = $leaflet.map('map').setView([35.7219, 51.3347], 13);

  $leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">Tehran</a> SnapFood'
  }).addTo(map);

  $leaflet.marker([35.7219, 51.3347],{
    icon:$leaflet.icon({
      popupAnchor:[12,6],
      iconUrl:'/image/marker-icon.png',
      shadowUrl:'/image/marker-shadow.png'
    })
  }).addTo(map)
      .bindPopup('A pretty CSS popup.<br> Easily customizable.')
      .openPopup();
})
</script>

<style scoped>

</style>
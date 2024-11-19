<template>
<section class="addresses">
  <div class="container mx-auto p-1">
    <div class="w-full h-auto ">
      <div class="flex flex-row items-center justify-between w-full flex-wrap">
      <FormKit id="myForm" @submit="create" #default="{value}" type="form" :actions="false" :incomplete-messages="false"  style="width: 100%;display: flex ;flex-direction: row;flex-wrap: wrap">
        <div class="w-5/12">
     <FormKit  type="text" label="عنوان" name="title" id="title" validation="required" :validation-messages="{required:'فیلد روردی الزامی است'}" messages-class="text-red-600" input-class="p-2 border border-1 border-slate-100"></FormKit>
        </div>
        <div class="w-5/12">
        <FormKit type="text" label="شماره تماس" name="cellphone" id="cellphone" :validation="[['required'],['matches',/^(\+98|0)?9\d{9}$/ig]]" :validation-messages="{'matches':'فیلد ورودی نامعتبر است',required:'فیلد روردی الزامی است'}" messages-class="text-red-600" input-class="p-2 border border-1 border-slate-100"></FormKit>
        </div>
        <div class="w-5/12">
          <FormKit type="text" label="کد پستی" name="postal_code" id="postal_code" :validation="[['required'],['matches',/^\d{5}[ -]\d{5}$/ig]]" :validation-messages="{'matches':'فیلد روردی نامعتبر است',required:'فیلد روردی الزامی است'}" messages-class="text-red-600" input-class="p-2 border border-1 border-slate-100"></FormKit>
        </div>
        <div class="w-5/12">
          <FormKit @change="changeProvince" type="select" label="استان ها" name="province_id" id="province_id" validation="required" :validation-messages="{required:'فیلد روردی الزامی است'}" messages-class="text-red-600" input-class="p-2 border border-1 border-slate-100">
            <option v-for="province in allAddress.provinces" :key="province.id" :value="province.id">{{province.name}}</option>
          </FormKit>
        </div>
        <div class="w-5/12">
          <FormKit ref="cityEl" type="select" label="شهر ها" name="city_id" id="city_id" validation="required" :validation-messages="{required:'فیلد روردی الزامی است'}" messages-class="text-red-600" input-class="p-2 border border-1 border-slate-100">
            <option v-for="city in allAddress.cities.filter(items => items.province_id == value.province_id)" :key="city.id" :value="city.id">{{city.name}}</option>
          </FormKit>
        </div>
        <br>
        <div class="w-full">
          <FormKit style="width: 100%;height: 150px" type="textarea" label="ادرس" name="address" id="address" validation="required" :validation-messages="{required:'فیلد روردی الزامی است'}" messages-class="text-red-600" input-class="p-2 border border-1 border-slate-100">

          </FormKit>
        </div>
        <FormKit type="submit" input-class=" my-4 bg-sky-600 px-8 py-2 text-slate-100 rounded-xl">
          ایجاد
          <div v-if="loading" class="inline-block h-5 w-5 mx-2 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
               role="status">
          </div>
        </FormKit>
      </FormKit>
      </div>
    </div>
  </div>
</section>
  <section>
    <LayoutEdit/>
  </section>
</template>

<script setup>
import {reset} from '@formkit/core'
import {useToast} from "vue-toastification";
const toast=useToast()
const loading=ref(false)
const errors=ref([])
const cityEl=ref(null)
const {data:allAddress}=await useFetch('/api/address/addresses',{
  headers:useRequestHeader(['cookie'])
})
async function create(formData){

  try{
    loading.value=true
    const data = await $fetch('/api/global', {
      query:{url:`/profile/addresses/create`},
      method:'POST',
      body:formData,
     headers:useRequestHeader(['cookie'])
    })
    toast.success('ایجاد ادرس با موفقیت انجام شد',{
      position:'top-right',
      timeout:3000,
      rtl:true
    })
    reset('myForm')
    console.log(data)
  }catch (error){
    errors.value=Object.values(error.data.data.message).flat()
  }finally {
    loading.value=false
  }
}
function changeProvince(element){
  let result=allAddress.value.cities.find(items=>items.province_id == element.target.value).id;
cityEl.value.node.input(result)
}
</script>

<style scoped>
.form{
  width: 100%;
}
</style>
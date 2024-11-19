<template>
<section class="home">
  <div class="container mx-auto p-1">
    <div class="w-full h-auto">
      <FormKit @submit="editUsers" type="form" :actions="false" :incomplete-message="false">
        <FormKit :value="users.name" type="text" name="name" id="name" label="نام و نام خانوادگی:" validation="required" messages-class="text-red-600" :validation-messages="{required:'فیلد ورودی الزامی است'}" input-class="p-1 my-4 border border-1 border-slate-200 outline-none"></FormKit>
        <FormKit :value="users.email" type="text" name="email" id="email" label="ایمیل" validation="required" messages-class="text-red-600" :validation-messages="{required:'فیلد ورودی الزامی است'}" input-class="p-1 my-4 border border-1 border-slate-200 outline-none"></FormKit>
        <FormKit :value="users.cellphone" type="text" disabled name="cellphone" id="cellphone" label="شماره همراه" validation="required" messages-class="text-red-600" :validation-messages="{required:'فیلد ورودی الزامی است'}" input-class="p-1 my-4 border border-1 border-slate-200 outline-none"></FormKit>
        <FormKit type="submit" messages-class="text-red-600" input-class="text-slate-100 bg-sky-600 px-4 py-2 rounded-lg">
          ویرایش
          <div v-if="loading" class="inline-block h-5 w-5 mx-2 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
               role="status">
          </div>
        </FormKit>
      </FormKit>
    </div>
  </div>
</section>
</template>

<script setup>
import {useToast} from "vue-toastification";
const toast=useToast();
const errors=ref([])
const loading=ref(false)
const { data: users } = await useFetch('/api/global', {
  query:{url:`/profile/info`},
  headers:useRequestHeader(['cookie'])
})
console.log(users.value)
async function editUsers(formData){

  try{
    loading.value=true
    const data = await $fetch('/api/global', {
      query:{url:`/profile/info/edit`},
      method:'POST',
      headers:useRequestHeader(['cookie']),
      body:{
        name:formData.name,
        email:formData.email
      }
    })
    toast.success('ویرایش اطلاعات با موفقیت انجام شد',{
      position:"top-right",
      timeout:3000,
      rtl:true
    })
    console.log(data)
  }catch (error){
    errors.value=Object.values(error.data.data.message).flat()
  }finally {
    loading.value=false
  }
}
</script>

<style scoped>

</style>


export default defineNuxtPlugin(async(nuxtApp)=>{
    const {user}=authUsers();
    try{
        const data=await $fetch('/api/auth/me',{
            headers:useRequestHeader(['cookie'])
        })
        user.value=data
    }catch (error){
        user.value=null
    }
})
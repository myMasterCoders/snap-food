
export default defineEventHandler(async(event)=>{

    const {public:{baseUrl}}=useRuntimeConfig();
    const token=getCookie(event,'token');

    try{
        const data=await $fetch(`${baseUrl}/user/addresses`,{
            headers:{
                'Accept':"application/json",
                'Authorization':`Bearer ${token}`
            }
        })
        return data.data
    }catch (error){
        return error
    }
})
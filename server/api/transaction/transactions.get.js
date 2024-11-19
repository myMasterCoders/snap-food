

export default defineEventHandler(async(event)=>{

    const {public:{baseUrl}}=useRuntimeConfig();
    const token=getCookie(event,'token')
    // const query=getQuery(event);

    try{
        const data=await $fetch(`${baseUrl}/profile/transactions`,{
            headers:{
                'Accept':'application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        return data.data
    }catch (error){
        return error
    }
})


export default defineEventHandler(async(event)=>{

    const {public:{baseUrl}}=useRuntimeConfig();
    const token=getCookie(event,'token');

    try{
        const data=await $fetch(`${baseUrl}/auth/logout`,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        setCookie(event,'token','',{
            httpOnly:true,
            secure:true,
            maxAge:new Date(0),
            path:'/'
        })
        return data.data
    }catch (error){
        return error;
    }
})
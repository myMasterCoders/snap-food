

export default defineEventHandler(async (event)=>{

    const {public:{baseUrl}}=useRuntimeConfig();
    const token=getCookie(event,'token');

    try{
        const data=await $fetch(`${baseUrl}/auth/me`,{
            method:'POST',
            headers:{
                'Accept':"application/json",
                'Authorization':`Bearer ${token}`
            }
        })
        return data.data
    }catch (error){
        if(error.statusCode === 401){
            setCookie(event,'token','',{
                httpOnly:true,
                secure:true,
                maxAge:new Date(0),
                path:'/'
            })
        }
        return error;
    }
})
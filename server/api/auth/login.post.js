
export default defineEventHandler(async(event)=>{

    const body=await readBody(event);
    const {public:{baseUrl}}=useRuntimeConfig();

    try{
        const data=await $fetch(`${baseUrl}/auth/login`,{
            method:'POST',
            body:body,
            headers:{
                'Accept':'application/json'
            }
        })

        setCookie(event,'login_token',data.data.login_token,{
            httpOnly:true,
            secure:true,
            maxAge:60*60*24*7,
            path:'/'
        })
        return data
    }catch (error){
        return error
    }
})
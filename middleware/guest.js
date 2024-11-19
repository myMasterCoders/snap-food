

export default defineNuxtRouteMiddleware(()=>{

    const {user}=authUsers();

    if(user.value){
        return navigateTo('/')
    }
})
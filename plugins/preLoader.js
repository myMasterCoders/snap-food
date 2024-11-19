
export default defineNuxtPlugin((nuxtApp)=>{
    nuxtApp.vueApp.directive('img',function(el,url){

        let img=new Image();
        img.src=url.value;

        img.onload=()=>{
            el.src=url.value;
            el.classList.add('fadeImg')
        }
    })
})
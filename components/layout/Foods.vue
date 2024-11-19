<template>
<section class="slider-foods">
  <div class="container mx-auto p-2">
    <div class="w-full h-auto">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <swiper :module="modules" :slides-per-view="10" :space-between="20" :autoplay="{delay:3000}" :speed="3000" :navigation="true" :breakpoints="breakpoints">
            <swiper-slide v-for="food in listFoods" :key="food.id" class="flex flex-col border border-1 border-slate-200 p-2 rounded-xl">
        <img :src="`${food.image}`" alt="" class="w-[120px] h-[100px] rounded-full">
              <p class="text-[13px] text-slate-600 text-center my-2">{{food.title}}</p>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import {Swiper,SwiperSlide} from "swiper/vue";
import SwiperCore,{Navigation,Autoplay} from "swiper";
SwiperCore.use([Navigation,Autoplay]);
import 'swiper/swiper.min.css';
export default {
  name: "Foods",
  components:{Swiper,SwiperSlide},
  setup(){
    const breakpoints=reactive({
      500:{
        slidesPerView:4,
        spaceBetween:10
      },
      768:{
        slidesPerView: 6,
        spaceBetween: 10
      },
      1024:{
        slidesPerView:8,
        spaceBetween:10
      },
      1280:{
        slidesPerView:10,
        spaceBetween:10
      },
      1536:{
        slidesPerView:10,
        spaceBetween:10
      }
    })
    const listFoods=reactive([
      {id:1,image:"/image/sl-1.png",title:"رستوران"},
      {id:2,image:"/image/sl-2.png",title:"سوپرمارکت"},
      {id:3,image:"/image/sl-3.png",title:"کافه"},
      {id:4,image:"/image/sl-4.png",title:"شیرینی"},
      {id:5,image:"/image/sl-5.png",title:"میوه"},
      {id:6,image:"/image/sl-6.png",title:"نانوایی"},
      {id:7,image:"/image/sl-7.png",title:"گوشت"},
      {id:8,image:"/image/sl-8.png",title:"پروتین"},
      {id:9,image:"/image/sl-9.png",title:"ابمیوه"},
      {id:10,image:"/image/sl-10.png",title:"لبنیات"},
      {id:11,image:"/image/sl-11.png",title:"عسل"},
      {id:12,image:"/image/sl-12.png",title:"گل و گیاه"},
    ])
    return{
      modules:[Navigation,Autoplay],listFoods,breakpoints
    }
  }
}
</script>

<style scoped>

</style>
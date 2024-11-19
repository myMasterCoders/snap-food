
import {defineStore} from "pinia";
import {useToast} from "vue-toastification";
const toast=useToast();
export const useCounterStore=defineStore('main',{
    state:()=>{
        return{
            cart:[]
        }
    },
    getters:{
     productsCounter(state){
         return state.cart.length;
     },
        allProducts(state){
         return state.cart;
        },
        allAmount(state){
         return state.cart.reduce((total,products)=>{
             return products.is_sale? total + (products.qty * products.sale_price) : total + (products.qty * products.price)
         },0)
        }
    },
    mutations:{

    },
    actions:{
        removeItems(id){
            this.cart=this.cart.filter(items=>items.id !==id);
        },
     addProducts(product,counter){
         this.cart.push({
             ...product,
             qty:counter
         })
         toast.success('محصول به سبد خرید اضافه شد',{
             position:"top-right",
             timeout:3000,
             rtl:true
         })
         console.log(this.cart)
     },
        deleteProduct(id){
            this.cart=this.cart.filter(items=>items.id !==id);

            toast.warning('محصول از سبد خرید حذف شد',{
                position:'top-right',
                timeout:3000,
                rtl:true
            })
        },
        increment(id){
            const product=this.cart.find(items => items.id ==id);
            if(product){
                if(product.qty < product.quantity){
                    product.qty++
                }
            }
        },
        decrement(id){
            const product=this.cart.find(items => items.id ==id);
            if(product){
                if(product.qty > 1){
                    product.qty--;
                }
            }
        },
        clear(){
            this.cart=[];
            toast.warning('کل سبد خرید حذف شد',{
                position:"top-right",
                timeout:3000,
                rtl:true
            })
        }
    },
    persist: {
        storage: persistedState.localStorage,
        key:'shopping-cart'
    },
})
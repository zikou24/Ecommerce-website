import { CART_ADD_ITEM } from "../constants/CartConstants";
import { CART_REMOVE_ITEM } from "../constants/CartConstants";
import { CART_SAVE_SHIPPING_ADRESS } from "../constants/CartConstants";

import { CART_SAVE_PAYEMENT_METHOD } from "../constants/CartConstants";

import { CART_CLEAR_ITEMS } from "../constants/CartConstants";
export const cartReducers = (state = {cartItems:[],shippingAdress: {},payementMethod:{} },action)=>{
    

    switch(action.type) {

        case CART_ADD_ITEM:
            const item = action.payload
            const existItem =state.cartItems.find(x=>x.product === item.product)
            if (existItem) {


                return {
                    
                    ...state,
                    cartItems:state.cartItems.map(x=>
                        x.product === existItem.product ? item 
                        :x)
                }

 }else
            {

            return {

                ...state,
                cartItems:[...state.cartItems,item]
                
            }
            }

        case CART_REMOVE_ITEM:

            return {
                ...state,

                cartItems:state.cartItems.filter(x=>x.product !== action.payload)
                
            }
        
        case CART_SAVE_SHIPPING_ADRESS:
            return {
                ...state,

                shippingAdress : action.payload

            }

        case CART_SAVE_PAYEMENT_METHOD:
                return {
                    ...state,
    
                    payementMethod : action.payload
    
                }
            
                
        case CART_CLEAR_ITEMS:
                return {
                    ...state,
                    cartItems : []

                }

        default:
            return state

    }

}

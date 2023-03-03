import axios from "axios";
import { CART_ADD_ITEM } from "../constants/CartConstants";
import { CART_REMOVE_ITEM } from "../constants/CartConstants";
import { CART_SAVE_SHIPPING_ADRESS } from "../constants/CartConstants";
import { CART_SAVE_PAYEMENT_METHOD } from "../constants/CartConstants";

export const addToCart = (id,qty)=> async(dispatch,getState)=>{

  const {data } = await axios.get(`/api/products/${id}`)
  
  dispatch ({type:CART_ADD_ITEM,payload:{
    
    product:data._id,
    
    name:data.name,

    image:data.image,

    price:data.price,

    countInStock:data.countInStock,

    qty

  }})


localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))

}


export const removeFromCart=(id)=>(dispatch,getState)=>{

  dispatch({
    type:CART_REMOVE_ITEM,
    payload:id

  })

  localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))

}



export const saveShippingAdress=(data)=>(dispatch,getState)=>{
  
  dispatch({
    type:CART_SAVE_SHIPPING_ADRESS,
    payload:data

  })

  localStorage.setItem('shippingAdress',JSON.stringify(data))
  
}


export const savePayementMethod=(data)=>(dispatch,getState)=>{
  
  dispatch({
    type:CART_SAVE_PAYEMENT_METHOD,
    payload:data

  })

  localStorage.setItem('payementMethod',JSON.stringify(data))

}

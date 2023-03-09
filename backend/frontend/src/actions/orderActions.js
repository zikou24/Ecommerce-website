import { ORDER_CREATE_REQUEST } from "../constants/OrderConstants";

import { ORDER_CREATE_SUCCESS } from "../constants/OrderConstants";

import { ORDER_CREATE_FAIL } from "../constants/OrderConstants";

import { CART_CLEAR_ITEMS } from "../constants/CartConstants";

import { ORDER_DETAILS_REQUEST } from "../constants/OrderConstants";
import { ORDER_DETAILS_FAIL } from "../constants/OrderConstants";
import { ORDER_DETAILS_SUCCESS } from "../constants/OrderConstants";



import { ORDER_LIST_MY_REQUEST } from "../constants/OrderConstants";
import { ORDER_LIST_MY_SUCCESS } from "../constants/OrderConstants";
import { ORDER_LIST_MY_FAIL } from "../constants/OrderConstants";

import { ORDER_LIST_FAIL } from "../constants/OrderConstants";

import { ORDER_LIST_REQUEST } from "../constants/OrderConstants";
import { ORDER_LIST_SUCCESS } from "../constants/OrderConstants";



import { ORDER_DELIVER_REQUEST } from "../constants/OrderConstants";
import { ORDER_DELIVER_FAIL } from "../constants/OrderConstants";
import { ORDER_DELIVER_SUCCESS } from "../constants/OrderConstants";


//import { ORDER_LIST_MY_RESET } from "../constants/OrderConstants";


import axios from "axios";


export const createOrder = (order) => async(dispatch,getState)=> 

{

    try{

        dispatch({type:ORDER_CREATE_REQUEST})
        
        const 
        { 
            userLogin :{ userInfo },
       } = getState()

        const config = {

            headers: { 
                'Content-Type': 'application/json',

                'Authorization': 'Bearer ' + userInfo.token

            },

            data : {},

        };
        
        axios.post('/api/orders/add/',order,config).then(response=>{

            dispatch({type:ORDER_CREATE_SUCCESS,payload:response.data})
            dispatch({type:CART_CLEAR_ITEMS,payload:response.data})

        })
        localStorage.removeItem('cartItems')


    }
    
    catch(error){    

        dispatch({
            
            type:ORDER_CREATE_FAIL,payload:error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message,

        })

    }

    }





    
export const getOrderDetails = (id) => async(dispatch,getState)=> 

{

    try{

        dispatch({type:ORDER_DETAILS_REQUEST})
        
        const 
        { 
            userLogin :{ userInfo },
       } = getState()

        const config = {

            headers: { 
                'Content-Type': 'application/json',

                'Authorization': 'Bearer ' + userInfo.token

            },

            data : {},

        };

        axios.get(`/api/orders/${id}/`,config).then(response=>{
            
            dispatch({type:ORDER_DETAILS_SUCCESS,payload:response.data})

        })
        
    }
    
    catch(error){    

        dispatch({
            
            type:ORDER_DETAILS_FAIL,payload:error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message,

        })

    }

    }




    
    export const ListMyOrder = () => async(dispatch,getState)=> 

    {
    
        try{
    
            dispatch({type:ORDER_LIST_MY_REQUEST})
            
            const 
            { 
                userLogin :{ userInfo },
           } = getState()
    
            const config = {
    
                headers: { 
                    'Content-Type': 'application/json',
    
                    'Authorization': 'Bearer ' + userInfo.token
    
                },
    
                data : {},
    
            };
            
            axios.get(`/api/orders/myorders/`,config).then(response=>{
                
                dispatch({type:ORDER_LIST_MY_SUCCESS,payload:response.data})
    
            })
            
        }
        
        catch(error){    
    
            dispatch({
                
                type:ORDER_LIST_MY_FAIL,payload:error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message,
    
            })
    
        }
    
        }
    
    
    
  


          
    export const ListOrder = () => async(dispatch,getState)=> 

    {
    
        try{
    
            dispatch({type:ORDER_LIST_REQUEST})
            
            const 
            { 
                userLogin :{ userInfo },
           } = getState()
    
            const config = {
    
                headers: { 
                    'Content-Type': 'application/json',
    
                    'Authorization': 'Bearer ' + userInfo.token
    
                },
    
                data : {},
    
            };
            
            axios.get(`/api/orders/`,config).then(response=>{
                
                dispatch({type:ORDER_LIST_SUCCESS,payload:response.data})
    
            })
            
        }
        
        catch(error){    
    
            dispatch({
                
                type:ORDER_LIST_FAIL,payload:error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message,
    
            })
    
        }
    
        }
    
    
    
      
        export const deliverOrder = (order) => async(dispatch,getState)=> 

        {
        
            try{
        
                dispatch({type:ORDER_DELIVER_REQUEST})
                
                const 
                { 
                    userLogin :{ userInfo },
               } = getState()
        
                const config = {
        
                    headers: { 
                        'Content-Type': 'application/json',
        
                        'Authorization': 'Bearer ' + userInfo.token
        
                    },
        
                    data : {},
        
                };
                
                axios.put(`/api/orders/${order._id}/deliver/`,order,config).then(response=>{
                    
                    dispatch({type:ORDER_DELIVER_SUCCESS,payload:response.data})
        
                })
                
            }
            
            catch(error){    
        
                dispatch({
                    
                    type:ORDER_DELIVER_FAIL,payload:error.response && error.response.data.detail 
                    ? error.response.data.detail
                    : error.message,
        
                })
        
            }
        
            }
        
        
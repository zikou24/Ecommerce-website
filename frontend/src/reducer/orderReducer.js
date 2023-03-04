import { ORDER_CREATE_REQUEST } from "../constants/OrderConstants";
import { ORDER_CREATE_SUCCESS } from "../constants/OrderConstants";
import { ORDER_CREATE_FAIL ,ORDER_CREATE_RESET} from "../constants/OrderConstants";
import { ORDER_DETAILS_REQUEST } from "../constants/OrderConstants";
import { ORDER_DETAILS_FAIL } from "../constants/OrderConstants";
import { ORDER_DETAILS_SUCCESS } from "../constants/OrderConstants";

import { ORDER_LIST_MY_REQUEST } from "../constants/OrderConstants";
import { ORDER_LIST_MY_SUCCESS } from "../constants/OrderConstants";
import { ORDER_LIST_MY_FAIL } from "../constants/OrderConstants";
import { ORDER_LIST_MY_RESET } from "../constants/OrderConstants";




export const  orderCreateReducer=(state = {},action)=>{

    switch(action.type){

        case ORDER_CREATE_REQUEST:

            return {
                loading:true
            }

        case ORDER_CREATE_SUCCESS:

            return {
                loading:false,
                success:true,
                order:action.payload    
            }


        case ORDER_CREATE_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        case ORDER_CREATE_RESET:
            return {  
            }
        default:
          return state
    }
}









export const  orderDetailsReducer=(state = {loading:true,orderItems:[],shippingAdress:{}},action)=>{

    switch(action.type){

        case ORDER_DETAILS_REQUEST:

            return {
                ...state,
                loading:true
            }

        case ORDER_DETAILS_SUCCESS:

            return {

                loading:false,
                order:action.payload    

            }

        case ORDER_DETAILS_FAIL:
            
            return {
                loading:false,
                error:action.payload
            }
            
        default:

          return state


    }




}


export const  orderListMyReducer=(state = {orders:[]},action)=>{

    switch(action.type){

        case ORDER_LIST_MY_REQUEST:

            return {
                loading:true
            }

        case ORDER_LIST_MY_SUCCESS:

            return {
                loading:false,
                orders:action.payload    
            }


        case ORDER_LIST_MY_FAIL:
            return {
                loading:false,
                error:action.payload

            }

        case ORDER_LIST_MY_RESET:
            return {  
                orders:[]
            }
            
        default:
          return state
    }
}

import { ORDER_CREATE_REQUEST } from "../constants/OrderConstants";
import { ORDER_CREATE_SUCCESS } from "../constants/OrderConstants";
import { ORDER_CREATE_FAIL } from "../constants/OrderConstants";




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
        
        default:

        return state


    }




}
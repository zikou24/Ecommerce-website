import { PROUDUCT_LIST_SUCCESS } from "../constants/productConstants"
import { PROUDUCT_LIST_REQUEST } from "../constants/productConstants"
import { PROUDUCT_LIST_FAIL } from "../constants/productConstants"
import { PROUDUCT_DETAILS_FAIL } from "../constants/productConstants"

import { PROUDUCT_DETAILS_REQUEST } from "../constants/productConstants"
import { PROUDUCT_DETAILS_SUCCESS } from "../constants/productConstants"

// import { PRODUCTS_LIST_FAIL } from "../constants/productConstants"
// import { PRODUCTS_LIST_SUCCESS } from "../constants/productConstants"

// import { PRODUCTS_LIST_REQUEST} from "../constants/productConstants"
// import { PRODUCTS_LIST_RESET} from "../constants/productConstants"

 import { PRODUCT_UPDATE_REQUEST } from "../constants/productConstants"
import { PRODUCT_UPDATE_FAIL } from "../constants/productConstants"
import { PRODUCT_UPDATE_SUCCESS } from "../constants/productConstants"
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants"

import { PRODUCT_DELETE_REQUEST } from "../constants/productConstants"
import { PRODUCT_DELETE_SUCCESS } from "../constants/productConstants"
import { PRODUCT_DELETE_FAIL } from "../constants/productConstants"
import { PRODUCT_CREATE_SUCCESS } from "../constants/productConstants"
import { PRODUCT_CREATE_REQUEST } from "../constants/productConstants"
import { PRODUCT_CREATE_FAIL } from "../constants/productConstants"
import { PRODUCT_CREATE_RESET } from "../constants/productConstants"
import { PRODUCT_CREATE_REVIEW_FAIL,PRODUCT_CREATE_REVIEW_REQUEST,PRODUCT_CREATE_REVIEW_SUCCESS,PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants"
import { PRODUCT_TOP_REQUEST ,PRODUCT_TOP_FAIL,PRODUCT_TOP_SUCCESS} from "../constants/productConstants"





export const productListReducer =(state = {products:[]},action) =>{
    
    switch(action.type){

        case PROUDUCT_LIST_REQUEST:

            return {

                loading:true,products:[]

            }

        case PROUDUCT_LIST_SUCCESS:
            
                return {
                    loading:false,
                    products:action.payload.products,
                    page:action.payload.pages,
                    pages:action.payload.pages
                }
                
        case PROUDUCT_LIST_FAIL:
                return {
                   loading:false,error:action.payload
                    }

        
                    
        default: 
                      return state
        
    }

}



export const productDetailReducer =(state = {product:{reviews:[]} },action) =>{


    switch(action.type){

        case PROUDUCT_DETAILS_REQUEST:

            return {

                loading:true,...state

            }

        case PROUDUCT_DETAILS_SUCCESS:
                return {
                    loading:false,product:action.payload
    
                }
                

        case PROUDUCT_DETAILS_FAIL:

                return {loading:false,error:action.payload}
                    
        default: 
                      return state
        
    }

}



export const productDeletelReducer =(state = { },action) =>{



    switch(action.type){

        case PRODUCT_DELETE_REQUEST:

            return {

                loading:true
            }

        case PRODUCT_DELETE_SUCCESS:

                return {
                    loading:false,
                    success:true
                }

        case PRODUCT_DELETE_FAIL:
        
                return {
                    loading:false,
                    error:action.payload
                }         
        default: 

                  return state

    }

}

export const productCreateReducer =(state = { },action) =>{



    switch(action.type){

        case PRODUCT_CREATE_REQUEST:

            return {

                loading:true
            }

        case PRODUCT_CREATE_SUCCESS:

                return {

                    loading:false,
                    success:true,
                    product:action.payload
                    
                }
                
        case PRODUCT_CREATE_FAIL:
        
                return {
                    loading:false,
                    error:action.payload
                }  
        case PRODUCT_CREATE_RESET:
            return {

            }       
        default: 

                  return state

    }

}



export const productUpdateReducer =(state = {product : {}},action) =>{



    switch(action.type){

        case PRODUCT_UPDATE_REQUEST:

            return {

                loading:true
            }

        case PRODUCT_UPDATE_SUCCESS:

                return {
                    loading:false,
                    success:true,
                    product:action.payload
                }
                
        case PRODUCT_UPDATE_FAIL:
        
                return {
                    loading:false,
                    error:action.payload
                }  
        case PRODUCT_UPDATE_RESET:
            return {
                product:{}


            }       
        default: 

                  return state

    }

}





export const productReviewCreateReducer =(state = {},action) =>{

    switch(action.type){

        case PRODUCT_CREATE_REVIEW_REQUEST:

            return {

                loading:true
            }

        case PRODUCT_CREATE_REVIEW_SUCCESS:

                return {
                    loading:false,
                    success:true,
                }
                
        case PRODUCT_CREATE_REVIEW_FAIL:
        
                return {
                    loading:false,
                    error:action.payload
                }  
        case PRODUCT_CREATE_REVIEW_RESET:
            return {

            }       
        default: 

                  return state

    }

}




export const productTopRatedReducer =(state = {products:[]},action) =>{

    switch(action.type){

        case PRODUCT_TOP_REQUEST:

            return {

                loading:true,
                products:[]
            }

        case PRODUCT_TOP_SUCCESS:

                return {
                    loading:false,
                    products:action.payload
                }
                
        case PRODUCT_TOP_FAIL:
        
                return {
                    loading:false,
                    error:action.payload
                }  
            
        default: 

                  return state

    }

}










// export const ProductsListReducer = (state = { productlist: [] }, action) => {
      
//     switch (action.type) {

//         case PRODUCTS_LIST_REQUEST:
//             return { loading: true }

//         case PRODUCTS_LIST_SUCCESS:
//             return { loading: false, productlist: action.payload }

//         case PRODUCTS_LIST_FAIL:
//             return { loading: false, error: action.payload }

//         case PRODUCTS_LIST_RESET:

//             return { productlist: [] }

//         default:

//             return state

//     }

// }


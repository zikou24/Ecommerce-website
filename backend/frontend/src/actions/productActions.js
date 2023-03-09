import { PROUDUCT_LIST_SUCCESS } from "../constants/productConstants"
import { PROUDUCT_LIST_REQUEST } from "../constants/productConstants"
import { PROUDUCT_LIST_FAIL } from "../constants/productConstants"

import { PROUDUCT_DETAILS_FAIL } from "../constants/productConstants"
import { PROUDUCT_DETAILS_REQUEST } from "../constants/productConstants"
import { PROUDUCT_DETAILS_SUCCESS } from "../constants/productConstants"


// import { PRODUCTS_LIST_FAIL } from "../constants/productConstants"
// import { PRODUCTS_LIST_SUCCESS } from "../constants/productConstants"
// import { PRODUCTS_LIST_REQUEST} from "../constants/productConstants"


import { PRODUCT_DELETE_REQUEST } from "../constants/productConstants"
import { PRODUCT_DELETE_SUCCESS } from "../constants/productConstants"
import { PRODUCT_DELETE_FAIL } from "../constants/productConstants"


// import { PRODUCT_UPDATE_REQUEST } from "../constants/productConstants"
// import { PRODUCT_UPDATE_RESET } from "../constants/productConstants"
// import { PRODUCT_UPDATE_SUCCESS } from "../constants/productConstants"


import { PRODUCT_UPDATE_REQUEST } from "../constants/productConstants"
import { PRODUCT_UPDATE_FAIL } from "../constants/productConstants"
import { PRODUCT_UPDATE_SUCCESS } from "../constants/productConstants"

import { PRODUCT_CREATE_SUCCESS } from "../constants/productConstants"
import { PRODUCT_CREATE_REQUEST } from "../constants/productConstants"
import { PRODUCT_CREATE_FAIL } from "../constants/productConstants"


import { PRODUCT_CREATE_REVIEW_FAIL,PRODUCT_CREATE_REVIEW_REQUEST,PRODUCT_CREATE_REVIEW_SUCCESS} from "../constants/productConstants"
import { PRODUCT_TOP_REQUEST ,PRODUCT_TOP_FAIL,PRODUCT_TOP_SUCCESS} from "../constants/productConstants"


import axios from "axios"

export const listProducts =(keyword = '') => async(dispatch) => {
    
try{

    dispatch({type:PROUDUCT_LIST_REQUEST})

    const {data } = await axios.get(`/api/products/${keyword}`)
    
    dispatch({type:PROUDUCT_LIST_SUCCESS,payload:data})
    
} 


catch(error){

    dispatch({type:PROUDUCT_LIST_FAIL,payload:error.response && error.response.data.detail 
        ? error.response.data.detail
        : error.message,
    })

}
}


export const listTopProducts =() => async(dispatch) => {
    
    try{
    
        dispatch({type:PRODUCT_TOP_REQUEST})
    
        const {data } = await axios.get(`/api/products/top/`)
        
        dispatch({type:PRODUCT_TOP_SUCCESS,payload:data})
        
    } 
    
    
    catch(error){
    
        dispatch({type:PRODUCT_TOP_FAIL,payload:error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message,
        })
    
    }
    }
    

export const listProductDetails =(id) => async(dispatch) => {

    try{

        dispatch({type:PROUDUCT_DETAILS_REQUEST})
        const {data } = await axios.get(`/api/products/${id}`)

        dispatch({type:PROUDUCT_DETAILS_SUCCESS,payload:data})
    
    } 
    
    catch(error){

        dispatch({type:PROUDUCT_DETAILS_FAIL,payload:error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message,
    
        })
    }
    }



export const deleteProduct=(id)=> async(dispatch,getState)=>{

    try{

        dispatch({type:PRODUCT_DELETE_REQUEST})

        const { 
            userLogin :{ userInfo },
       } = getState()
       

       const config = {

        method:'delete',

        url:`/api/products/deleteproduct/${id}`,

        headers: { 

            'Content-Type': 'application/json',
            
            'Authorization': 'Bearer ' + userInfo.token

        },

            data : {},

    }

    const { data } = await axios(config)

    dispatch({type:PRODUCT_DELETE_SUCCESS,payload:data})
    
}
    catch(error){

        dispatch({type:PRODUCT_DELETE_FAIL,payload:error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const createProduct = () => async(dispatch,getState)=> 

{

    try{

        dispatch({type:PRODUCT_CREATE_REQUEST})
        
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
        
        axios.post(`/api/products/create/`,{},config).then(response=>{

            dispatch({type:PRODUCT_CREATE_SUCCESS,payload:response.data})
            
        })

    }
    
    catch(error){    

        dispatch({
            
            type:PRODUCT_CREATE_FAIL,payload:error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message,

        })

    }

    }




    export const updateProduct = (product) => async(dispatch,getState)=> 
        
    {

        try{

            dispatch({type:PRODUCT_UPDATE_REQUEST})
            
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

            axios.put(`/api/products/updateproduct/${product._id}`,product,config).then(response=>{

                dispatch({type:PRODUCT_UPDATE_SUCCESS,payload:response.data})

                dispatch({type:PROUDUCT_DETAILS_SUCCESS,payload:response.data})

            })

        }
        
        catch(error)
        
        {    

            dispatch({
                
                type:PRODUCT_UPDATE_FAIL,payload:error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message,

            })

        }

    }





                export const createProductReview = (id,review) => async(dispatch,getState)=> 

                {
                
                    try{
                
                        dispatch({type:PRODUCT_CREATE_REVIEW_REQUEST})
                        
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
                        
                        axios.post(`/api/products/${id}/reviews/`,review,config).then(response=>{
                
                            dispatch({type:PRODUCT_CREATE_REVIEW_SUCCESS,payload:response.data})
                            
                        })
                
                    }
                    
                    catch(error){    
                
                        dispatch({
                            
                            type:PRODUCT_CREATE_REVIEW_FAIL,payload:error.response && error.response.data.detail 
                            ? error.response.data.detail
                            : error.message,
                
                        })
                
                    }
                
                    }
                
                    


    // export const listProductss = () => async(dispatch,getState)=> 

    // {
    //     try{
    
    //         dispatch({type:PRODUCTS_LIST_REQUEST})

    //         const { 
    //             userLogin :{ userInfo },
    //        } = getState()
    
            

    //         const config = {
    //             method: 'get',
    //             url:   `api/products/productslist/`,
    //             headers: { 
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'Bearer ' + userInfo.token
    //             },
    //                 data : {},

    //         };

    //         const { data } = await axios(config);

    //         dispatch({type:PRODUCTS_LIST_SUCCESS,payload:data})


    //     }

    //     catch(error){    
            
    //         dispatch({type:PRODUCTS_LIST_FAIL,payload:error.response && error.response.data.detail 
    //             ? error.response.data.detail
    //             : error.message,
    //         })
    //     }
    //     }

    
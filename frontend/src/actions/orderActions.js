import { ORDER_CREATE_REQUEST } from "../constants/OrderConstants";

import { ORDER_CREATE_SUCCESS } from "../constants/OrderConstants";

import { ORDER_CREATE_FAIL } from "../constants/OrderConstants";

//import axios from "axios";

export const createOrder = (order) => async(dispatch,getState)=> 

    {

        try{

            dispatch({type:ORDER_CREATE_REQUEST})
            
             const { 

                 userLogin :{ userInfo },

            } = getState()





            async function postData(url = '', data = {}) {
              // Default options are marked with *
              const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + userInfo.token
                },

                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data) // body data type must match "Content-Type" header
              });
              return response.json(); // parses JSON response into native JavaScript objects
            }
            
            postData('/api/orders/add/',order)
              .then((data) => {
                dispatch({type:ORDER_CREATE_SUCCESS,payload:data.data})
            });

            

        //     const config = {

        //         headers: { 
        //             'Content-Type': 'application/json',
        //             'Authorization': 'Bearer ' + userInfo.token
        //         },

        //             data : {},

        //     };

        // axios.post('/api/orders/add/',order,config).then(response=>{

        //     dispatch({type:ORDER_CREATE_SUCCESS,payload:response.data})
            
        // }).catch(error =>{

        //     console.log(error)
        // })           


        }

        catch(error){
    
            dispatch({type:ORDER_CREATE_FAIL,payload:error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message,
        
            })
        }
    }
    


        
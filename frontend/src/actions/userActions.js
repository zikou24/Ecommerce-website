import { USER_LOGIN_REQUEST} from "../constants/userConstants";
import { USER_LOGIN_SUCCESS } from "../constants/userConstants";
import { USER_LOGIN_FAIL } from "../constants/userConstants";
import { USER_LOGOUT } from "../constants/userConstants";
import { USER_REGISTER_REQUEST } from "../constants/userConstants";
import { USER_REGISTER_SUCCESS } from "../constants/userConstants";
import { USER_REGISTER_FAIL } from "../constants/userConstants";

import { USER_DETAILS_REQUEST } from "../constants/userConstants";

import { USER_DETAILS_SUCCESS } from "../constants/userConstants";
import { USER_DETAILS_FAIL } from "../constants/userConstants";
import { USER_LIST_REQUEST } from "../constants/userConstants";
import { USER_LIST_RESET } from "../constants/userConstants";
import { USER_LIST_FAIL } from "../constants/userConstants";
import { USER_LIST_SUCCESS } from "../constants/userConstants";



import { USER_DELETE_REQUEST } from "../constants/userConstants";
import { USER_DELETE_FAIL } from "../constants/userConstants";
import { USER_DELETE_SUCCESS } from "../constants/userConstants";


import { USER_UPDATE_REQUEST } from "../constants/userConstants";
import { USER_UPDATE_FAIL } from "../constants/userConstants";

import { USER_UPDATE_SUCCESS } from "../constants/userConstants";
import { ORDER_LIST_MY_RESET } from "../constants/OrderConstants";

import axios from "axios";

export const login = (email,password) => async(dispatch)=> 
{
    try{

        dispatch({type:USER_LOGIN_REQUEST})

        const config = {
            headres:{
                'Content-type':'application/json'
            }
        }

        const {data } = await axios.post('/api/users/login/'
        ,{'username':email,'password':password},config)

        dispatch({type:USER_LOGIN_SUCCESS,payload:data})
        
        localStorage.setItem('userInfo',JSON.stringify(data))

    }

    catch(error){

        dispatch({type:USER_LOGIN_FAIL,payload:error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message,
    
        })
    }
    }



    export const logout = ()=>(dispatch)=>{

        localStorage.removeItem('userInfo')
        dispatch({type:USER_LOGOUT})
        dispatch({type:USER_LIST_RESET})
        dispatch({type:ORDER_LIST_MY_RESET})
        
    }



    export const register = (name,email,password) => async(dispatch)=> 

    {
        try{
    
            dispatch({type:USER_REGISTER_REQUEST})
    
            const config = {
                headres:{
                    'Content-type':'application/json'
                }
            }
    
            const {data } = await axios.post('/api/users/register/'

            ,{'name':name,'email':email,'password':password},config)

            dispatch({type:USER_REGISTER_SUCCESS,payload:data})
            
            dispatch({type:USER_LOGIN_SUCCESS,payload:data})
             
            localStorage.setItem('userInfo',JSON.stringify(data))
    
        }
    
        catch(error){
    
            dispatch({type:USER_REGISTER_FAIL,payload:error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message,
        
            })
        }

        }

    export const getUserDetails = (id) => async(dispatch,getState)=> 

    {
        try{
    
            dispatch({type:USER_DETAILS_REQUEST})

            const { 
                userLogin :{ userInfo },
           } = getState()



            const config = {
                method: 'get',
                url:  `/api/users/${id}/`,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userInfo.token
                },
                    data : {},
            };
            const { data } = await axios(config);

           

            dispatch({type:USER_DETAILS_SUCCESS,payload:data})    
        }

        
        catch(error){    

            dispatch({type:USER_DETAILS_FAIL,payload:error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message,
    
            })
        }
        }

    export const listUsers = () => async(dispatch,getState)=> 

    {
        try{
    
            dispatch({type:USER_LIST_REQUEST})

            const { 
                userLogin :{ userInfo },
           } = getState()
    
            

            const config = {
                method: 'get',
                url:   `/api/users/`,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userInfo.token
                },
                    data : {},

            };

            const { data } = await axios(config);

            dispatch({type:USER_LIST_SUCCESS,payload:data})
    
        }

        catch(error){    
            
            dispatch({type:USER_LIST_FAIL,payload:error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message,
            })
        }
        }
        





        export const deleteUser = (id) => async(dispatch,getState)=> 
        {
            try{
        
                dispatch({type:USER_DELETE_REQUEST})

                const { 
                    userLogin :{ userInfo },
               } = getState()
        
                
    
                const config = {
                    method: 'delete',
                    url:   `/api/users/delete/${id}`,
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + userInfo.token
                    },
                        data : {},
    
                };
    
                const { data } = await axios(config);
    
                dispatch({type:USER_DELETE_SUCCESS,payload:data})
        
            }
    
            catch(error){    
                
                dispatch({type:USER_DELETE_FAIL,payload:error.response && error.response.data.detail 
                    ? error.response.data.detail
                    : error.message,
                })
            }
            }

        export const updateUser = (user) => async(dispatch,getState)=> 
        
        {

            try{

                dispatch({type:USER_UPDATE_REQUEST})
                
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

                axios.put(`/api/users/update/${user._id}`,user,config).then(response=>{

                    dispatch({type:USER_UPDATE_SUCCESS,payload:response.data})
                    
                })

            }
            
            catch(error){    

                dispatch({
                    
                    type:USER_UPDATE_FAIL,payload:error.response && error.response.data.detail 
                    ? error.response.data.detail
                    : error.message,

                })

            }

            }


import { createStore,combineReducers,applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { productListReducer,productDetailReducer } from './reducer/productReducres'

import { cartReducers } from './reducer/CartReducers'

import { userLoginReducer } from './reducer/userReducers'
import { userRegisterReducer } from './reducer/userReducers'
import { userDetailsReducer } from './reducer/userReducers'
import { orderCreateReducer } from './reducer/orderReducer'
import { userListReducer } from './reducer/userReducers'
import { userDeleteReducer } from './reducer/userReducers'
import { userUpdateReducer } from './reducer/userReducers'
import { productDeletelReducer } from './reducer/productReducres'
import { productCreateReducer } from './reducer/productReducres'
import { productUpdateReducer } from './reducer/productReducres'
import { orderDetailsReducer } from './reducer/orderReducer'

import { orderListMyReducer } from './reducer/orderReducer'
import { orderDeliverReducer } from './reducer/orderReducer'
import { orderListReducer } from './reducer/orderReducer'
import { productReviewCreateReducer } from './reducer/productReducres'
import { productTopRatedReducer } from './reducer/productReducres'

const reducer = combineReducers({

    productList: productListReducer,
    productDetails: productDetailReducer,
    productDelete:productDeletelReducer,
    productcreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    userLogin:userLoginReducer,
    cart:cartReducers,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    usersList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderListMy:orderListMyReducer,
    orderList:orderListReducer,
    orderDeliver:orderDeliverReducer,
    productReviewCreate:productReviewCreateReducer,
    productTopRated:productTopRatedReducer

      
})

const cartItemFromStorage = localStorage.getItem('cartItems') ?
JSON.parse(localStorage.getItem('cartItems')):[]



const userInfoFromStorage = localStorage.getItem('userInfo') ?
JSON.parse(localStorage.getItem('userInfo')):null


const shippingAdressFromStorage = localStorage.getItem('shippingAdress') ?
JSON.parse(localStorage.getItem('shippingAdress')):null


const payementMethodFromStorage = localStorage.getItem('shippingAdress') ?
JSON.parse(localStorage.getItem('payementMethod')):null





const initalState = {
    
    cart:{cartItems:cartItemFromStorage,
        shippingAdress:shippingAdressFromStorage,
        payementMethod:payementMethodFromStorage
    },
    userLogin :{userInfo:userInfoFromStorage}

}

const middleware = [thunk]

const store = createStore(reducer,initalState,composeWithDevTools(applyMiddleware(...middleware)))

export default store






import React, { Component } from 'react';
import { Container } from 'react-bootstrap'

import { HashRouter,Routes,Route} from 'react-router-dom'

import Footer from './component/Footer';
import Header from './component/Header';
import HomeScreen from './screans/HomeScreen';
import ProductScreen from './screans/ProductScreen';
import CartScreen from './screans/CartScreen';
import LoginScreen from './screans/LoginScreen';
import RegisterScreen from './screans/RegisterScreen';
import ProfileScreen from './screans/ProfileScreen';
import ShippingScreen from './screans/ShippingScreen';
import PayementScreen from './screans/PayementScreen';
import PlaceOrderScreen from './screans/PlaceOrderScreen';

import UserListScreen from './screans/UserListScreen';
import UserEditScreen from './screans/UserEditScreen';
import ProductListScreen from './screans/ProductListScreen';
import ProductEditScreen from './screans/ProductEditScreen';

import OrderScreen from './screans/OrderScreen';
import OrderListScreen from './screans/OrderListScreen';


class App extends Component {
  render() {
    return (
   
      <HashRouter>
         <Header/>
        <main className='py-3'>
          
         <Container>

         <Routes>

          <Route path='/' element={<HomeScreen/>}/>

          <Route path='/products/:id' element={<ProductScreen/>}/>

          <Route path='/card/' element={<CartScreen/>}>

            <Route path=':id' element={<CartScreen/>}/>

            </Route>

            <Route path='/login/' element={<LoginScreen/>}/>
            <Route path='/login/shipping' element={<ShippingScreen/>}/>
            <Route path='/register' element={<RegisterScreen/>}/>
            <Route path='/profile' element={<ProfileScreen/>}/>
            <Route path='/payement' element={<PayementScreen/>}/>
            <Route path='/placeOrder' element={<PlaceOrderScreen/>}/>
            <Route path='/admin/userlist' element={<UserListScreen/>}/>
            <Route path='/admin/users/:id/edit' element={<UserEditScreen/>}/>
            <Route path='/admin/productlist' element={<ProductListScreen/>}/>
            <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>}/>
            <Route path='/order/:id' element={<OrderScreen/>}/>
            <Route path='/admin/orderlist' element={<OrderListScreen/>}/>


          </Routes>
          
          </Container>

        </main>

        <Footer/>
      </HashRouter>
    );
  } 
}

export default App;

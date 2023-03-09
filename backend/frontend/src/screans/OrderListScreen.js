import React,{useEffect} from 'react'
 import { Button, Table} from 'react-bootstrap'

 import { useNavigate} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
 import Loader from '../component/Loader'
 import Message from '../component/Message'

import { useDispatch,useSelector } from 'react-redux'
import { ListOrder } from '../actions/orderActions'



function OrderListScreen() {
 
    let history = useNavigate()

    const dispatch = useDispatch()

    const orderList = useSelector(state=>state.orderList)
    
    const { loading, error, orders } = orderList

    const usersLogin = useSelector(state=>state.userLogin)
    const {  userInfo } = usersLogin

 

    useEffect(()=>{

        if(userInfo && userInfo.isAdmin){

        dispatch(ListOrder())}

        else

        {
            history('/login')
        }


    },[dispatch,history,userInfo])

 
    return (

    <div>

        <h1> Orders </h1>

        {loading ?(<Loader/>)
        :error 
        ? (<Message variant='danger'>{error}</Message>)
        :(
            <><p>Table</p>
            <Table striped bordered hover responsive className='table-sm'>

                          <thead>
                              <tr> 

                              <th>ID</th>
                              <th>User</th>
                              <th>Date</th>
                              <th>Total</th>
                              <th>Paid</th>
                              <th>Delivered</th>
                              <th></th>

                              </tr>
                              
                          </thead>
                          <tbody>
                              {orders.map(order => (
                                  <tr key={order._id}>
                                    <td>{order._id}</td>
                                      <td>{order.user  && order.user.name}</td>
                                      <td>{order.createdAt.substring(0,10)}</td>
                                      <td>{order.totalPrice} DA</td>
                                      <td>{order.isPaid ?(
                                        order.paidAt.substring(0,10)

                                      ):
                                      (
                                        <i className='fas fa-check' style={{color:'red'}}></i>
                                      )

                                    }

                                    </td>

                                    <td>{order.isDelivred ?(
                                        order.deliveredAt.substring(0,10)

                                      ):
                                      (
                                        <i className='fas fa-check' style={{color:'red'}}></i>
                                      )

                                    }

                                    </td>
                                    


                                    <td>


                                        <LinkContainer to = {`/order/${order._id}`}>

                                            <Button variant='warning' className='btn-sm'>

                                               Details                                                
                                            </Button>
                                                                       
                                        </LinkContainer>
                                    </td>
                                  </tr>
                              ))}
                          </tbody>
                      </Table></>
        )
        }
        
    </div>

  )

}

export default OrderListScreen

import React, { useEffect } from 'react'
import {Row,Col,ListGroup,Image,Card, Button} from 'react-bootstrap'

//import { useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'


import { Link ,useParams,useNavigate} from 'react-router-dom'

import Message from '../component/Message'

import { getOrderDetails,deliverOrder } from '../actions/orderActions'
import Loader from '../component/Loader'

import { ORDER_DELIVER_RESET } from '../constants/OrderConstants'

function OrderScreen() {


 const { id } = useParams();
 const history = useNavigate()
    
    const dispatch = useDispatch()

    
    const orderDetails = useSelector(state=>state.orderDetails)

    const {order, error, loading} = orderDetails
 
    const orderDeliver = useSelector(state=>state.orderDeliver)

    const {sucess:sucessDeliver,loading:loadingDeliver} = orderDeliver
    const userLogin = useSelector(state=>state.userLogin)

    const { userInfo } = userLogin

    if(!loading && !error){

    order.itemsPrice = order.orderItems.reduce((acc,item)=> acc + item.price * item.qty,0).toFixed(2)

    }
    
    useEffect(()=>{
        if (!userInfo){
           history('/login')
    
        }



        if(!order || order._id !== Number(id) || sucessDeliver){

            dispatch(getOrderDetails(id))
            dispatch({type:ORDER_DELIVER_RESET})

            
        }

    },[order,id,dispatch,sucessDeliver,userInfo,history])


    const deliverHandler=()=>{
        dispatch(deliverOrder(order))
    }

  return loading ? (<Loader/>) 
  :error ? (<Message variant='danger'>{error}</Message>)
  :
   (
    <div>
        <h1>Order: {order._id}</h1>
        <Row>

            <Col md={8}>

                <ListGroup variant='flush'>
                  <ListGroup.Item>

                        <h2> Shipping</h2>
                        <p><strong>Name:</strong> {order.user.name}</p>
                        <p><strong>Name:</strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>



                        <p>

                            <strong>Shipping :</strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city}

                            {'  '}

                            {order.shippingAddress.postalCode},

                            {'   '}

                            {order.shippingAddress.country}


                        </p>
                        {order.isDelivred ? (
                           <h3>Delivrered on <br/>{order.deliveredAt}</h3> 
                        ) :
                        <h2>Not Delivered</h2>

                        }

              
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2> Payement Method</h2>
                        <p>
                            <strong>Method :</strong>

                            {order.payementMethod}
                        
                        </p>

                        {order.isPaid ? (
                           <h3>Paid on <br/>{order.paidAt}</h3> 
                        ) :
                        <Message variant='warning'>Not Paid</Message>

                        }

                    </ListGroup.Item>


                    <ListGroup.Item>
                        <h2> Order Items </h2>


                            {order.orderItems.lenght ===0 ? <Message variant='info'> Your Order Is Empty  </Message>:
                            (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item,index)=>(
                                        <ListGroup.Item key = {index}>
                                            <Row>
                                                <Col md={1}>
                                                <Image src = {item.image} alt = {item.name}  fluid rounded/>
                                                </Col>

                                                <Col>

                                                    <Link  to={`/products/${item.product}`}> {item.name}</Link>
                                                </Col>
                                                <Col md={4}
                                                >
                                                    {item.qty} X {item.price} = {(item.qty * item.price).toFixed(2)} DA

                                                </Col>
                                                

                                            </Row>


                                        </ListGroup.Item>

                                    ))}

                                </ListGroup>
                            )
                            }
                            
                        
                    </ListGroup.Item>


                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant = 'flush'>
                        <ListGroup.Item>
                            <h2> Order Summary</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>

                            <Row>
                            <Col> Item :</Col>
                            <Col> {order.itemsPrice} DA</Col>

                            </Row>

                        </ListGroup.Item>


                        
                        <ListGroup.Item>
                            <Row>
                            <Col> Shipping :</Col>
                            <Col> {order.shippingPrice} DA</Col>


                            </Row>

                        </ListGroup.Item>


                        
                        
                        <ListGroup.Item>
                            <Row>
                            <Col> Tax :</Col>
                            <Col> {order.taxPrice} DA</Col>

                            
                            </Row>

                        </ListGroup.Item>


                        
                        <ListGroup.Item>
                            <Row>
                            <Col> Total :</Col>
                            <Col> {order.totalPrice} DA</Col>
                            </Row>

                        </ListGroup.Item>

<ListGroup.Item>
    {error && <Message variant = 'danger'>{error}</Message>}

</ListGroup.Item>
                    </ListGroup>

                </Card>

                <ListGroup>
    
<br/>
<br/>

    {loadingDeliver && <Loader/>}
    {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
        
        <ListGroup>
            
            <Button type='button' className = 'btn btn-block'
            onClick={deliverHandler}
            >
                Mark as  Delivered 
            </Button>
        </ListGroup>
    )}
</ListGroup>


            </Col>

        </Row>
      
    </div>
  )
}

export default OrderScreen

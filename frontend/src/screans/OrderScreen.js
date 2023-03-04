import React, { useEffect } from 'react'
import {Row,Col,ListGroup,Image,Card} from 'react-bootstrap'

//import { useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'


import { Link ,useParams} from 'react-router-dom'

import Message from '../component/Message'

import { getOrderDetails } from '../actions/orderActions'
import Loader from '../component/Loader'



function OrderScreen() {


 const { id } = useParams();
    
    const dispatch = useDispatch()

    

    const orderDetails = useSelector(state=>state.orderDetails)

    const {order, error, loading} = orderDetails
 

    if(!loading && !error){

    order.itemsPrice = order.orderItems.reduce((acc,item)=> acc + item.price * item.qty,0).toFixed(2)

    }
    
    useEffect(()=>{

        if(!order || order._id !== Number(id)){

            dispatch(getOrderDetails(id))

        }

    },[order,id,dispatch])

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
                        {order.isDelivered ? (
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

            </Col>

        </Row>
      
    </div>
  )
}

export default OrderScreen

import React, { useEffect } from 'react'
import {Row,Col,ListGroup,Image,Card, Button} from 'react-bootstrap'

//import { useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'


import { Link ,useNavigate} from 'react-router-dom'

import CheckoutSteps from '../component/CheckoutSteps'
import Message from '../component/Message'

import { createOrder } from '../actions/orderActions'

import { ORDER_CREATE_RESET } from '../constants/OrderConstants'


function PlaceOrderScreen() {

    
    const dispatch = useDispatch()

    let history = useNavigate();

    const orderCreate = useSelector(state=>state.orderCreate)

    const {order, error, success} = orderCreate
 
    const cart = useSelector(state=>state.cart)

    const { shippingAdress, payementMethod ,cartItems} = cart
    
    cart.itemsPrice = cartItems.reduce((acc,item)=> acc + item.price * item.qty,0).toFixed(2)
    
    cart.shippingPrice =     (cart.itemsPrice > 2000 ? 0 :10).toFixed(2)

    cart.taxPrice = ((0.082) * cart.itemsPrice).toFixed(2)

    cart.totalPrice = (Number(cart.itemsPrice)+Number(cart.shippingPrice)+Number(cart.taxPrice)).toFixed(2)

    useEffect(()=>{

        if (success){

            history(`/order/${order._id}`)
            dispatch({type:ORDER_CREATE_RESET})
            
        }

    },[success,history,order,dispatch])

    const placeOrderHandler=()=>{

        dispatch(createOrder({

            orderItems:cartItems,
            shippingAdress:shippingAdress,
            payementMethod:payementMethod,
            itemsPrice:cart.itemsPrice,
            shippingPrice:cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice:cart.totalPrice

        }))
        
        console.log(createOrder)

    }

  return (
    <div>

        <CheckoutSteps step1 step2 step3 step4 />

        <Row>

            <Col md={8}>

                <ListGroup variant='flush'>

                    <ListGroup.Item>

                        <h2> Shipping</h2>

                        <p>

                            <strong>Shipping :</strong>

                            {shippingAdress.adress}, {shippingAdress.city}
                            {'   '}
                            {shippingAdress.postal},
                            {'   '}
                            {shippingAdress.country}

                        </p>

                    </ListGroup.Item>



                    <ListGroup.Item>
                        <h2> Payement Method</h2>
                        <p>
                            <strong>Method :</strong>

                            {payementMethod}
                        
                        </p>

                    </ListGroup.Item>


                    <ListGroup.Item>
                        <h2> Order Items </h2>


                            {cartItems.lenght ===0 ? <Message variant='info'> Your Cart Is Empty  </Message>:
                            (
                                <ListGroup variant='flush'>
                                    {cartItems.map((item,index)=>(
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
                            <Col> {cart.itemsPrice} DA</Col>


                            </Row>

                        </ListGroup.Item>


                        
                        <ListGroup.Item>
                            <Row>
                            <Col> Shipping :</Col>
                            <Col> {cart.shippingPrice} DA</Col>


                            </Row>

                        </ListGroup.Item>


                        
                        
                        <ListGroup.Item>
                            <Row>
                            <Col> Tax :</Col>
                            <Col> {cart.taxPrice} DA</Col>

                            
                            </Row>

                        </ListGroup.Item>


                        
                        <ListGroup.Item>
                            <Row>
                            <Col> Total :</Col>
                            <Col> {cart.totalPrice} DA</Col>
                            </Row>

                        </ListGroup.Item>

                        <ListGroup.Item>
                            {error &&<Message variant ='danger' >{error} </Message> }
                            

                        </ListGroup.Item>


<ListGroup.Item>
    {error && <Message variant = 'danger'>{error}</Message>}

</ListGroup.Item>
<ListGroup.Item>
    <Button type = 'button' className='btn-block mx-3'  disabled ={cartItems ===0} onClick={placeOrderHandler} > Place Order</Button>


</ListGroup.Item>

                    </ListGroup>
                </Card>

            </Col>

        </Row>
      
    </div>
  )
}

export default PlaceOrderScreen

import React,{useEffect} from 'react'
import {Link, useLocation,useParams,useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { Row,Col,ListGroup,Image,Form, Button,Card} from 'react-bootstrap'

import { addToCart ,removeFromCart} from '../actions/cartActions'


import Message from '../component/Message'


function CartScreen() {

    const { id } = useParams();


    const location = useLocation();

    let history = useNavigate();

    const qty = location.search ? Number(location.search.split('=')[1]): 1

    console.log('qty:', qty)

    const dispatch = useDispatch()

    const cart = useSelector(state=>state.cart)

    const {cartItems} = cart
    
    useEffect(()=>{

        if(id){

            dispatch(addToCart(id,qty))

        }

    },[dispatch,id,qty])

    
const remveItemHandler = (id)=>{

dispatch(removeFromCart(id))

}

const checkoutHandler=()=>{

history('/login?redirect=shipping')

}


  return (
    <Row>

      <Col md={8}>
        <h1> Shopping cart</h1>
        {cartItems.length ===0 ?
        ( 
        <Message variant='info'>
          Your cart is empty <Link to='/'> Go Back </Link>

        </Message>)
        :(
          <ListGroup variant = 'flush'>
            {cartItems.map(item=>(
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Link to={`/products/${item.product}`}>
                    <Image src = {item.image} alt={item.name} fluid rounded/>
                    </Link>
                  </Col>

                  <Col md={3}>

                    <Link to={`/products/${item.product}`} style={{ textDecoration: 'none' }}> <h4 style={{color:'black'}}>{item.name}</h4></Link>


                  </Col>

                  <Col md={2}>
                      {item.price} DA
                  </Col>

                  <Col md={3}>
                  <Form.Control 
                    as="select"
                    value={item.qty}

                    onChange = {(e)=>dispatch(addToCart(item.product,Number(e.target.value)))}>



                      {

                        [...Array(item.countInStock).keys()].map((x)=>(

                          <option key = {x + 1 } value = {x + 1}>
                          
                            {x + 1}
                          
                          </option>

                        ))
                      }

                      

                    </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button type='button' variant = 'light' onClick={()=>{remveItemHandler(item.product)}}><i className='fas fa-trash'></i></Button>
                  </Col>

          
                </Row>
              
              </ListGroup.Item>

            ))}

          </ListGroup>
        )
        }


      </Col>

      <Col md={4}>

        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2> subTotal ({cartItems.reduce((acc,item)=>acc + item.qty,0)}) items</h2>
             Total  Price : {cartItems.reduce((acc,item)=>acc + item.qty*item.price,0)} DA

            </ListGroup.Item>

            <ListGroup.Item>
              <Button type = 'button' className='btn-block py-3 px-3 my-3 mx-5' disabled = {cartItems.length === 0}
              onClick = {checkoutHandler}
               >
                Proceed To Checkout
              
              </Button>

            </ListGroup.Item>

          </ListGroup>

        </Card>



      </Col>

    </Row>
  )
}

export default CartScreen

import React,{useEffect,useState} from 'react'

import {Link,useParams} from 'react-router-dom'

import { useNavigate } from 'react-router-dom';


import { Row,Col, Image, ListGroup,Button,Card,Form } from 'react-bootstrap'

import Rating from '../component/Rating'

import { listProductDetails } from '../actions/productActions'

import { useDispatch,useSelector } from 'react-redux'

import Loader from '../component/Loader'

import Message from '../component/Message'

function ProductScreen(props) {


const [qty,setQty] = useState(1)

 const { id } = useParams();

 let history = useNavigate();

 console.log(id)

const dispatch = useDispatch()

const productdetails = useSelector(state=>state.productDetails)

const {loading, error,product} = productdetails

useEffect(()=>{
   
     dispatch(listProductDetails(id))    
     
  },[dispatch,id])

  let Product = product



  const addToCardHandler = ()=>{

    history(`/card/${id}?qty=${qty}`)
    
  }



  return (

    <div>
      
<Link to='/' className='btn btn-light my-3 mx-4  '> Go Back</Link>

{loading ? <Loader/>
        : error ?  <Message variant = 'danger'>{error}</Message>
        :

        <Row>
          
        <Col md={6}>
          <Image src={Product.image} alt={Product.name} fluid/>

        </Col>
        <Col md= {3}>
        <ListGroup variant='flush'>
            <ListGroup.Item>

              <h3> {Product.name}</h3>

            </ListGroup.Item>

            <ListGroup.Item>
            
            <Rating value = {Product.rating} text = {`${Product.numReviews} reviews`} color = {'#f8e825'} />

              
            </ListGroup.Item>

            <ListGroup.Item>
               Price : {Product.price} DA
            </ListGroup.Item>

            <ListGroup.Item>
              Description : {Product.description}
            </ListGroup.Item>

          </ListGroup>
        </Col>

        <Col md={3}>

          <Card>
            <ListGroup variant='flush'>

              <ListGroup.Item>
                <Row>
                  <Col>Price : </Col>
                  <Col> {Product.price} DA</Col>
                </Row>

              </ListGroup.Item>
        
              <ListGroup.Item>
                
                <Row>

                  <Col>Status : </Col>
                  <Col> {Product.countInStock > 0 ? 'inStock' : 'out Of Stok ' }</Col>

                </Row>
              </ListGroup.Item>

              {product.countInStock >0 && (

                <ListGroup>
                  <Row>
                    <Col>
                    Qty
                    </Col>

                    <Col xs="6"  md={6} className='my-1 my-2 mx-3 '>
                    <Form.Control 
                    as="select"
                    value={qty}
                    onChange = {(e)=>setQty(e.target.value)}>

                      {

                        [...Array(Product.countInStock).keys()].map((x)=>(

                          <option key = {x + 1 } value = {x + 1}>
                          
                            {x + 1}
                          
                          </option>

                        ))
                      }

                      

                    </Form.Control>
                    </Col>
                  </Row>


                  </ListGroup>
              )}
              

              <ListGroup.Item className='my-3 mx-3' >
<Button onClick={addToCardHandler} className='btn-block' type='button' style={{margin:'30px'}} disabled={Product.countInStock === 0}> Add to Card </Button>

            </ListGroup.Item>
              
            </ListGroup>
            
            
          </Card>

        </Col>
  


      </Row>


        }



      
    </div>

  )

}



export default ProductScreen
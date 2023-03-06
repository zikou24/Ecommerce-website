import React,{useEffect,useState} from 'react'

import {Link,useParams} from 'react-router-dom'

import { useNavigate } from 'react-router-dom';


import { Row,Col, Image, ListGroup,Button,Card,Form } from 'react-bootstrap'

import Rating from '../component/Rating'

import { listProductDetails } from '../actions/productActions'

import { useDispatch,useSelector } from 'react-redux'

import Loader from '../component/Loader'

import Message from '../component/Message'
import { createProductReview } from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

function ProductScreen(props) {


const [qty,setQty] = useState(1)

const [rating,setRating] = useState(0)

const [comment,setComment] = useState('')

 const { id } = useParams();

 let history = useNavigate();

 console.log(id)

const dispatch = useDispatch()

const productdetails = useSelector(state=>state.productDetails)

const {loading, error,product} = productdetails


const userLogin = useSelector(state=>state.userLogin)

const { userInfo } = userLogin


const productReviewCreate = useSelector(state=>state.productReviewCreate)

const {loading:loadingProductReview, error:errorProductReview,success:successProductReview} = productReviewCreate


useEffect(()=>{

  if (successProductReview){
    setRating(0)
    setComment('')
    dispatch({type:PRODUCT_CREATE_REVIEW_RESET})

  }
   
     dispatch(listProductDetails(id))    
     
  },[dispatch,id,successProductReview])

  let Product = product

  const addToCardHandler = ()=>{

    history(`/card/${id}?qty=${qty}`)
    
  }

  const submitHandler =(e)=>{

    dispatch(createProductReview(id,{rating,comment}

      ))

  } 



  return (

    <div>
      
<Link to='/' className='btn btn-light my-3 mx-4  '> Go Back</Link>

{loading ? <Loader/>
        : error ?  <Message variant = 'danger'>{error}</Message>
        :(
         <div>
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
      <Row>
        <Col md={6}>
          <h4>Reviews</h4>

          {product.reviews.length ===0 && <Message variant = 'info'>No Reviews</Message>}
          <ListGroup variant='flush'>
            {product.reviews.map((review)=>(
              <ListGroup.Item key = {review._id}>
                <strong>
                  {review.name}

                </strong>
                <Rating value = {review.rating} color = '#f8e825'/>
                <p>{review.createdAt.substring(0,10)}</p>
                <p>{review.comment}</p>


              </ListGroup.Item>

            ))}

            <ListGroup.Item>
              {loadingProductReview && <Loader/>}
              {successProductReview && <Message variant='success'> Review Sumbitted</Message>}
              {errorProductReview && <Message variant='danger'> {errorProductReview}</Message>}
              


              <h4>Write A Review</h4>
              {userInfo ? (
                <Form onSubmit={submitHandler}>

                  <Form.Group controlId='rating'>
                    <Form.Label>
                      Rating
                    </Form.Label>
                    <Form.Control as = 'select' value = {rating}

                    onChange = {(e)=> setRating(e.target.value)}

                    >
                      <option value = ''> Select ...</option>
                      <option value = '1'>  1 - Poor</option>
                      <option value = '2'> 2 - Fair</option>
                      <option value = '3'> 3 - Good</option>
                      <option value = '4'> 4 - Very Good</option>
                      <option value = '5'> 5 - Excellent</option>

                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId='comment'>

                    <Form.Label>Review</Form.Label>
                    <Form.Control as = 'textarea' row= '5' value = {comment} onChange={(e)=>setComment(e.target.value)}></Form.Control>
              
                  </Form.Group>
                  <br/>
                  <br/>
                  <Button
                  disabled = {loadingProductReview}
                  type = 'submit'
                  variant='primary'
                  style={{backgroundColor:'black',width:'150px'}}

                  >
                    Submit

                  </Button>


                </Form>
              ) : (
                <Message  variant=''>Please <Link to='/login'> Login</Link> to write a review</Message>
              )}

            </ListGroup.Item>

          </ListGroup>

          
        </Col>
      </Row>
      </div>
)

      }



      
    </div>

  )

}



export default ProductScreen
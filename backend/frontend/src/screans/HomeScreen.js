import React ,{useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../component/Product'
import { useLocation} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'

import { listProducts } from '../actions/productActions'
import Loader from '../component/Loader'
import Message from '../component/Message'
import Paginate from '../component/Paginate'
import ProductCaresoul from '../component/ProductCaresoul'

function HomeScreen() {

    //const histroy = useNavigate()
    let location = useLocation()

    const dispatch = useDispatch()


    const productList = useSelector(state=>state.productList)
    
    const {error,loading,products,page,pages}  = productList

    let keyword = location.search

    console.log(keyword)

     useEffect(()=>{

        dispatch(listProducts(keyword))

   },[dispatch,keyword])
   


  return (

    <div>
        {!keyword && <ProductCaresoul/> }
      
        <h1> Latest Product</h1>
  
        {loading ? <Loader/>
        : error ?  <Message variant = 'danger'>{error}</Message>
        : 
        <div>
            
        <Row>

        {products.map(product=>(
            
            <Col key = {product._id} sm={12} md = {6} lg={4} xl={3} >
            
                <Product product = {product}/>                
            
            </Col>

        ))}
        
    </Row>

<Paginate page = {page} pages = {pages} keyword = {keyword}/>
    </div>
}
      
        </div>
  )
}

export default HomeScreen
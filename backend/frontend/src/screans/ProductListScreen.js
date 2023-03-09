import React,{useEffect} from 'react'

import {Button,Table,Row,Col} from 'react-bootstrap'

import { useNavigate,useLocation} from 'react-router-dom'
import Loader from '../component/Loader'
import Message from '../component/Message'
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { deleteProduct ,createProduct} from '../actions/productActions'

import PaginateAdmin from '../component/PagintateAdmin'

import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

function ProductListScreen() {

    let history = useNavigate()

    let location = useLocation()

    const dispatch = useDispatch()

    const productssList = useSelector(state=>state.productList)
    
    const { loading, error, products,pages,page } = productssList
    
    const usersLogin = useSelector(state=>state.userLogin)

    const {  userInfo } = usersLogin

    const deleteProductss = useSelector(state=>state.productDelete)

    const { success:successDeleted } = deleteProductss


    
    const createProductss = useSelector(state=>state.productcreate)

    const {success:successCreated ,product:createdProduct} = createProductss

    let keyword = location.search

    useEffect(()=>{

        dispatch({type:PRODUCT_CREATE_RESET})
        
        if(!userInfo.isAdmin){
            history('/login')
        }
        if (successCreated){

            history(`/admin/product/${createdProduct._id}/edit`)
            
        }
        else{
            dispatch(listProducts(keyword))
        }
    },[dispatch,history,successDeleted,successCreated,createdProduct,userInfo,keyword])
    
const createProductHandler=()=>{

    dispatch(createProduct())

}

const deleteHandler=(id)=>{

if(window.confirm('Are you Sure you want to delete This product ? ')){
    
    dispatch(deleteProduct(id))

}
    
}


    return (

        <div>
    <Row className='align-items-center'>
        <Col>

        </Col>

        <Col className='text-right'>

        <Button className='my-3' onClick={createProductHandler}>

            <i className='fas fa-plus'></i> Create Product

        </Button>

        </Col>
        
    </Row>


    <h1> Products  </h1>

{loading ?(<Loader/>)
:error 
? (<Message variant='danger'>{error}</Message>)
:(
    <>
    <Table striped bordered hover responsive className='table-sm'>

                  <thead>
                      <tr> 

                      <th>ID</th>
                      <th>Productname</th>

                      <th>Price </th>
                      <th>CATEGORY</th>
                      <th>BRAND</th>

    

                      <th></th>

                      </tr>
                      
                  </thead>
                  <tbody>
                      {products.map(product => (
                          <tr key={product._id}>

                            <td>{product._id}</td>

                              <td>{product.name}</td>
                              <td>{product.price}</td>
                              <td>{product.category}</td>
                              <td>{product.brand}</td>
                              
                              <td></td>

     

                            <td>

                                <LinkContainer to = {`/admin/product/${product._id}/edit`}>
                                
                                    <Button variant='light' className='btn-sm'>

                                        <i className='fas fa-edit'></i>
                                        
                                    </Button>
                                    
                                </LinkContainer>

                                    <Button variant='danger' className='btn-sm' onClick={()=> deleteHandler(product._id)}>

                                        <i className='fas fa-trash'></i>

                                    </Button>

                            </td>

                          </tr>

                      ))}

                  </tbody>

              </Table>
              <PaginateAdmin page = {page} pages = {pages} isAdmin = {true} />

              </>       
)
}

</div>
      )
}

export default ProductListScreen

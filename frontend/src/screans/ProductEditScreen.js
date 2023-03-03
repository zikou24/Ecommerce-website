import React,{useState,useEffect} from 'react'
 import { Form,Button} from 'react-bootstrap'
import { Link,useParams,useNavigate} from 'react-router-dom'
//import Loader from '../component/Loader'
 //import Message from '../component/Message'
import { useDispatch,useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import FormContainer from '../component/FormContainer'

import { updateProduct } from '../actions/productActions'

import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

function ProductEditScreen() {

   //const location =  useLocation()
    let history = useNavigate();

    const { id } = useParams();
    
    const  [name,setName] = useState('')
    const  [price,setPrice] = useState(0)
    const  [image,setImage] = useState('')
    const  [brand,setBrand] = useState('')
    const  [category,setCategory] = useState('')
    const  [countInStock,setCountInStock] = useState(0)
    const  [description,setDescription] = useState('')
    //const  [uploading,setUploading] = useState(false)


    const dispatch = useDispatch()
    
    const productDetails =    useSelector(state=>state.productDetails)
    
    const {product} = productDetails

    const productUpdate =    useSelector(state=>state.productUpdate)
    
    const {success:successUpdate} = productUpdate

    //const userUpdate = useSelector(state=>state.userUpdate)
    
   // const {loading:loadingUpdate,error:errorUpdate ,success:successUpdate } = userUpdate

    useEffect(()=>{

        if (successUpdate)


         {

            dispatch({type:PRODUCT_UPDATE_RESET})

            history('/admin/productlist')

        }

        else{

        if( product._id !==Number(id)){
             dispatch(listProductDetails(id))
         }

         else

         {

        //     setName(user.name)

            setName(product.name)
            setPrice(product.price)
            setBrand(product.brand)
            setCategory(product.category)
            setDescription(product.description)
            setCountInStock(product.countInStock)
            setImage(product.image)

        }

}

    
    },[product,id,dispatch,successUpdate,history])
    
    const submitHandler=(e)=>{

        e.preventDefault()

         dispatch(updateProduct({_id:product._id,name,price,brand,category,image,description,countInStock}))
        
    }


    // const uploadFileHandler=  async(e)=>{

    //  console.log('imaee')

    // }

  return (

    <div>
        
        <Link to='/admin/productList'>
            Go Back
        </Link>
    <FormContainer>

 <h1> Edit Product</h1>

    
<Form onSubmit = {submitHandler}>

    <Form.Group controlId='name'>

        <Form.Label>Name </Form.Label>
        <Form.Control  type= 'name' placeholder='Enter your Name' value = {name} onChange ={(e)=>setName(e.target.value)}>
        </Form.Control>

    </Form.Group>
    
<Form.Group controlId='price'>

        <Form.Label>Price</Form.Label>

        <Form.Control  type= 'number' placeholder='Enter Price' value = {price} onChange ={(e)=>setPrice(e.target.value)}>

        </Form.Control>

    </Form.Group>


    <Form.Group controlId='brand'>

        <Form.Label>Brand</Form.Label>
        <Form.Control  type= 'name' placeholder='Enter Brand' value = {brand} onChange ={(e)=>setBrand(e.target.value)}>
        </Form.Control>

    </Form.Group>

    <Form.Group controlId='category'>

<Form.Label>Category</Form.Label>

<Form.Control  type= 'name' placeholder='Enter category' value = {category} onChange ={(e)=>setCategory(e.target.value)}>    

</Form.Control>
</Form.Group>


<Form.Group controlId='description'>

        <Form.Label>description</Form.Label>

        <Form.Control  type= 'name' placeholder='Enter description' value = {description} onChange ={(e)=>setDescription(e.target.value)}>

        </Form.Control>

    </Form.Group>





<Form.Group controlId='description'>

        <Form.Label>image</Form.Label>

        <Form.Control  type= 'name' placeholder='Enter description' value = {image} onChange ={(e)=>setImage(e.target.value)}>

        </Form.Control>

       

    </Form.Group>

    
<Form.Group controlId='countInStock'>

<Form.Label>Stock</Form.Label>

<Form.Control  type= 'number' placeholder='Enter countInStock' value = {countInStock} onChange ={(e)=>setCountInStock(e.target.value)}>

</Form.Control>

</Form.Group>


    <Button type='submit' variant = 'primary'  className= 'my-3 width-30'  > Update </Button>   

    </Form> 

  </FormContainer>

  </div>

  )

}


export default ProductEditScreen


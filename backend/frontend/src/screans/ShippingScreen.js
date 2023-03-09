import React,{useState,useEffect} from 'react'

import { Form,Button} from 'react-bootstrap'

import { useNavigate} from 'react-router-dom'

import { useDispatch,useSelector} from 'react-redux'

import FormContainer from '../component/FormContainer'
import { saveShippingAdress } from '../actions/cartActions'

import CheckoutSteps from '../component/CheckoutSteps'

function ShippingScreen() {

   let history = useNavigate();

   const cart =  useSelector(state=>state.cart)

   const { shippingAdress } = cart

   const dispatch=useDispatch()

    const  [adress,setAdress] = useState('')

    const  [city,setCity] = useState('')

    const  [postal,setPostal] = useState('')
    
    const  [country,setCountry] = useState('')


useEffect(()=>{

  if (shippingAdress) {

    setAdress(shippingAdress.adress)
    setCity(shippingAdress.city)
    setPostal(shippingAdress.postal)
    setCountry(shippingAdress.country)
    
  }



},[shippingAdress])
    const submitHandler=(e)=>{

      e.preventDefault()
      
      dispatch(saveShippingAdress({adress,city,postal,country}))

      history('/payement')

    }
    
  return (
    <FormContainer>

      <CheckoutSteps step1 step2 />

     <h1> Shipping</h1>

     <Form onSubmit={submitHandler}>
        <Form.Group controlId  = 'adress'>
            <Form.Label>Adress</Form.Label>
            <Form.Control required type='text' placeholder='Enter Adress' value = {adress ? adress : ''} onChange={(e)=>setAdress(e.target.value)} >

            </Form.Control>
        </Form.Group>


        <Form.Group controlId  = 'city'>
            <Form.Label>City</Form.Label>
            <Form.Control required type='text' placeholder='Enter City' value = {city ? city : ''} onChange={(e)=>setCity(e.target.value)} >
        
            </Form.Control>
            </Form.Group>



            <Form.Group controlId  = 'postal'>

<Form.Label>Postal</Form.Label>

<Form.Control required type='text' placeholder='Enter Postal' value = {postal ? postal : ''} onChange={(e)=>setPostal(e.target.value)} >
</Form.Control>
</Form.Group>


        
        <Form.Group controlId  = 'country'>
            <Form.Label>Country</Form.Label>
            <Form.Control required type='text' placeholder='Enter Country' value = {country ? country : ''} onChange={(e)=>setCountry(e.target.value)} >
            </Form.Control>

        </Form.Group>


        
        <Button type='submit' variant = 'primary' className='my-3 py-2 justify-content-md-center'  > Continue</Button>
        


     </Form>

    </FormContainer>
  )
}

export default ShippingScreen

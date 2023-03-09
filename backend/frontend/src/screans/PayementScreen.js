
import React,{useState} from 'react'

import { Form,Button,Col} from 'react-bootstrap'

import { useNavigate} from 'react-router-dom'

import { useDispatch,useSelector} from 'react-redux'

import FormContainer from '../component/FormContainer'
import { savePayementMethod } from '../actions/cartActions'

import CheckoutSteps from '../component/CheckoutSteps'


function PayementScreen() {

    let history = useNavigate();


    const cart =  useSelector(state=>state.cart)

    const dispatch = useDispatch()

    const { shippingAdress } = cart

    const [payementMethod,setPayementMethod] = useState('Paypal')
    
    if (!shippingAdress.adress) {
        history('/login/shipping')

    }

 const submitHandler=(e)=>{

      e.preventDefault()
      
      dispatch(savePayementMethod(payementMethod))

      history('/placeOrder')
      
    }


  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <Form onSubmit={submitHandler}>

            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>

                <Form.Check type='radio' label='Paypal or Credit Card' id='paypal' name='payementMethod' checked onChange={(e)=>setPayementMethod(e.target.value)}>
                </Form.Check>

                </Col>
            </Form.Group>

            <Button type='submit' variant = 'primary' className='my-3'> Continue</Button>

        </Form>

      
    </FormContainer>
  )
}

export default PayementScreen

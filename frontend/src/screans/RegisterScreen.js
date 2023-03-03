import React,{useState,useEffect} from 'react'
 import { Form,Button,Row,Col} from 'react-bootstrap'

import { Link,useLocation ,useNavigate} from 'react-router-dom'


import Loader from '../component/Loader'
 import Message from '../component/Message'

import { useDispatch,useSelector } from 'react-redux'

 import { register } from '../actions/userActions'
 
import FormContainer from '../component/FormContainer'


function RegisterScreen() {

    const location =  useLocation()
    let history = useNavigate();

    const  [name,setName] = useState('')
    const  [email,setEmail] = useState('')
    const  [password,setPassword] = useState('')
    const  [confirmPassword,setConfirmPassword] = useState('')
    const  [message,setMessage] = useState('')


    const dispatch = useDispatch()
  
    const redirect = location.search ? location.search.split('=')[1]: '/'

    const userRegister = useSelector(state=>state.userRegister)

    const {loading,error,userInfo} = userRegister

    useEffect(()=>{

        if (userInfo) {

            history(redirect)

        }


    },[history,userInfo,redirect])


    const submitHandler=(e)=>{

        e.preventDefault()

        if(password !== confirmPassword){
            setMessage('password do not match')

        }

        else 

        {

            dispatch(register(name,email,password))

        }

    }
    
  return (

    
    <FormContainer>

 <h1> Register page</h1>

{ message && <Message variant='danger'>{message}</Message>}

{error && <Message variant='danger'>{error}</Message>}

{loading && <Loader/>}

<Form onSubmit = {submitHandler}>
    
<Form.Group controlId='name'>

        <Form.Label>Name </Form.Label>

        <Form.Control required type= 'name' placeholder='Enter your Name' value = {name} onChange ={(e)=>setName(e.target.value)}>
            
        </Form.Control>

    </Form.Group>
    
<Form.Group controlId='email'>

        <Form.Label>Email Adress </Form.Label>

        <Form.Control required type= 'email' placeholder='Enter Email' value = {email} onChange ={(e)=>setEmail(e.target.value)}>

        </Form.Control>

    </Form.Group>


    
    <Form.Group controlId='password'>
        <Form.Label> Password </Form.Label>
        <Form.Control required type= 'password' placeholder='Enter Password' value = {password} onChange ={(e)=>setPassword(e.target.value)}>
        </Form.Control>

    </Form.Group>

    
    <Form.Group controlId='passwordConfirm'>
        <Form.Label> Confirm Password </Form.Label>
        <Form.Control required type= 'password' placeholder='Confirm Password' value = {confirmPassword} onChange ={(e)=>setConfirmPassword(e.target.value)}>

        </Form.Control>

    </Form.Group>

    <Button type='submit' variant = 'primary'  className= 'my-3 width-30'  > Registger </Button>   

    </Form> 

    <Row className = "py-3">
    <Col>
    HaveAn Account ? <Link 
    to={redirect ? `/login?redirect=${redirect}` : '/login'}

    > login
    </Link>
    </Col>

</Row>

  </FormContainer>
  )
}

export default RegisterScreen

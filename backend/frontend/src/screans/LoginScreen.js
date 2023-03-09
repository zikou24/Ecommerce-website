import React,{useState,useEffect} from 'react'

 import { Form,Button,Row,Col} from 'react-bootstrap'

import { Link,useLocation ,useNavigate} from 'react-router-dom'


import Loader from '../component/Loader'
 import Message from '../component/Message'

import { useDispatch,useSelector } from 'react-redux'

 import { login } from '../actions/userActions'

import FormContainer from '../component/FormContainer'

function LoginScreen() {

    const location =  useLocation()

    let history = useNavigate();

    const  [email,setEmail] = useState('')

    const  [password,setPassword] = useState('')

    const dispatch = useDispatch()
  
    const redirect = location.search ? location.search.split('=')[1]: '/'

    const userLogin = useSelector(state=>state.userLogin)

    const {loading,error,userInfo} = userLogin

    useEffect(()=>{

        if (userInfo) {

            history(redirect)

        }
        
    },[history,userInfo,redirect])


    const submitHandler=(e)=>{

        e.preventDefault()

        dispatch(login(email,password))
        
    }


  return (

<FormContainer>
<h1> login page</h1>
{error && <Message variant='danger'>{error}</Message>}
{loading && <Loader/>}

<Form onSubmit = {submitHandler}>
    <Form.Group controlId='email'>
        <Form.Label>Email Adress </Form.Label>

        <Form.Control type= 'email' placeholder='Enter Email' value = {email} onChange ={(e)=>setEmail(e.target.value)}>

        </Form.Control>

    </Form.Group>

    <Form.Group controlId='password'>
        <Form.Label> Password </Form.Label>
        <Form.Control type= 'password' placeholder='Enter Password' value = {password} onChange ={(e)=>setPassword(e.target.value)}>

        </Form.Control>

    </Form.Group>
<Button type='submit' variant = 'primary'  className= 'my-3 width-30'  > Sign In </Button>

</Form>

<Row className = "py-3">
    <Col>
    NewCuStomer ? <Link 
    to={redirect ? `/register?redirect=${redirect}` : '/register'}
    > Register
    </Link>
    </Col>

</Row>

    
</FormContainer>


)
}

export default LoginScreen

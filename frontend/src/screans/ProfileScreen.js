import React,{useEffect,useState} from 'react'

import { Form,Button,Row,Col} from 'react-bootstrap'

import {useNavigate} from 'react-router-dom'

import Loader from '../component/Loader'

import Message from '../component/Message'

import { useDispatch,useSelector } from 'react-redux'
import { getUserDetails } from '../actions/userActions'


function ProfileScreen() {

    let history = useNavigate();

    const  [name,setName] = useState('')
    const  [email,setEmail] = useState('')
    const  [password,setPassword] = useState('')
    const  [confirmPassword,setConfirmPassword] = useState('')
    const  [message,setMessage] = useState('')


    const dispatch = useDispatch()
  

    const userDetail = useSelector(state=>state.userDetails)

    const { user , loading , error } = userDetail
    
    const userLogin = useSelector(state=>state.userLogin)

    const {userInfo} = userLogin


    useEffect(()=>{

        if (!userInfo) {

            history('/login')

        }else {

            if (!user || !user.name || userInfo._id!== user._id)

            {

                dispatch(getUserDetails('profile'))

            } 
            else 

            {

                setName(user.name)
                setEmail(user.email)                
            }

        }
        
    },[dispatch,history,userInfo,user])

    const submitHandler=(e)=>{

        e.preventDefault()

        if(password !== confirmPassword){
            setMessage('password do not match')

        }else {
            console.log('update Profile ')

        }

    }

  return (
    <Row>

        <Col md= {3}>
            <h2> User Profile  </h2>

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
        <Form.Control  type= 'password' placeholder='Enter Password' value = {password} onChange ={(e)=>setPassword(e.target.value)}>
        </Form.Control>
    </Form.Group>


    <Form.Group controlId='passwordConfirm'>
        <Form.Label> Confirm Password </Form.Label>
        <Form.Control  type= 'password' placeholder='Confirm Password' value = {confirmPassword} onChange ={(e)=>setConfirmPassword(e.target.value)}>

        </Form.Control>

    </Form.Group>

    <Button type='submit' variant = 'primary'  className= 'my-3 width-30'  > Update </Button>   

    
    </Form> 



        </Col>
        <Col md = {9}>

            <h2> My Orders </h2>

        </Col>
      
    </Row>
  )
}

export default ProfileScreen

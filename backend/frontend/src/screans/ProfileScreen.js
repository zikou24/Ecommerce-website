import React,{useEffect,useState} from 'react'

import { Form,Button,Row,Col,Table} from 'react-bootstrap'

import {useNavigate} from 'react-router-dom'

import Loader from '../component/Loader'

import Message from '../component/Message'

import { useDispatch,useSelector } from 'react-redux'
import { getUserDetails } from '../actions/userActions'
import { ListMyOrder } from '../actions/orderActions'
import {LinkContainer } from 'react-router-bootstrap'

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

    const orderListMy = useSelector(state=>state.orderListMy)

    const {loading: loadingOrders, error:errorOrders, orders } = orderListMy



    useEffect(()=>{

        if (!userInfo) {

            history('/login')

        }else {

            if (!user || !user.name || userInfo._id!== user._id)

            {

                dispatch(getUserDetails('profile'))
                dispatch(ListMyOrder())

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
            {loadingOrders ? (
                <Loader/>

            ): errorOrders ? (
                <Message variant='danger'>{errorOrders}</Message>

            ):
            (
                <Table striped responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(orderss=>(
                            <tr key = {orderss._id}>
                                
                                 <td>{orderss._id}</td>
                                <td>{orderss.createdAt.substring(0,10)}</td>
                                <td>{orderss.totalPrice}</td>

                            <td>{orderss.isPaid ?  
                                   orderss.paidAt.substring(0,10)
                                :
                                (<i className='fas fa-times' style={{color:'red'}}></i> )}</td>
                                <td> 
                                    <LinkContainer to = {`/order/${orderss._id}`}>
                                        <Button className='btn-sm'>Details</Button>

                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </Table>
            )
            }


        </Col>
      
    </Row>
  )
}

export default ProfileScreen

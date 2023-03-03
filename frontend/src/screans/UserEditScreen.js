import React,{useState,useEffect} from 'react'
 import { Form,Button} from 'react-bootstrap'

import { Link,useParams,useNavigate} from 'react-router-dom'


import Loader from '../component/Loader'
 import Message from '../component/Message'

import { useDispatch,useSelector } from 'react-redux'

import { getUserDetails } from '../actions/userActions'
import { updateUser } from '../actions/userActions'

import FormContainer from '../component/FormContainer'
import { USER_UPDATE_RESET } from '../constants/userConstants'


function UserEditScreen() {

   //const location =  useLocation()
    let history = useNavigate();

    const { id } = useParams();
    
    const  [name,setName] = useState('')
    const  [email,setEmail] = useState('')
    const  [isAdmin,setIsAdmin] = useState(false)
    
    const dispatch = useDispatch()
    
    const userDetails =    useSelector(state=>state.userDetails)
    
    const {loading,error,user} = userDetails

    const userUpdate = useSelector(state=>state.userUpdate)
    
    const {loading:loadingUpdate,error:errorUpdate ,success:successUpdate } = userUpdate

    useEffect(()=>{

        if (successUpdate)

        {

            dispatch({type:USER_UPDATE_RESET})

            history('/admin/userlist')

        }

        else{

        if(!user.name || user._id !==Number(id)){
            dispatch(getUserDetails(id))
            
        }else{
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }
    
    },[user,id,dispatch,successUpdate,history])

    const submitHandler=(e)=>{

        e.preventDefault()
        dispatch(updateUser({_id:user._id,name,email,isAdmin}))

    }

  return (

    <div>
        <Link to='/admin/userList'>
            Go Back
        </Link>


    <FormContainer>
 <h1> Edit User</h1>
 {loadingUpdate  && <Loader/>}
 {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
 
 

{loading ? <Loader/>: error ? <Message variant='danger'> {error}</Message> :

(

    
<Form onSubmit = {submitHandler}>

<Form.Group controlId='name'>

        <Form.Label>Name </Form.Label>
        <Form.Control  type= 'name' placeholder='Enter your Name' value = {name} onChange ={(e)=>setName(e.target.value)}>
        </Form.Control>

    </Form.Group>
    
<Form.Group controlId='email'>
        <Form.Label>Email Adress </Form.Label>

        <Form.Control  type= 'email' placeholder='Enter Email' value = {email} onChange ={(e)=>setEmail(e.target.value)}>

        </Form.Control>

    </Form.Group>


    
    <Form.Group controlId='isAdmin' style = {{padding:'10px'}} >
        <Form.Check  type= 'checkbox' label ='IsAdmin' checked = {isAdmin} onChange ={(e)=>setIsAdmin(e.target.checked)}>

        </Form.Check>

    </Form.Group>

    <Button type='submit' variant = 'primary'  className= 'my-3 width-30'  > Update </Button>   

    </Form> 


)
}


  </FormContainer>

  </div>

  )
}

export default UserEditScreen

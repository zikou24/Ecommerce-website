import React,{useEffect} from 'react'
 import { Button, Table} from 'react-bootstrap'

 import { useNavigate} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
 import Loader from '../component/Loader'
 import Message from '../component/Message'

import { useDispatch,useSelector } from 'react-redux'

import { listUsers } from '../actions/userActions'

import { deleteUser } from '../actions/userActions'


function UserListScreen() {
 
    let history = useNavigate()

    const dispatch = useDispatch()

    const usersList = useSelector(state=>state.usersList)
    
    const { loading, error, users } = usersList

    const usersLogin = useSelector(state=>state.userLogin)
    const {  userInfo } = usersLogin

    const userDelete = useSelector(state=>state.userDelete)
    const {  success:successDelete } = userDelete

    useEffect(()=>{

        if(userInfo && userInfo.isAdmin){

        dispatch(listUsers())}

        else

        {
            history('/login')
        }


    },[dispatch,history,userInfo,successDelete])

   const deleteHandler=(id)=>{

    if (window.confirm('Are you Sure you want to delete This user ? '))
    {
        
        dispatch(deleteUser(id))

    }

 }


    return (

    <div>

        <h1> Users </h1>

        {loading ?(<Loader/>)
        :error 
        ? (<Message variant='danger'>{error}</Message>)
        :(
            <><p>Table</p>
            <Table striped bordered hover responsive className='table-sm'>

                          <thead>
                              <tr> 

                              <th>ID</th>
                              <th>name</th>
                              <th>EMAIL</th>
                              <th>ADMIN</th>
                              <th></th>

                              </tr>
                              
                          </thead>
                          <tbody>
                              {users.map(user => (
                                  <tr key={user._id}>
                                    <td>{user._id}</td>

                                      <td>{user.name}</td>
                                      <td>{user.email}</td>

                                      <td>{user.isAdmin ?(
                                        <i className='fas fa-check' style={{color:'green'}}></i>
                                      ):

                                      (
                                        <i className='fas fa-check' style={{color:'red'}}></i>
                                      )

                                    }

                                    </td>

                                    <td>


                                        <LinkContainer to = {`/admin/users/${user._id}/edit`}>

                                            <Button variant='light' className='btn-sm'>

                                                <i className='fas fa-edit'></i>
                                                
                                            </Button>
                                            
                                        </LinkContainer>
                                
                                            <Button variant='danger' className='btn-sm' onClick={()=> deleteHandler(user._id)}>

                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        

                                    </td>
                                      

                                  </tr>

                              ))}

                          </tbody>

                      </Table></>
               
        )
        }
        
    </div>

  )

}

export default UserListScreen

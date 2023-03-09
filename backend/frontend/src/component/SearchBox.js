import React,{useState} from 'react'
import { Button,Form } from 'react-bootstrap'
import { useNavigate,useLocation } from 'react-router-dom'

function SearchBox() {

    const [keyword,setKeyword] = useState('')


    let history = useNavigate()
    let location = useLocation()

    const submitHandler = (e)=>{
        e.preventDefault()
        if (keyword){
            history(`/?keyword=${keyword}&page=1`)

        }else{

            history(history(location.pathname))
        
        }

    }

  return (
    <Form onSubmit={submitHandler} inline style={{display:'flex'}}>
        <Form.Control
        type = 'text'
        name = 'q'
        style={{height:'40px',marginTop:'5px'}}
        onChange={(e) => setKeyword(e.target.value)}
        >
        

        </Form.Control>

        <Button type='submit' variant='outline-success'
        style={{color:'white',backgroundColor:'black',margin:'6px',borderColor:'white'}} 
        >submit</Button>
    
      
    </Form>
  )
}

export default SearchBox

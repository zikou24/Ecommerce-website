import React from 'react'

import { Alert } from 'react-bootstrap'

function Message({variant,children}) {


  return (

    <Alert variant={variant} style = {{
        height:'100px',
        width:'70%', 
        left:'18%',
        padding:'35px', textShadow: '2px 2px red',
        
        
    }}>

        <h1 style={{textAlign:'center',fontSize: '30px',}}>{children}</h1>

    
    </Alert>
  )
}

export default Message

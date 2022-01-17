import React, { Component } from 'react'

class ErrorBoundary extends Component {
   constructor(props){
       super(props)

       this.state={
           hasError:false
       }
   }

   static getDerivedStateFromError(error){
       return{
           hasError: true
       }
   }
    render() {
        if(this.state.hasError){
            return <img  src='https://i.pinimg.com/originals/b8/b8/f7/b8b8f787c454cf1ded2d9d870707ed96.png'/>
        }
        return this.props.children
    }
}
export default ErrorBoundary
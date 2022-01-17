import React, { useState, useEffect } from 'react'
import Footer from "./Footer";
import Navbaar from "./Navbaar";
import { useLocation } from 'react-router-dom'
import { checkOutService } from '../config/MyProductService'
import {cartSaveService  } from '../config/Myservice'
import "./Login.css"

import jwtdecode from 'jwt-decode';
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'

function Checkout() {
    const location = useLocation();
    const navigate = useNavigate()
    const dispatch = useDispatch();


    const [state, setState] = useState({ cardNum: '', cvv: '', name: '', expDate: '', userEmail: '' })
    const [errors, setErrors] = useState({ cardNum: '', cvv: '', name: '', expDate: '' })
    const [isSumbit, setIsSubmit] = useState(false)

    console.log(location.state)

    useEffect(() => {
        if (localStorage.getItem('_token') !== undefined) {
            let token = localStorage.getItem('_token');
            let decode = jwtdecode(token)
            console.log(decode)
            setState({ ...state, userEmail: decode.email })

        }
        else {
            navigate('/login')
        }
    }, [])

    const checkout = () => {
        setErrors(null)
        setIsSubmit(true)
        let temp = validate(state)
        if (state.cardNum != '' && state.cvv != '' && state.expDate != '' && state.name != '' && state.userEmail != '' && temp.length === 0) {
            let formData = {
                user_email: state.userEmail,
                card_number: state.cardNum,
                card_cvv: state.cvv,
                card_name: state.name,
                card_date: state.expDate, 
                subtotal: location.state.subTotalState.subTotal,
                gst: location.state.subTotalState.gst,
                totalCart: location.state.cart,
                addresses:location.state.address,
            }
            checkOutService(formData)
                .then(res => {
                cartSaveService({ data: [], email: state.userEmail })
                .then(res => {
                     console.log(res.data.token)
                    localStorage.setItem('_token',res.data.token)
                 })
                alert(res.data.msg)
                
                localStorage.removeItem('cart')
                dispatch({ type: "emptyCart", payload: 0 })
                navigate('/')
             })
        }
        else{
            alert('All fields are required')
        }
    }




    const validate = (values) => {
        const e = []
        const errors = {};
        if (!values.cardNum) {
            e.push({ cardNum: "card number required" })
            errors.cardNum = "Card Number is required"
        } else if (values.cardNum.length !== 16) {
            e.push({ cardNum: "Card number should be  16 digits" })
            errors.cardNum = "Card number should be  16 digits"
        }
        if (!values.cvv) {
            e.push({ cvv: "cvv is required" })
            errors.cvv = "CVV  is required"
        } else if (values.cvv.length !== 3) {
            e.push({ cvv: "CVV  should be  3 digits" })
            errors.cvv = "CVV  should be  3 digits"
        }
        if (!values.name) {
            e.push({ name: "Name is required" })
            errors.name = "Name  is required"
        } else if (values.name.length < 3) {
            e.push({ name: "Name  should be greater than 3 letter" })
            errors.name = "Name  should be greater than 3 letter"
        }
        if (!values.expDate) {
            e.push({ expDate: "Expiration Date is required" })
            errors.expDate = "Expiration Date  is required"
        }


        setErrors(errors)
        return e

    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSumbit) {
            console.log(errors);
        }
    }, [errors])
    return (
        <>
        <Navbaar/>
          <div id='checkoutpage'>
            <div className='card mt-5 p-4 rounded'  style={{ backgroundImage: `url("https://www.cardrates.com/images/themes/cr-mobile/images/home/home-hero.jpg?width=538&height=322")`,marginLeft:"80px", marginBottom:"30px"  ,width:"600px" }}>
                <div class="row">
                   <label className='mt-4 ml-2 font-weight-bold'>Card Holder Name</label>
                    <input type="text"  class="form-control  ml-3 w-75" name='name' value={state.name} placeholder="Arpan" onChange={e => setState({ ...state, name: e.target.value })} />
                    {errors.name && <p className="alert alert-danger error">{errors.name}</p>}
                </div>
                <div class="row">
                   <label className='mt-3 ml-2 font-weight-bold'>Card Number</label>
                    <input type="number" class="form-control  ml-3 w-50" value={state.cardNum} placeholder="1234 1234 1234 1234" name='cardNum' onChange={e => setState({ ...state, cardNum: e.target.value })} />
                    {errors.cardNum && <p className="alert alert-danger error">{errors.cardNum}</p>}
                </div>
                <div class="row">
                   <div class="col-2">
                        <label className='mt-3 ml-2 font-weight-bold'>CVV</label>
                        <input type="number" class="form-control  mr-3" name='cvv' value={state.cvv} placeholder="123" onChange={e => setState({ ...state, cvv: e.target.value })} />
                        {errors.cvv && <p className="alert alert-danger error">{errors.cvv}</p>}
                    </div>
                   
                    <div class="col-3">
                        <label className='mt-3 ml-2 font-weight-bold'>Expiry Date</label>
                        <input type="date" class="form-control" name='expDate' value={state.expDate} placeholder="01/2" onChange={e => setState({ ...state, expDate: e.target.value })} />
                        {errors.expDate && <p className="alert alert-danger error">{errors.expDate}</p>}
                    </div>
                    <div class="col-7">
                    <img className='mt-5 ml-3' src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png' height={60}></img>
              <img className='mt-5 ml-3' src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png' height={55}></img>
                    </div>
                </div>
              
                <button className='btn btn-primary mb-2 mt-3' style={{ marginLeft: '1rem' }} onClick={() => checkout()}>Submit</button>
            </div>
            </div>
        <Footer/>

        </>
    )
}

export default Checkout
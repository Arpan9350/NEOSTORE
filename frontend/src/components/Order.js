import React, { useEffect, useState } from 'react'
import { orderService } from '../config/MyProductService'
import jwtdecode from 'jwt-decode';
import { useNavigate } from "react-router";
function Order() {
    const [state, setState] = useState([])
   const navigate = useNavigate()
    useEffect(() => {
        let token = localStorage.getItem('_token');
        let decode = jwtdecode(token)
        orderService({email:decode.email}).then(res => {
            console.log(res.data);
            setState(res.data)
        })

    }, [])
    console.log(state);

    const productInvoice = (ele) =>{
        navigate("/OrderPdf", {state: ele})
    }
    return (
        <>
            <div className='container-justify p-4 mt-5' style={{borderRadius: " 5px",  fontFamily: "'Bree Serif', serif", width: "95%", maxHeight: '70vh', overflow: 'auto', backgroundColor:"white" }}>
                {
                    state.map(ele =>
                        <>
                            <h5>Order Placed By:{ele.card_name}</h5>
                           

                            <div>
                                {ele.totalCart.map(data =>
                                    <>
                                        <img src={`/images/${data.product_image}`} height='140px' width='120px' className="ml-3 border border-dark rounded" alt="..." />
                                    </>
                                )}
                            </div>
                            <h5 className='mt-4'>Placed On {ele.created_at}</h5>
                            <h6>Price:{ele.subtotal}</h6>
                            <button className='btn btn-secondary mt-4' onClick={()=> productInvoice(ele)}>Download Invoice as pdf</button>
                            <hr />
                        </>
                    )}
            </div>
        </>
    )
}

export default Order
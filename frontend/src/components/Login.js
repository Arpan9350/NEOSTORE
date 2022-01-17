import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router";
import SocialButton from './SocialButton';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode'
import { forgetService, loginpage } from '../config/Myservice';
import "./Login.css"
import Footer from "./Footer";
import Navbaar from "./Navbaar";
import { Card } from 'react-bootstrap';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';

export default function Login() {
    const [state, setstate] = useState({email:'', password:''})
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const cartData = (data)=>{   
        let decode = jwtDecode(data)
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(localStorage.getItem('cart')!=undefined){
            // localStorage.setItem('cart',JSON.stringify([...cart,...decode.cart]))

            let arr = [...cart]
                decode.cart.forEach(element => {
                    if (!cart.find(ele => ele._id === element._id)) {
                        arr.push(element)
                    }
                });
                localStorage.setItem('cart', JSON.stringify([...arr]))
        }
        
        else{
            if(decode.cart!=null){
                localStorage.setItem('cart',JSON.stringify([...decode.cart]))
            }
            else{
                localStorage.setItem('cart',JSON.stringify([]))
            }
        }
        dispatch({ type: "onLogin", payload:decode.cart})    
        return 10
    }

    const checkdata = () => {
        console.log("hellooo")
        // event.preventDefault()
        if(state.email != '' && state.password != ''){
            console.log("line 16")
            loginpage({email:state.email, password:state.password})
            .then(res=>{
                if(res.data.err==0){
                  console.log(res.data)
                   localStorage.setItem("_token",res.data.token);
                   navigate("/dashboard")
                }
                else{
                      alert(res.data.msg)
                }
            })
        }
        else{
            alert("Please enter data")
        }
    }

    const handleSocialLogin = (user) => {
        console.log(user._profile)
        loginpage({email:user._profile.email, password:user._profile.id})
            .then(res=>{
                if(res.data.err==0){
                  console.log(res.data)
                   localStorage.setItem("_token",res.data.token);
                   let c= cartData(res.data.token)
                   navigate("/")
                }
                else{
                      alert(res.data.msg)
                }
            })
    }

    const handleSocialLoginFailure = (err) => {
        console.error(err);
      };

    const forgetpass = () => {

        if(state.email != ''){
            forgetService({email:state.email})
            .then(res=>{
                if(res.data.err==0){
                     navigate("/forgetpassword", {state:{email:state.email, otp:res.data.otp}})
                  }
                  else{
                        alert(res.data.msg)
                  }
            })
        }
        else{
            alert("Please enter email")
        }
    }

    return (
<>
      <Navbaar/>
        <div class="d-flex justify-content-center rounded-lg" id='login'>
		<Card className=' justify-content-center '  style={{height:"450px",width:"300px",marginTop:"50px",marginLeft:"750px",borderRadius:"30px",marginBottom:"30px"}}>
			<div >
				<div>
					<div class="logo mx-5 ">
						<h2 className='font-weight-bold text-black'>Neo<span style={{color:'red'}}>STORE</span> </h2>
					</div>
					

						<div className="form-input mx-5 mt-4">
                            
							<span><EmailIcon/></span>
							<input type="text" onChange={e => setstate({...state, email: e.target.value})} value={state.email} className='w-100 form-control' placeholder="Email Address"/>
                            
                        </div>
						<div className="form-input mx-5 mt-2">
							<span><PasswordIcon/></span>
							<input type="password" onChange={e => setstate({...state, password: e.target.value})} className='w-100 form-control' value={state.password} placeholder="Password"/>
						</div>
						<div class="row mb-3">
							<div class="col-6 d-flex">

							</div>
							<div class="col-6 text-right">
								<a className='font-weight-bold' onClick={()=>forgetpass()} style={{textDecoration:"none",color:"grey" , cursor:"pointer",marginRight:"10px"}}> Forget password</a>
							</div>
						</div>
						<div className='m-4' >
							<button class="btn btn-secondary btn-lg btn-block" onClick={() =>checkdata()}>Login</button>
						</div>

						<div class="row" style={{ marginTop: "7px" }}>
							<div class="col-3 ml-5 mr-4">

                                <SocialButton
                                    provider="facebook"
                                    appId="2171649733000264"
                                    onLoginSuccess={handleSocialLogin}
                                    onLoginFailure={handleSocialLoginFailure}
                                    className="btn btn-block " style={{color:"blue"}}>
                                    
                                    <FacebookIcon style={{fontSize:"50px"}}/>
                                </SocialButton>

							</div>
							<div class="col-3">

                            <SocialButton
                                provider="google"
                                appId="420321224046-je2rf4df9mqcua73ve0usqqvrsoqvdi5.apps.googleusercontent.com"
                                onLoginSuccess={handleSocialLogin}
                                onLoginFailure={handleSocialLoginFailure}
                                className="btn btn-block" style={{color:"red"}}>
                                
                                <GoogleIcon style={{fontSize:"50px"}}/>
                            </SocialButton>


							</div>
                            </div>
						<div class="text-black mx-2">Don't have an account?
						<Link to="/registration" className='font-weight-bold' style={{textDecoration:"none",color:"blue"}}> Register here</Link>
						</div>

				</div>
			</div>

			
		</Card>
	</div>
    <Footer/>
    </>
    )
}

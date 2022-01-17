import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { resetpassService ,forgetService} from "../config/Myservice";
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import Footer from "./Footer";
import Navbaar from "./Navbaar";

const regForpassword = RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

export default function Forgetpassword() {
  const [state, setstate] = useState({
    otp: null,
    flag: false,
    pass: "",
    cpass: "",
  });
  const [otp, setOtp] = useState(0)
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(()=>{
    setOtp(location.state.otp)
  },[])

  const submitotp = () => {
    console.log(location.state.otp, "line 13");
    console.log(state.otp, "line 14");
    if (state.otp != null) {
      if (state.otp ==otp) {
        alert("Otp Match");
        setstate({ ...state, flag: true });
      } else {
        // alert("OTP does not match")
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "OTP Does Not Match",
        });
      }
    } else {
      alert("Enter OTP")
      
    }
  };

  const resetpass = () => {
    if (regForpassword.test(state.pass) && state.pass === state.cpass) {
      resetpassService({
        email: location.state.email,
        password: state.pass,
      }).then((res) => {
        alert(res.data.msg);
        navigate("/login");
      });
    } else {
      alert("Enter Strong Password");
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Enter Strong Password",
      });
    }
  };

  const resendotp = () => {
    forgetService({ email: location.state.email })
        .then(res => {
            setOtp(res.data.otp)
        })
}

  return (
    <>
      <Navbaar/>
    <div id="forgetpage">
      <div className="container-fluid">
        <div className="row">
          {state.flag != true ? (
            <div className="col-lg-6 col-md-6 card p-5" style={{height:"350px",width:"500px",marginTop:"150px",marginLeft:"120px",borderRadius:"30px",marginBottom:"30px"}}>
              <div className="col-lg-8 col-md-12 col-sm-9 col-xs-12 form-box">
                <div className="reset-form d-block">
                  <div className="reset-password-form">
                    <h4 className="mb-3">Reset Your Password</h4>
                    <p className="mb-3 text-black">
                      An 4 digit OTP is sent to your registered email address
                    </p>
                    <div className="form-input">
                      <span>
                        <EmailIcon/>
                      </span>
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={location.state.email}
                        disabled
                      />
                    </div>
                    <div className="form-input">
                      <span>
                        <PasswordIcon />
                      </span>
                      <input
                        type="text"
                        value={state.otp}
                        onChange={(e) =>
                          setstate({ ...state, otp: e.target.value })
                        }
                        placeholder="Enter OTP"
                      />
                    </div>
                    <div className="mb-3">
                      <button className="btn btn-secondary m-2" onClick={() => submitotp()}>
                        Submit
                      </button>
                    </div>
                    <div className="mb-3">
                      <button className="btn" style={{color:"blue"}} onClick={() => resendotp()}>
                        Resend otp
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-lg-6 col-md-6" style={{height:"320px",width:"500px",marginTop:"150px",marginLeft:"550px",borderRadius:"30px",marginBottom:"30px"}}>
              <div className="col-lg-8 col-md-12 col-sm-9 col-xs-12 form-box">
                <div className="reset-form d-block">
                  <div className="reset-password-form">
                    <h4 className="mb-3">Reset Your Password</h4>
                    <p className="mb-3 text-white">Enter Your New Password</p>
                    <div className="form-input">
                      <span>
                        <PasswordIcon />
                      </span>
                      <input
                        type="password"
                        value={state.pass}
                        placeholder="New Password"
                        onChange={(e) =>
                          setstate({ ...state, pass: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-input">
                      <span>
                        <PasswordIcon />
                      </span>
                      <input
                        type="password"
                        value={state.cpass}
                        onChange={(e) =>
                          setstate({ ...state, cpass: e.target.value })
                        }
                        placeholder="Confirm Password"
                      />
                    </div>
                    <div className="mb-3">
                      <button className="btn btn-secondary" onClick={() => resetpass()}>
                        Reset
                      </button>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    <Footer/>

    </>
  );
}

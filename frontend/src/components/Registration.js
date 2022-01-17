import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { addPost } from "../config/Myservice";
import { useNavigate } from "react-router";
import SocialButton from "./SocialButton";
import Footer from "./Footer";
import Navbaar from "./Navbaar";

import "./Login.css";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import WcIcon from '@mui/icons-material/Wc';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import PasswordIcon from "@mui/icons-material/Password";

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForName = RegExp(/^[A-Za-z]{3,30}$/);
const regForContact = RegExp(/^[6-9][0-9]{9}/);
const regForpassword = RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

export default function Registration() {
  const [errors, seterrors] = useState({
    errfirstname: "",
    errlastname: "",
    erremail: "",
    errcontact: "",
    errpassword: "",
    errcpassword: "",
    errgender: "",
    pass: null,
  });
  const [data, setdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    password: "",
    cpassword: "",
    gender: "",
  });
  const navigate = useNavigate();

  const handler = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "firstname":
        let error1 = regForName.test(value) ? "" : "Invalid Name";
        seterrors({ ...errors, errfirstname: error1 });
        break;

      case "lastname":
        let error2 = regForName.test(value) ? "" : "Invalid Name";
        seterrors({ ...errors, errlastname: error2 });
        break;

      case "email":
        let error3 = regForEmail.test(value) ? "" : "Invalid Email";
        seterrors({ ...errors, erremail: error3 });
        break;

      case "contact":
        let error4 = regForContact.test(value) ? "" : "Invalid Contact";
        seterrors({ ...errors, errcontact: error4 });
        break;

      case "password":
        let error5 = regForpassword.test(value) ? "" : "Invalid Password";
        seterrors({ ...errors, errpassword: error5, pass: value });
        break;

      case "cpassword":
        let error6 = value === errors.pass ? "" : "Password does not match";
        seterrors({ ...errors, errcpassword: error6 });
        break;
    }
    setdata({ ...data, [name]: value });
  };

  const validate = async () => {
    if (
      data.firstname != "" &&
      data.lastname != "" &&
      data.email != "" &&
      data.contact != "" &&
      data.password != "" &&
      data.cpassword != "" &&
      data.gender != ""
    ) {
      let formData = {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        contact: data.contact,
        password: data.password,
        cpassword: data.cpassword,
        gender: data.gender,
      };
      await addPost(formData).then((res) => {
        if (res.data.err == 0) {
          alert(res.data.msg);
          navigate("/login");
        } else {
          alert(res.data.msg);
        }
      });
    } else {
      alert("Enter All Registration Details");
    }
  };

  const handleSocialLogin = async (user) => {
    let formData = {
      firstname: user._profile.firstName,
      lastname: user._profile.lastName,
      email: user._profile.email,
      contact: 9999999999,
      password: user._profile.id,
      gender: "undefined",
    };
    await addPost(formData).then((res) => {
      if (res.data.err == 0) {
        alert(res.data.msg);
        navigate("/login");
      } else {
        alert(res.data.msg);
      }
    });
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };

  return (
      <>
      <Navbaar/>
    <div className="d-flex justify-content-center rounded-lg mb-4" id="register">
        
      <Card
        className=" justify-content-center"
        style={{
          height: "500px",
          width: "450px",
          marginTop: "45px",
          marginLeft: "700px",
          borderRadius: "30px",
        }}
      >
        <div>
          <>
            <div className="logo" style={{ marginLeft: "120px" }}>
              <h2 className="font-weight-bold text-black">
                Neo<span style={{ color: "red" }}>STORE</span>{" "}
              </h2>
            </div>

            <div
              className="form-input"
              style={{ marginLeft: "50px", marginTop: "10px" }}
            ><DriveFileRenameOutlineIcon/>
              <input
                type="text"
                className="w-75"
                id="firstname"
                name="firstname"
                value={data.firstname}
                onChange={handler}
                placeholder="First Name"
              />
              <span className="text-warning">{errors.errfirstname}</span>
            </div>
            <div
              className="form-input"
              style={{ marginLeft: "50px", marginTop: "10px" }}

            ><DriveFileRenameOutlineIcon/>
              <input
                type="text"
                id="lastname"
                name="lastname"
                className="w-75"

                value={data.lastname}
                onChange={handler}
                placeholder="Last Name"
              />
              <span className="text-warning">{errors.errlastname}</span>
            </div>
            <div
              className="form-input "
              style={{ marginLeft: "50px", marginTop: "10px" }}
            >
              <EmailIcon />
              <input
                type="email"
                id="email"
                className="w-75"

                name="email"
                value={data.email}
                onChange={handler}
                placeholder="Email Address"
              />
              <span className="text-warning">{errors.erremail}</span>
            </div>
            <div
              className="form-input"
              style={{ marginLeft: "40px", marginTop: "10px" }}
            >
              <PhoneIcon /> :
              <input
                type="text"
                id="contact"
                name="contact"
                value={data.contact}
                onChange={handler}
                className="w-75"

                placeholder="Contact Number"
              />
              <span className="text-warning">{errors.errcontact}</span>
            </div>
            <div
              className="form-input"
              style={{ marginLeft: "50px", marginTop: "10px" }}
            >
              <PasswordIcon />
              <input
                type="password"
                id="password"
                name="password"
                className="w-75"
                value={data.password}
                onChange={handler}
                placeholder="Password"
              />
              <span className="text-warning">{errors.errpassword}</span>
            </div>
            <div
              className="form-input"
              style={{ marginLeft: "50px", marginTop: "10px" }}
            ><PasswordIcon />
              <input
                type="password"
                id="cpassword"
                name="cpassword"
                className="w-75"
                value={data.cpassword}
                onChange={handler}
                placeholder="Confirm Password"
              />
              <span className="text-warning">{errors.errcpassword}</span>
            </div>
            <div
              className="text-left "
              style={{ marginLeft: "120px", marginTop: "7px" }}
            ><WcIcon/>
              <input
                type="radio"
                id="male"
                name="gen"
                value="male"
                onClick={(e) => setdata({ ...data, gender: e.target.value })}
              />{" "}
              <span className="text-dark font-weight-bold mr-3"> Male</span>
              <input
                type="radio"
                id="female"
                name="gen"
                value="female"
                onClick={(e) => setdata({ ...data, gender: e.target.value })}
              />{" "}
              <span className="text-dark font-weight-bold mr-3"> Female</span>
            </div>

            <div className="text-left my-2 mx-5">
              <button
                className="btn btn-primary rounded-lg"
                style={{ marginLeft: "120px" }}
                onClick={validate}
              >
                Register
              </button>
            </div>
            <div
              className="text-dark"
              style={{ marginLeft: "120px", marginTop: "7px" }}
            >
              or register with
            </div>
            <div
              className="row"
              style={{ marginLeft: "120px", marginTop: "7px" }}
            >
              <div className="col-3">
                <SocialButton
                  provider="facebook"
                  appId="2171649733000264"
                  onLoginSuccess={handleSocialLogin}
                  onLoginFailure={handleSocialLoginFailure}
                  className="btn btn-block"
                  style={{color:"blue"}}
                >
                  <FacebookIcon style={{fontSize:"50px"}}/>
                </SocialButton>
              </div>
              <div className="col-3">
                <SocialButton
                  provider="google"
                  appId="420321224046-je2rf4df9mqcua73ve0usqqvrsoqvdi5.apps.googleusercontent.com"
                  onLoginSuccess={handleSocialLogin}
                  onLoginFailure={handleSocialLoginFailure}
                  className="btn btn-block "
                  style={{color:"red"}}
                >
                  <GoogleIcon style={{fontSize:"50px"}}/>
                </SocialButton>
              </div>
            </div>
            <div
              className="text-dark"
              style={{ marginLeft: "100px", marginTop: "7px" }}
            >
              Already have an account?
              <Link
                to="/login"
                className="font-weight-bold"
                style={{ textDecoration: "none", color: "blue" }}
              >
                {" "}
                Login here
              </Link>
            </div>
          </>
        </div>
      </Card>
    </div>
    <Footer />
    </>
  );
}

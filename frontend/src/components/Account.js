import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Navbaar from "./Navbaar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import ReorderIcon from "@mui/icons-material/Reorder";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { Navigate } from "react-router-dom";

export default function Account() {
  const [state, setstate] = useState({});
  const userProfile = useSelector((state) => state.profileReducer);
  const dispatch = useDispatch();
  const Navigate =useNavigate();

  useEffect(() => {
    if (localStorage.getItem("_token") !== undefined) {
      let token = localStorage.getItem("_token");
      let decode = jwtDecode(token);
      console.log(decode);
      setstate(decode);
      dispatch({
        type: "updateProfile",
        payload: decode.firstname + " " + decode.lastname,
      });
      dispatch({ type: "updatePicture", payload: decode.profilepic });
    }
  }, []);
  return (
      <>{localStorage.getItem("_token") != undefined ? (
      
    <>
      <Navbaar />
      <div id="account" className="container-fluid">
        <div>
          <div className="row">
            <div id="side_account" className="pt-5 col-4 text-white">
              <h2
                style={{
                  color: "black",
                  fontWeight: "bolder",
                  marginLeft: "140px",
                }}
              >
                My Account
              </h2>
              <div className="text-center bg_img" id="bg_img">
                {userProfile.profile == undefined ? (
                  <img
                    src={`../images/default.jpg`}
                    alt="default Images"
                    style={{ height: "250px" }}
                  />
                ) : (
                  <img
                    src={`../images/${userProfile.profile}`}
                    alt="Profile"
                    className="profile_img"
                  />
                )}
              </div>
              <h4 className="text-center mt-3 text-dark">{userProfile.name}</h4>
              <ul className="text-center mr-4 mt-4">
                <li className="border border-dark">
                  <ReorderIcon style={{ color: "black" }} />{" "}
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontWeight: "bold",
                    }}
                    to="order"
                  >
                    Orders
                  </Link>
                </li>{" "}
                <br />
                <li className="border border-dark">
                  <HomeIcon style={{ color: "black" }} />{" "}
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontWeight: "bold",
                    }}
                    to="address"
                  >
                    Address
                  </Link>
                </li>{" "}
                <br />
                <li className="border border-dark">
                  <AccountBoxIcon style={{ color: "black" }} />{" "}
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontWeight: "bold",
                    }}
                    to="profile"
                  >
                    Profile
                  </Link>
                </li>{" "}
                <br />
                <li className="border border-dark">
                  <CompareArrowsIcon style={{ color: "black" }} />
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontWeight: "bold",
                    }}
                    to="changepassword"
                  >
                    Change Password
                  </Link>
                </li>{" "}
                <br />
              </ul>
            </div>

            <div id="main_account" className="col-8">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <Footer />)
    </>
    ) : (
        <Navigate to="/login"></Navigate>
      )}
    </>
  );
}

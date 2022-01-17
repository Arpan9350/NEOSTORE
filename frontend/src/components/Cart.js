import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbaar from "./Navbaar";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch } from "react-redux";

function Cart() {
  const [state, setState] = useState([]);
  const [count, setCount] = useState(0);
  const [subTotalState, setSubTotalState] = useState({
    subTotal: 0,
    gst: 0,
    grandTotal: 0,
  });
  const cartId = useSelector((state) => state.cartData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("cart") != undefined) {
      let data = [...JSON.parse(localStorage.getItem("cart"))];
      setState([...data]);
      totalCount(data);
    }
  }, [cartId.count, count]);

  const countUp = (id) => {
    let data = state;
    data[id].quantity += 1;
    // setState(data)
    localStorage.setItem("cart", JSON.stringify(data));
    setCount(count + 1);
  };
  console.log(state, "after up");
  
  const countDown = (id) => {
    let data = state;
    if (data[id].quantity > 1) {
      data[id].quantity -= 1;
      // setState(data)
      localStorage.setItem("cart", JSON.stringify(data));
      setCount(count + 1);
    } else {
      dispatch({ type: "deleteCart", payload: id })
                            
    }
  };

  const totalCount = (data) => {
    let totalValue = 0;
    data.forEach((ele) => {
      totalValue = totalValue + ele.quantity * ele.product_cost;
    });
    let gst = (totalValue * 12) / 100;
    setSubTotalState({
      subTotal: totalValue,
      gst: gst,
      grandTotal: totalValue + gst,
    });
  };
  const proceed = () => {
    navigate("/account/address", {
      state: { subTotalState: subTotalState, cart: state },
    });
  };
  return (
    <>
     
      <Navbaar />
      <div className="container-justify">
        <div className="row mt-5 ml-3 mr-3">
          <div className="col-lg-9 ">
            <div
              className="container m-2"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                backgroundColor: "white",
              }}
            >
              <table
                className="table mt-4 "
                style={{ width: "100%", maxHeight: "10vh", overflow: "auto" }}
              >
                <thead> 
                  <tr className="bg-secondary">
                    <th>Products</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {state.map((data, index) => (
                    <tr>
                      <td style={{fontSize:"30px"}}>
                      {data.product_name}
                        <img
                          src={`images/${data.product_image}`}
                          height="90px"
                          width="140px"
                          className="mr-1"
                        />
                        
                      </td>

                      <td>
                        <button
                          className="btn mr-1 "
                          onClick={() => countDown(index)}
                        >
                          {" "}
                          -{" "}
                        </button>
                        {data.quantity}
                        <button
                          className="btn ml-1 "
                          onClick={() => countUp(index)}
                        >
                          +
                        </button>
                      </td>

                      <td  className="my-5">{data.product_cost} /-</td>
                      <td>{data.quantity * data.product_cost}</td>

                      <td>
                        <button
                          className=""
                          onClick={() =>
                            dispatch({ type: "deleteCart", payload: index })
                          }
                        >
                          <DeleteOutlineIcon/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-lg-3 ">
            <div
              className="container h-75 m-2 mt-4"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                backgroundColor: "white",
              }}
            >
              <h4 className="mx-3 py-4">Order Summary</h4>
              <table className="table">
                <tbody>
                  <tr>
                    <td className="font-weight-bold">Subtotal</td>
                    <td>{subTotalState.subTotal}</td>
                  </tr>
                  <tr>
                    <td className="font-weight-bold">GST (12%)</td>
                    <td>{subTotalState.gst}</td>
                  </tr>
                  <tr>
                    <td className="font-weight-bold">Order Total</td>
                    <td>{subTotalState.grandTotal}</td>
                  </tr>
                  <tr>
                    {localStorage.getItem("_token") != undefined ? (
                      <td colSpan="2">
                        {" "}
                        <button
                          className="w-100 mt-4 btn btn-secondary"
                          onClick={() => proceed()}
                        >
                          Proceed
                        </button>
                      </td>
                    ) : (
                      <td colSpan="2">
                        {" "}
                        <button
                          className="w-100 mt-4 btn btn-primary"
                          onClick={() => navigate("/login")}
                        >
                          Proceed
                        </button>
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cart;

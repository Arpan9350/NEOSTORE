import React, { useEffect, useState } from "react";
import "./Invoice.css";
import jwtDecode from "jwt-decode";
import ReactToPdf from "react-to-pdf";
import { useLocation, useNavigate, Navigate } from "react-router-dom";

const options = {
  orientation: "potrait",
  unit: "in",
  format: "A4",
};

export default function OrderPdf() {
  const [state, setstate] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const ref = React.createRef();

  useEffect(() => {
    if (localStorage.getItem("_token") != undefined) {
      let token = localStorage.getItem("_token");
      let decode = jwtDecode(token);
      setstate(decode);
    }
  }, []);
  console.log(location.state, "line 14");

  return (
    <>
      {localStorage.getItem("_token") != undefined ? (
        <>
          <div className="container mt-3 d-flex justify-content-between">
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/account/order")}
            >
              Go back
            </button>
            <ReactToPdf
              targetRef={ref}
              filename={`_invoice.pdf`}
              options={options}
              x={0.6}
              y={0.3}
              scale={0.6}
            >
              {({ toPdf }) => (
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    toPdf();
                  }}
                  variant="contained"
                >
                  Download
                </button>
              )}
            </ReactToPdf>
          </div>
          <div ref={ref} id="divToPrint" className="container my-4 page">
            <div className="p-5">
              <section className="top-content bb d-flex justify-content-between">
                <div className="text-align-start">
                  <p>To,</p>
                  <h2 className="text-dark">
                    {state.firstname} {state.lastname}
                  </h2>
                  {location.state.addresses.map((ele) => (
                    <p className="address">
                      {ele.address}, <br /> {ele.city} {ele.states}-{" "}
                      {ele.pincode} <br />
                      {ele.country}
                    </p>
                  ))}
                  <p>
                    Order Date: <span>{location.state.created_at}</span>
                  </p>
                </div>

                <div className="top-left">
                  <div className="graphic-path">
                    <h2>
                      NEO<span className="text-danger">STORE</span>
                    </h2>
                  </div>
                  <p className="address">
                    {" "}
                    4th Floor, Apollo Premier, <br /> Vijay Nagar Square <br />
                    Indore (M.P.)- 452002{" "}
                  </p>
                  <div className="position-relative">
                    <p>
                      Invoice No. <span>XXXX</span>
                    </p>
                  </div>
                </div>
              </section>

              <section className="product-area mt-4">
                <table className="table">
                  <thead>
                    <tr>
                      <td>Item Description</td>
                      <td>Price</td>
                      <td>Quantity</td>
                      <td>Total</td>
                    </tr>
                  </thead>
                  <tbody>
                    {location.state.totalCart.map((ele) => (
                      <tr>
                        <td>
                          <div className="media">
                            <div className="media-body">
                              <p className="mt-0 title">{ele.product_name}</p>
                            </div>
                            <img
                              className="mr-3 img-fluid"
                              src={`./images/${ele.product_image}`}
                              alt="Product 01"
                            />
                          </div>
                        </td>
                        <td>{ele.product_cost}</td>
                        <td>{ele.quantity}</td>
                        <td>{ele.product_cost * ele.quantity} Rs.</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              <section className="balance-info">
                <div className="row">
                  <div className="col-12">
                    <table className="table border-0 table-hover">
                      <tr>
                        <td>Sub Total:</td>
                        <td>{location.state.subtotal}</td>
                      </tr>
                      <tr>
                        <td>GST(12%):</td>
                        <td>{location.state.gst}</td>
                      </tr>
                      <tfoot>
                        <tr>
                          <td>Total:</td>
                          <td>
                            {location.state.subtotal + location.state.gst}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </section>
              <div className="row ">
                <p>
                  Payment Mode: <span>Online Mode</span>
                </p>

              </div>
            </div>
            <div className="d-flex justify-content-center p-5" >@all rights are reserved by Neostore</div>
          </div>
        </>
      ) : (
        <Navigate to="/login"></Navigate>
      )}
    </>
  );
}

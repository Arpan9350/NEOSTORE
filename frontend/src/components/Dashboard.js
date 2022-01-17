import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Navbaar from "./Navbaar";
import { getPopularProduct } from "../config/MyProductService";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import ReactStars from "react-stars";

export default function Dashboard() {
  const [state, setstate] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    let prod = [];
    getPopularProduct().then((res) => {
      prod = res.data.products;

      setstate(prod);
    });
  }, []);

  const productDetails = (ele) => {
    navigate("/productdetails", { state: ele });
  };
  const starrating = (ele) => {
    return {
      edit: false,
      color: "rgba(20,20,20,0.1)",
      activeColor: "orange",
      size: window.innerWidth < 600 ? 20 : 25,
      value: ele.product_rating,
      isHalf: true,
    };
  };

  return (
    <div>
      <Navbaar />

      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div style={{ width: "100%", height: "80%" }}>
            <div className="carousel-item active">
              <img
                src="https://www.decornation.in/wp-content/uploads/2020/03/home-decor-5-seater-wooden-sofa.jpg"
                alt="First slide"
                style={{ width: "100%", height: "35rem" }}
              />
            </div>

            <div className="carousel-item">
              <img
                src="http://static2.worldtempus.com/cache/brand/cyrus/carrousel/02-02.2021/c/y/cyrus-carousel-alarm-2021_crop_923x520.jpg"
                alt="Second slide"
                style={{ width: "100%", height: "35rem" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="http://static2.worldtempus.com/cache/brand/cyrus/carrousel/02-02.2021/c/y/cyrus-carousel-alarm-2021_crop_923x520.jpg"
                alt="Third slide"
                style={{ width: "100%", height: "35rem" }}
              />
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
      <Container>
        <h1 className="text-primary d-flex justify-content-center mt-3">
          Popular Products
        </h1>
        <div className="row">
          {state.map((ele) => (
            <div className="col m-4">
              <Card
                style={{ width: "18rem" } }
                className="p-2 rounded ml-3"
                id="card1"
              >
                <Card.Img
                  className=""
                  variant="top"
                  src={"./images/" + ele.product_image}
                  height="300"
                  onClick={() => productDetails(ele)}
                />
                <Card.Body style={{ backgroundColor: "##f6f6f6" }}>
                  <Card.Title className="font-weight-bold">
                    {ele.product_name}
                  </Card.Title>
                  <Card.Text>
                    <span className="font-weight-bold text-dark d-flex justify-content-start">
                      Rs.{ele.product_cost}
                    </span>
                    <span className="font-weight-bold text-dark ">
                      <ReactStars {...starrating(ele)} />
                    </span>

                    <div className="d-flex justify-content-center mt-3">
                      <button
                        className="btn btn-primary btn-block"
                        onClick={() =>
                          dispatch({ type: "addCart", payload: ele })
                        }
                      >
                        Add to Cart
                      </button>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </Container>

      <Footer />
    </div>
  );
}

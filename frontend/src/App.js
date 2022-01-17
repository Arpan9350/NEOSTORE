import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundry";
const Login = lazy(() => import("./components/Login"));
const Registration = lazy(() => import("./components/Registration"));
const Cart = lazy(() => import("./components/Cart"));
const Checkout = lazy(() => import("./components/Checkout"));
const Forgetpassword = lazy(() => import("./components/Forgetpassword"));
const Order = lazy(() => import("./components/Order"));
const Product = lazy(() => import("./components/Product"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const Profile = lazy(() => import("./components/Profile"));
const Address = lazy(() => import("./components/Address"));
const Account = lazy(() => import("./components/Account"));
const ChangePassword = lazy(() => import("./components/ChangePassword"));
const ProductDetails = lazy(() => import("./components/ProductDetails"));
const OrderPdf = lazy(() => import("./components/OrderPdf"));


function App() {
  return (
    <div>
      <Router>
        <ErrorBoundary>
          <Suspense
            fallback={
              <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"  width="50%" height="30%" alt="..."></img>
            }
          >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/forgetpassword" element={<Forgetpassword />} />
              <Route path="/product" element={<Product />} />
              <Route path="/productdetails" element={<ProductDetails />} />
              <Route path="/OrderPdf" element={<OrderPdf />} />

           
              <Route path="/account" element={<Account />}>
                <Route path="order" element={<Order />} />
                <Route path="address" element={<Address />} />
                <Route path="profile" element={<Profile />} />
                <Route path="changepassword" element={<ChangePassword />} />
              </Route>
              
              
              <Route
                path="*"
                element={
                  <img
                    width="100%"
                    height="657px"
                    src="https://blog.fluidui.com/content/images/2019/01/get-notes.png"
                    alt="not found"
                  />
                }
              />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </div>
  );
}

export default App;

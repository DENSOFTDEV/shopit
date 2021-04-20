import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from './components/layouts/header'
import Footer from './components/layouts/footer'
import React, {useState,useEffect} from "react";
import {useSelector} from "react-redux";
import Home from './components/home'
import ProductDetails from './components/product/productDetails'

//auth / user imports
import Login from "./components/user/login";
import Register from "./components/user/register";
import Profile from "./components/user/profile";
import UpdateProfile from "./components/user/updateProfile";
import UpdatePassword from "./components/user/updatePassword";
import ForgotPassword from "./components/user/forgotPassword";
import NewPassword from "./components/user/newPassword";

//cart imports
import Cart from "./components/cart/cart";
import Shipping from "./components/cart/shipping";
import ConfirmOrder from "./components/cart/confirmOrder";
import Payment from "./components/cart/payment";
import OrderSuccess from "./components/cart/orderSuccess";

//order imports
import ListOrders from "./components/orders/listOrders";
import OrderDetails from "./components/orders/orderDetails";

//admin imports
import Dashboard from "./components/admin/dashboard";
import ProductsList from "./components/admin/productList";
import NewProduct from "./components/admin/newProduct";
import UpdateProduct from "./components/admin/updateProduct";
import OrdersList from "./components/admin/ordersList";
import ProcessOrder from "./components/admin/processOrder";
import UsersList from "./components/admin/usersList";
import UpdateUser from "./components/admin/updateUser";
import ProductReviews from "./components/admin/productReviews";

import ProtectedRoute from "./components/route/protectedRoute";
import {loadUser} from "./actions/userActions";
import store from "./store";
import axios from "axios";

//payments
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js/pure";



function App() {

    const [stripeApiKey, setStripeApiKey] = useState('');

    useEffect(() => {
        store.dispatch(loadUser())

        async function getStripeApiKey() {

            const {data} = await axios.get('/api/v1/stripeapi');

            setStripeApiKey(data.stripeApiKey)

        }

        getStripeApiKey();
    }, [])

    const { user, isAuthenticated, loading } = useSelector(state => state.auth)

    return (
        <Router>
            <div className="App">
                <Header/>
                <div className="container container-fluid">
                    <Route path="/" component={Home} exact/>
                    <Route path="/search/:keyword" component={Home}/>
                    <Route path="/product/:id" component={ProductDetails} exact/>
                    <Route path="/login" component={Login} exact/>
                    <Route path="/register" component={Register} exact/>
                    <Route path="/password/forgot" component={ForgotPassword} exact/>
                    <Route path="/password/reset/:token" component={NewPassword} exact/>
                    <ProtectedRoute path="/me" component={Profile} exact/>
                    <ProtectedRoute path="/me/update" component={UpdateProfile} exact/>
                    <ProtectedRoute path="/password/update" component={UpdatePassword} exact/>
                    <ProtectedRoute path="/cart" component={Cart} exact/>
                    <ProtectedRoute path="/shipping" component={Shipping} exact/>
                    <ProtectedRoute path="/confirm" component={ConfirmOrder} exact/>
                    {stripeApiKey &&
                    <Elements stripe={loadStripe(stripeApiKey)}>
                        <ProtectedRoute path="/payment" component={Payment}/>
                    </Elements>
                    }
                    <ProtectedRoute path="/success" component={OrderSuccess} exact/>
                    <ProtectedRoute path="/orders/me" component={ListOrders} exact/>
                    <ProtectedRoute path="/order/:id" component={OrderDetails} exact/>
                </div>
                <ProtectedRoute path="/dashboard" isAdmin={true} component={Dashboard} exact/>
                <ProtectedRoute path="/admin/products" isAdmin={true} component={ProductsList} exact/>
                <ProtectedRoute path="/admin/product" isAdmin={true} component={NewProduct} exact/>
                <ProtectedRoute path="/admin/product/:id" isAdmin={true} component={UpdateProduct} exact />
                <ProtectedRoute path="/admin/orders" isAdmin={true} component={OrdersList} exact />
                <ProtectedRoute path="/admin/order/:id" isAdmin={true} component={ProcessOrder} exact />
                <ProtectedRoute path="/admin/users" isAdmin={true} component={UsersList} exact />
                <ProtectedRoute path="/admin/user/:id" isAdmin={true} component={UpdateUser} exact />
                <ProtectedRoute path="/admin/reviews" isAdmin={true} component={ProductReviews} exact />
                {!loading && (!isAuthenticated || user.role !== 'admin') && (
                    <Footer/>
                )}
            </div>
        </Router>
    );
}

export default App;

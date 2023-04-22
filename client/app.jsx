import React from "react";
import { Component } from "react";
import Login from "./components/login";
import Register from "./components/register";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./components/dashboard";
import AddItem from "./components/addItems";
import EditItem from "./components/editItem";
import ViewItem from "./components/viewItems";
import ViewCart from "./components/viewCart";
import Payment from "./components/payment";
import Deleteitem from "./components/deleteitem";
import Otp from "./components/otp";
import Paymentmsg from "./components/paymentmsg";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addItems" element={<AddItem />} />
          <Route path="/editItems" element={<EditItem />} />
          <Route path="/deleteitm" element={<Deleteitem />} />
          <Route path="/viewItems" element={<ViewItem />} />
          <Route path="/viewCart" element={<ViewCart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/paymentmsg" element={<Paymentmsg />} />
          <Route path="/otp" element={<Otp/>} />
        </Routes>
      </BrowserRouter>
    );
  }
}

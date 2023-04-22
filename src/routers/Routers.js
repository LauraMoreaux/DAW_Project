import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyAccount from "../pages/MyAccount";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const Router = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/my-account" element={<MyAccount />}></Route>
      </Routes>
      <Footer />
    </>
  );
};

export default Router;

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import { Component, useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { ShoppingCartOutlined } from '@material-ui/icons';
import { FavoriteBorderOutlined , AccountBoxOutlined } from '@mui/icons-material';
import cookie from "react-cookies";
import { Navigate, withRouter } from "react-router";
import SearchBox from "./Searchbox";
import LoginModal from "./LoginModal";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { logout, signin, signout } from "../actions/userActions";
import { connect } from "react-redux";
import axios from "axios";
import { setproductaction } from "../actions/productactions";
import { BACKEND } from "../constants/userConstants";

function EtsyNavbar(props) {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  //handle logout to destroy the cookie
  const handleLogout = (e) => {
    console.log("Inside logout");
    dispatch(logout());
    axios.get(BACKEND + "/api/products").then((response) => {
      dispatch(setproductaction(response.data));
    });
    cookie.remove("cookie", { path: "/" });
  };

  return (
    <div className="EtsyNavbar">
      <Navbar bg="white" variant="white">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="logo">ETSYYY</Navbar.Brand>
          </LinkContainer>
          <SearchBox></SearchBox>
          <Nav className="me-auto justify-content-center">
            {isLoggedIn ? (
              <Link to="/favorites" className="nav-link" style={{color: "black"}}>
                {/* Favorites */}
                <FavoriteBorderOutlined />
              </Link>
            ) : (
              <Link to="/"></Link>
            )}
          </Nav>
          <Nav className="me-auto">
            {!isLoggedIn ? (
              <Link to="/"></Link>
            ) : userInfo[0].shopname === null ? (
              <Link to="/createshop" className="nav-link" style={{color: "black"}}>
                Sell
              </Link>
            ) : (
              <Link
                to={"/shop/" + userInfo[0].shopname}
                className="nav-link"
                style={{color: "black"}}
              >
                Sell
              </Link>
            )}
          </Nav>
          <Nav className="me-auto">
            {isLoggedIn ? (
              <Link to="/myorders" className="nav-link"  style={{color: "black"}}>
                My Orders
              </Link>
            ) : (
              <Link to="/"></Link>
            )}
          </Nav>
          <Nav className="me-auto">
            {isLoggedIn ? (
              <Link to="/profile" className="nav-link"  style={{color: "black"}}>
                {/* Profile */}
                <AccountBoxOutlined />
              </Link>
            ) : (
              <Link to="/"></Link>
            )}
          </Nav>
          {isLoggedIn ? (
            <ul class="nav navbar-nav navbar-right">
              <li>
                <Link to="/" onClick={handleLogout} className="nav-link"  style={{color: "black"}}>
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <ul class="nav navbar-nav navbar-right">
              <li>
                <LoginModal buttonName={"SIGN IN"} redirectTo={"/"}  style={{color: "black"}}></LoginModal>
              </li>
            </ul>
          )}
          <Nav className="me-auto">
            <Link to="/cart" className="nav-link" style={{color: "black"}}>
              {/* Cart */}
              <ShoppingCartOutlined />
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default EtsyNavbar;

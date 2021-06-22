import React, { useState, useEffect, Fragment } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";

import Register from "./auth/Register";
import Login from "./auth/Login";
import Admin from "./auth/Admin";
import { Link } from "react-router-dom";
import { logout} from "../js/action/authAction";
import axios from "axios";


const AppNavbar = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const currentUser = useSelector((state) => state.authReducer.user)
  console.log("currentUser", currentUser)


  
return (
  <Navbar className="d-flex justify-content-between" color="dark" dark>
    <NavbarBrand
      tag={() => (
        <Link
          style={{ textDecoration: "none", color: "white", fontSize: "25px" }}
          to="/"
        >
          {/* Auth App */}
        </Link>
      )}
    />
    <Nav className="text-white">
      {isAuth ? (
      
        <Fragment>
          <NavItem className="p-2">
            <Button onClick={() => dispatch(logout())} color="light">
              Logout
            </Button>
          </NavItem>
          <NavItem className="p-2">
            <Button color="light">
              <Link to="/homepage" style={{textDecoration: "none" }}>Home</Link>
            </Button>
          </NavItem>
        </Fragment>
      ) 

      : (
        <Fragment>
          <NavItem className="p-2">
            <Login />
          </NavItem>
          <NavItem className="p-2">
            <Register />
          </NavItem>
          <NavItem className="p-2">
            <Admin />
          </NavItem>
        </Fragment>
      )}
    </Nav>
  </Navbar>
);
};
export default AppNavbar;


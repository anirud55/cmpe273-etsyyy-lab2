import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cleearerrormessage, login } from "../actions/userActions";
import { Navigate } from "react-router";
import cookie from "react-cookies";
import { Formik, Field, Form } from "formik";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/3056059/pexels-photo-3056059.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form1 = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button1 = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link1 = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

export default function LoginModal(props) {
  const [show, setShow] = useState(props.show);
  const handleShow = () => setShow(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state) => state.error);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const dispatch = useDispatch();

  //email change handler to update state variable with the text entered by the user
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
    dispatch(cleearerrormessage());
  };

  //password change handler to update state variable with the text entered by the user
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
    dispatch(cleearerrormessage());
  };

  //Closing the modal
  const handleClose = () => {
    dispatch(cleearerrormessage());
    setShow(false);
  };

  //submit Login handler to send a request to the node backend
  const submitLogin = async (e) => {
    dispatch(cleearerrormessage());
    dispatch(login(email, password)).then((response) => { });
  };

  return isLoggedIn ? (
    <Navigate to={props.redirectTo} state={"loggedin"} />
  ) : (
    <>
      <Link to={""} onClick={handleShow} className="nav-link">
        {props.buttonName}
      </Link>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>SIGN IN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div class="container" style={{
              display: "flex",
              "background-color": "white",
              "align-items": "center",
              "justify-content": "center",
            }}>
              <div class="login-form">
                <div class="main-div">
                  <div class="panel">
                    <p>SIGN IN</p>
                  </div>
                  <br></br>
                  <div class="form-group" style={{
                    flex: 1,
                    "min-width": "80%",
                    margin: "10px 0",
                    padding: "10px"
                  }}>
                    <input
                      onChange={emailChangeHandler}
                      type="email"
                      class="form-control"
                      placeholder="Email Address"
                    />
                  </div>
                  <br></br>
                  <div class="form-group" style={{
                    flex: 1,
                    "min-width": "80%",
                    margin: "10px 0",
                    padding: "10px"
                  }}>
                    <input
                      onChange={passwordChangeHandler}
                      type="password"
                      class="form-control"
                      name="password"
                      placeholder="Password"
                    />
                  </div>
                  <br></br>
                  <div>
                    <Button variant="success" onClick={submitLogin}
                      style={{
                        width: "40%", border: "none",
                        "padding": "15px 20px", 
                        "background-color": "teal",
                        "color": "white",
                        "cursor": "pointer",
                        "margin-bottom": "10px"
                      }}
                    >
                      SIGN IN
                    </Button>
                  </div>
                  <br></br>
                  <div class={error ? "visible" : "invisible"}>
                    <div>{error}</div>
                  </div>
                  <div className="mb-3">
                  CREATE A NEW ACCOUNT?{" "}
                    <Link to={`/signup`} onClick={handleClose}>
                      CREATE
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

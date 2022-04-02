import React, { useState } from "react";
import styled from "styled-components";
import { Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { cleearerrormessage, signup } from "../actions/userActions";
import cookie from "react-cookies";
import { BACKEND } from "../constants/userConstants";

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
  width: 40%;
  padding: 20px;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    );
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button1 = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

//Define a Signup Page Component
export default function SignUpPage(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state) => state.error);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  //name change handler to update state variable with the text entered by the user
  const nameChangeHandler = (e) => {
    setName(e.target.value);
    dispatch(cleearerrormessage());
  };
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

  //submit Login handler to send a request to the node backend
  const submitSignUp = async (e) => {
    dispatch(signup(name, email, password));
  };

  return isLoggedIn ? (
    <Navigate to="/home" />
  ) : (
    <div>
      <Container>
      <Wrapper>
        {/* <div class="login-form"> */}
          <div class="main-div">
            <div class="panel">
            <Title>CREATE AN ACCOUNT</Title>
            </div>
            <div class="form-group" style={{ width: "40%" }}>
              <input
                onChange={nameChangeHandler}
                type="text"
                required="true"
                class="form-control"
                name="name"
                placeholder="Full Name"
              />
            </div>
            <br></br>
            <div class="form-group" style={{ width: "40%" }}>
              <input
                onChange={emailChangeHandler}
                type="email"
                required="true"
                class="form-control"
                name="email"
                placeholder="Email Address"
              />
            </div>
            <br></br>
            <div class="form-group" style={{ width: "40%" }}>
              <input
                onChange={passwordChangeHandler}
                type="password"
                required="true"
                class="form-control"
                name="password"
                placeholder="Password"
              />
            </div>
            <br></br>
            <div>
              <button onClick={submitSignUp} class="btn btn-primary" style={{
                        width: "40%", border: "none",
                        "padding": "15px 20px", "background-color": "teal",
                        "color": "white",
                        "cursor": "pointer",
                        "margin-bottom": "10px"
                      }}>
                Create Account
              </button>
            </div>
            <br></br>
            <div class={error ? "visible" : "invisible"}>
              <div>{error}</div>
            </div>
          </div>
        {/* </div> */}
        </Wrapper>
        </Container>
    </div>
  );
}

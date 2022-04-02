import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Navigate } from "react-router";
import Button from "react-bootstrap/Button";
import { BACKEND } from "../constants/userConstants";

//Define a Create Shop Component
class CreateShopPage extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);

    this.state = {
      shopname: "",
      shopcreated: undefined,
      message: undefined,
    };
    //Bind the handlers to this class
    this.shopnameChangeHandler = this.shopnameChangeHandler.bind(this);
    this.shopnameAvailable = this.shopnameAvailable.bind(this);
    this.createShop = this.createShop.bind(this);
  }

  //shop name change handler to update state variable with the text entered by the user
  shopnameChangeHandler = (e) => {
    this.setState({
      shopname: e.target.value,
      message: "",
    });
  };

  componentWillMount() {
    const data = {
      email: localStorage.getItem("email"),
    };
    if (localStorage.getItem("email") != null) {
      axios
        .post(BACKEND + "/isshopalreadycreated", data)
        .then((response) => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            this.setState({
              shopcreated: true,
              shopname: response.data,
            });
          }
        });
    }
  }

  shopnameAvailable = (e) => {
    if (
      this.state.shopname === "" ||
      this.state.shopname === "null" ||
      this.state.shopname === null
    ) {
      this.setState({
        message: "Shop name cannnot be empty",
      });
    } else {
      //prevent page from refresh
      e.preventDefault();
      const data = {
        shopname: this.state.shopname,
      };
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      axios
        .post(BACKEND + "/shopNameAvailable", data)
        .then((response) => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            this.setState({
              message: response.data,
            });
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          this.setState({
            message: error.response.data,
          });
        });
    }
  };

  //submit Shop Name to send a request to the node backend
  createShop = (e) => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      shopname: this.state.shopname,
      email: localStorage.getItem("email"),
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;

    axios
      .post(BACKEND + "/createshop", data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            message: response.data,
            shopcreated: true,
          });
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        this.setState({
          message: error.response.data,
        });
      });
  };

  render() {
    //redirect based on successful login
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Navigate to="/" />;
    }
    if (this.state.shopcreated) {
      redirectVar = <Navigate to={"/shop/" + this.state.shopname} />;
    }
    return (
      <div>
        {redirectVar}
        <div class="container">
          <div class="profile-form">
            <div class="main-div">
              <div class="panel">
                <h2>Name</h2>
                <div class="form-inline my-2 my-lg-0">
                  <div class="input-group" style={{"display":"flex" , "flexDirection": "column"}}>
                    <input
                      type="text"
                      class="form-control"
                      onChange={this.shopnameChangeHandler}
                      placeholder="Shop Name"
                      style={{width: "40%" , height:"50px" , "margin-bottom":"20px"}}
                    />
                    <Button
                      type="button"
                      variant="primary"
                      onClick={this.shopnameAvailable}
                      style={{
                        width: "40%", border: "none",
                        "margin-top":"20px",
                        "padding": "15px 20px", "background-color": "teal",
                        "color": "white",
                        "display":"flex",
                        "flex-direction": "column",
                        "cursor": "pointer",
                        "margin-bottom": "10px",
                        "align-items" : "center",
                        "justify-content" : "caneter"
                      }}
                    >
                      Check Availability
                    </Button>
                  </div>
                </div>
                <br></br>
                <div class={this.state.message ? "visible" : "invisible"}>
                  <div>{this.state.message}</div>
                </div>
                <div
                  class={
                    this.state.message === "Shop is available"
                      ? "visible"
                      : "invisible"
                  }
                >
                  <Button
                    type="button"
                    variant="primary"
                    onClick={this.createShop}
                    style={{
                      width: "40%", border: "none",
                      "padding": "15px 20px", "background-color": "teal",
                      "color": "white",
                      "cursor": "pointer",
                      "margin-bottom": "10px"
                    }}
                  >
                    Create Shop
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//export CreateShop Component
export default CreateShopPage;

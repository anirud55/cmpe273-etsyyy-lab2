import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import Row from "react-bootstrap/Row";
import styled from "styled-components"
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { setproductaction } from "../actions/productactions";
import Slider from "../components/Slider";
import { BACKEND } from "../constants/userConstants";

function HomePage(props) {
  // const [products, setproducts] = useState([]);
  const [mounted, setMounted] = useState(false);
  const userInfo = useSelector((state) => state.userInfo);
  const products = useSelector((state) => state.products);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo !== null) {
      console.log(userInfo[0].email);
      axios
        .get(BACKEND + "/othersellerproducts/" + userInfo[0].email)
        .then((response) => {
          dispatch(setproductaction(response.data));
        });
    } else {
      axios.get(BACKEND + "/api/products").then((response) => {
        dispatch(setproductaction(response.data));
      });
    }
    setMounted(true);
  }, [isLoggedIn]);

  return (
    <div>
      <Helmet>
        <title>ETSYYY</title>
      </Helmet>
      {userInfo !== null ? (
        <h1>Welcome to ETSYYY, {userInfo[0].name}</h1>
      ) : (
        <h1>Explore one-of-a-kind finds from independent makers</h1>
      )}
      <Slider />
      <div className="products">
        <Row>
          {products !== null ? (
            products.products.map((product) => (
              <Col key={product.id} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))
          ) : (
            <div></div>
          )}
        </Row>
      </div>
    </div>
  );
}

export default HomePage;

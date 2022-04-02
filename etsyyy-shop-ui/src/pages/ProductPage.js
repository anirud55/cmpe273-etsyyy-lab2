import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import { Navigate, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import FavoriteModal from "../components/FavoriteModal";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { BACKEND } from "../constants/userConstants";

const Container = styled.div`
  
`;

const Wrapper = styled.div`
  padding : 50px;
  display:flex;

`;

const ImgContainer = styled.div`
  flex:1;

`;

const Image = styled.img`
  width:100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex:1;
  padding :0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin:20px 0px;
`;

const Price = styled.span`
  font-weight:100;
  font-size:40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display:flex;
  justify-content:space-between;
`;

const Filter = styled.div`
  display : flex;
  align-items:center;
`;

const FilterTitle = styled.span`
  font-size:20px;
  font-weight:200;
`;

const FilterColor = styled.div`
  width:15px;
  height: 15px;
  border-radius:40%;
  background-color: ${props=>props.color};
  margin: 0px 5px;
  cursor:pointer;
`;

const AddContainer = styled.div`
  width:50%;
  display:flex;
  align-items:center;
  justify-content : space-between;
`;
const AmountContainer = styled.div`
  display:flex;
  align-items:center;
  font-weight:700;
`;
const Amount = styled.span`
  width : 30px;
  height : 30px;
  border-radius : 10px; 
  border : 1px solid teal;
  display : flex;
  align-items:center;
  justify-content:center;
  margin: 0px 5px;
`;
const Button1 = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight : 500;
  &:hover{
    background-color : #f8f4f4;
  }
`;

function ProductPage(props) {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [addToCartQuantity, setaddToCartQuantity] = useState("");
  const [mounted, setMounted] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const currency = useSelector((state) => state.currency.currency);

  useEffect(() => {
    console.log(id);
    axios
      .get(BACKEND + "/api/products/id/" + id)
      .then((response) => {
        //update the state with the response data
        setProduct(response.data);
        setMounted(true);
      });
  }, []);

  //instock change handler to update state variable with the text entered by the user
  const quantityChangeHandler = (e) => {
    setaddToCartQuantity(e.target.value);
    setMessage("");
  };

  const addToCartHandler = async () => {
    if (!cookie.load("cookie")) {
      setMessage("You must be logged in to add items to cart.");
    } else if (product.shopname === localStorage.getItem("shopname")) {
      setMessage("You cannot add your own item to your cart");
    } else if (setaddToCartQuantity < 1) {
      setMessage("Please enter a valid quantity.");
    } else if (localStorage.getItem("cartItems") != null) {
      var cartItems = JSON.parse(localStorage.getItem("cartItems"));
      const existItem = cartItems.find((x) => x.id === product.id);
      // console.log(existItem.quantity);
      const quantity = existItem
        ? parseInt(existItem.quantity) + parseInt(addToCartQuantity)
        : parseInt(addToCartQuantity);
      console.log(quantity);
      if (parseInt(product.instock) < parseInt(quantity)) {
        setMessage("Quantity of product you entered is not available.");
        return;
      }
      if (existItem === undefined) {
        cartItems[cartItems.length] = {
          quantity: quantity,
          ...product,
        };
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        setMessage("Product added to cart.");
        return;
      }
      const index = cartItems
        ? cartItems.findIndex((item) => item.id === product.id)
        : 0;
      cartItems[index] = {
        quantity: quantity,
        ...product,
      };
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      setMessage("Product added to cart.");
    } else if (addToCartQuantity <= product.instock) {
      var cartItems = [
        {
          quantity: addToCartQuantity,
          ...product,
        },
      ];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      setMessage("Product added to cart.");
    } else {
      setMessage("Quantity of product you entered is not available.");
    }
  };

  const checkoutHandler = () => {
    navigate("/cart");
  };

  return (
    <div>
      <Row>
        <Col md={8}>
          <div>
            <h3>
              <ImgContainer>
                <Image src={product.image} alt={product.name} />
              </ImgContainer>
              <FavoriteModal
                name={product.name}
                shopname={product.shopname}
              ></FavoriteModal>
            </h3>
          </div>
        </Col>
        <Col md={4}>
            <Title>{product.name}</Title>
            <Desc>{product.description}</Desc>
            <Desc>Category: {product.category}</Desc>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color="Red" />
              <FilterColor color="Black" />
              <FilterColor color="Blue" />
            </Filter>
            <Desc>Total Sold: {product.totalsales}</Desc>
            <Desc>Available: {product.instock}</Desc>
            <Card>
              <Card.Body>
                <Desc>
                  <Row>
                    <Col>Seller:</Col>
                    <Col>
                      <Link to={`/shop/${product.shopname}`}>
                        <Card.Title>{product.shopname}</Card.Title>
                      </Link>
                    </Col>
                  </Row>
                </Desc>
                  <Desc>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        {currency} {product.price}
                      </Col>
                    </Row>
                  </Desc>
                  <Desc>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.instock > 0 ? (
                          <Badge bg="success">In Stock</Badge>
                        ) : (
                          <Badge bg="danger">Out of Stock</Badge>
                        )}
                      </Col>
                    </Row>
                  </Desc>
                  {product.instock > 0 && (
                    <Desc>
                      <div class="form-group" style={{ width: "100%" }}>
                        <input
                          onChange={quantityChangeHandler}
                          type="text"
                          default="1"
                          class="form-control"
                          name="countInStock"
                          value={addToCartQuantity}
                          placeholder="Quantity of product"
                        />
                      </div>
                      <br></br>
                      <div className="d-grid">
                        <Button onClick={addToCartHandler} variant="primary" style={{
                          width: "100%", border: "none",
                          "padding": "15px 20px", "background-color": "teal",
                          "color": "white",
                          "cursor": "pointer",
                          "margin-bottom": "10px"
                        }}>
                          Add to Cart
                        </Button>
                        <br></br>
                        <Button onClick={checkoutHandler} variant="primary"
                          style={{
                            width: "100%", border: "none",
                            "padding": "15px 20px", "background-color": "teal",
                            "color": "white",
                            "cursor": "pointer",
                            "margin-bottom": "10px"
                          }}
                        >
                          Proceed to Checkout
                        </Button>
                      </div>
                      <br></br>
                      <div>
                        <div class={message ? "visible" : "invisible"}>
                          <div>{message}</div>
                        </div>
                      </div>
                    </Desc>
                  )}
              </Card.Body>
            </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductPage;

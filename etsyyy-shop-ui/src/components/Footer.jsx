import {
    Facebook,
    Instagram,
    MailOutline,
    Phone,
    Pinterest,
    Room,
    Twitter,
  } from "@material-ui/icons";
  import styled from "styled-components";
  import { mobile } from "../responsive";
  import Dropdown from "react-bootstrap/Dropdown";
  import { useDispatch } from "react-redux";
  import { currencychange } from "../actions/currencyAction";
  
  const Container = styled.div`
    display: flex;
    ${mobile({ flexDirection: "column" })}
  `;
  
  const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
  `;
  
  const Logo = styled.h1``;
  
  const Desc = styled.p`
    margin: 20px 0px;
  `;
  
  const SocialContainer = styled.div`
    display: flex;
  `;
  
  const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
  `;
  
  const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ display: "none" })}
  `;
  
  const Title = styled.h3`
    margin-bottom: 30px;
  `;
  
  const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  `;
  
  const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
  `;
  
  const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ backgroundColor: "#fff8f8" })}
  
  `;
  
  const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  `;
  
  const Payment = styled.img`
      width: 50%;
  `;
  
  const Footer = () => {

    const currencyupdate = (e) => {
    console.log(e);
    dispatch(currencychange(e));
  };
  const dispatch = useDispatch();
    return (
      <Container>
        <Left>
          <Logo>ETSYY</Logo>
          <Desc>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don’t look even slightly believable.
          </Desc>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <Twitter />
            </SocialIcon>
            <SocialIcon color="E60023">
              <Pinterest />
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>
          <Title>Useful Links</Title>
          <List>
            <ListItem>Home</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Man Fashion</ListItem>
            <ListItem>Woman Fashion</ListItem>
            <ListItem>Accessories</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Terms</ListItem>
          </List>
          <Dropdown
              style={{ position: "absolute", left: "300px", bottom: "25px" }}
              onSelect={currencyupdate}
            >
              {" "}
              <Dropdown.Toggle id="dropdown-basic" style={{ "background-color": "teal" }}>
                Currency
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="$">USD($)</Dropdown.Item>
                <Dropdown.Item eventKey="₹">INR(₹)</Dropdown.Item>
                <Dropdown.Item eventKey="">JPY(¥)</Dropdown.Item>
                <Dropdown.Item eventKey="€">EUR(€)</Dropdown.Item>
                <Dropdown.Item eventKey="£">GBP(£)</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <Room style={{marginRight:"10px"}}/> 1 Washington Sq, San Jose, CA 95192
          </ContactItem>
          <ContactItem>
            <Phone style={{marginRight:"10px"}}/> +1(408) 924-1000
          </ContactItem>
          <ContactItem>
            <MailOutline style={{marginRight:"10px"}} /> abc@sjsu.edu
          </ContactItem>
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Right>
      </Container>
    );
  };
  
  export default Footer;
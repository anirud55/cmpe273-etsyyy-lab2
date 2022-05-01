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
import React, { Fragment, useEffect, useState } from 'react'
import { Row, Col, Modal, Button, Form } from 'react-bootstrap'
import country_currencies from './../utils/country_currencies.json'

const Container = styled.div`
display: flex;
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

    const [showCountrySettings, setSHowCountrySettings] = useState(false)

    const [country, setCountry] = useState()
    const [currency, setCurrency] = useState()

    const changeCountryAndCurrency = () => {
        console.log(country)
        const cc = country_currencies.filter(item => item.country == country)
        const currency = cc[0].currency_code
        setCurrency(currency)
        window.localStorage.setItem("country_currency", [country, currency])
        setSHowCountrySettings(false)
        window.location.reload(false)
    }

    useEffect(() => {
        const cc = window.localStorage.getItem("country_currency")
        console.log(cc)
        if (cc) {
            setCountry(cc.split(',')[0])
            setCurrency(cc.split(',')[1])
        }
    }, [])

    return (
        <Fragment >
            <Container>
                <Left>
                    <Logo>ETSYYY</Logo>
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
                </Center>
                <Right>
                    <Title>Contact</Title>
                    <ContactItem>
                        <Room style={{ marginRight: "10px" }} /> 1 Washington Sq, San Jose, CA 95192
                    </ContactItem>
                    <ContactItem>
                        <Phone style={{ marginRight: "10px" }} /> +1(408) 924-1000
                    </ContactItem>
                    <ContactItem>
                        <MailOutline style={{ marginRight: "10px" }} /> abc@sjsu.edu
                    </ContactItem>
                    <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
                </Right>
            </Container>
            <Row style={{ margin: 0 }}>
                <Col sm={2}></Col>
                <Col sm={6}>
                    <Button style={{
                        width: "30%", border: "none",
                        "padding": "15px 20px",
                        "background-color": "teal",
                        "color": "white",
                        "cursor": "pointer",
                        "margin-bottom": "10px"
                    }}
                        onClick={() => setSHowCountrySettings(true)} variant='outline-primary'>{'      '}({currency}) </Button>
                </Col>
            </Row>

            <Modal show={showCountrySettings}
                onHide={() => setSHowCountrySettings(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Country Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Select aria-label="Country" onChange={(e) => setCountry(e.target.value)}>
                        {country_currencies.map(item => (
                            <option>{item.country}</option>
                        ))}
                    </Form.Select>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        style={{
                            border: "none",
                            "background-color": "teal",
                            "color": "white",
                            "cursor": "pointer"
                        }}
                        onClick={() => setSHowCountrySettings(false)}>
                        Close
                    </Button>
                    <Button
                        style={{
                            border: "none",
                            "background-color": "teal",
                            "color": "white",
                            "cursor": "pointer"
                        }}
                        onClick={() => changeCountryAndCurrency()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default Footer
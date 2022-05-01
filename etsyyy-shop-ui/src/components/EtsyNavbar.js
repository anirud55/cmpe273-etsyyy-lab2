import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Navbar, Nav, NavDropdown, Container, InputGroup, FormControl, Form, Button, Col, Row, Tooltip, OverlayTrigger, Badge } from 'react-bootstrap'
import Signup from './../pages/SignUpPage'
import axios from 'axios'
import { Link, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import constants from './../../src/constants/userConstants.json'

const NavBarLayout = props => {
  const [showModal, setShowModal] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [cartItems, setCartItems] = useState()
  const [searchParameter, setSearchParameter] = useState()
  const [search, setSearch] = useState(false)


  toast.configure()

  useEffect(async () => {
    const user = await axios.post(constants.uri + "/users/auth")
    if (user.data) {
      //LoggedIN
      setLoggedIn(true)
      const { data } = await axios.post(constants.uri + "/order/cart-items", { userId: user.data.id })
      if (data) {
        setCartItems(data.length)
        window.localStorage.setItem('cart', data.length)
      }
    } else {
      setLoggedIn(false)
    }
  }, [])

  useEffect(async () => {
    const user = await axios.post(constants.uri + "/users/auth")
    const { data } = await axios.post(constants.uri + "/order/cart-items", { userId: user.data.id })
    if (data) {
      setCartItems(data.length)
    }
  }, [window.localStorage.getItem('cart')])

  const logout = (e) => {
    e.preventDefault()
    window.localStorage.setItem("userdetails", "")
    setLoggedIn(false)
    window.location.reload(false)
    toast.success("Logged Out")
  }

  const searchSubmit = (e) => {
    e.preventDefault()
    console.log(searchParameter)
    setSearch(true)
  }

  if (search) {
    return <Navigate to={`/products/${searchParameter}`} />

  }

  return (
    <Fragment>
      <Navbar expand="lg">
        <Container fluid>

          <Col sm={1}></Col>
          <Col sm={1}>
            <Navbar.Brand href="#"><Link to="/dashboard" style={{ textDecoration: 'none', color: 'black' }}><span style={{ fontSize: 28, fontWeight: 'bold' }}>ETSYYY</span></Link></Navbar.Brand>
          </Col>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">

            <Col sm={6}>
              <Form className="d-flex" style={{ width: "100%" }}>
                <FormControl
                  type="search"
                  placeholder="Search for anything"
                  className="me-1 rounded-pill"
                  aria-label="Search"
                  name="searchParameter"
                  value={searchParameter}
                  onChange={(e) => setSearchParameter(e.target.value)}
                />
                <Button className='rounded-pill'
                  style={{
                    border: "none",
                    "background-color": "teal",
                    "cursor": "pointer"
                  }}
                  onClick={(e) => searchSubmit(e)}> <i class="fa fa-search" aria-hidden="true"></i></Button>
              </Form>
            </Col>

            <Col sm={2}></Col>


            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >

              {loggedIn && (
                <>
                  <Nav.Link><Link to="/profile" >
                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Favorites</Tooltip>}>
                      <i class="fa fa-heart-o" style={{ color: 'red' }} aria-hidden="true"></i>
                    </OverlayTrigger>
                  </Link></Nav.Link>

                  <Nav.Link></Nav.Link>


                  <Nav.Link>
                    <Link to="/shop">
                      <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Sell on ETSYYY</Tooltip>}>
                        <i class="fa fa-shopping-bag" style={{ color: 'black' }} aria-hidden="true"></i>
                      </OverlayTrigger>
                    </Link>
                  </Nav.Link>

                  <Nav.Link></Nav.Link>

                  <NavDropdown title={(<i class="fa fa-user-circle" aria-hidden="true" style={{ color: 'black' }} ></i>)} id="basic-nav-dropdown" >
                    <NavDropdown.Item ><Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}><span>Profile</span></Link></NavDropdown.Item>
                    <NavDropdown.Item ><Link to="/myOrders" style={{ textDecoration: 'none', color: 'black' }}><span>Purchases</span></Link></NavDropdown.Item>
                    <NavDropdown.Item ><Link to="/shop/myShops" style={{ textDecoration: 'none', color: 'black' }}><span>Shops</span></Link></NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link></Nav.Link>

                  <Nav.Link>
                    <Link to="/cart" style={{ textDecoration: 'none', color: 'black' }}>
                      <i class="fa fa-shopping-cart" aria-hidden="true"></i><Badge style={{
                        fontSize: 12,
                        backgroundColor: '#ff0000', color: '#fff', paddingTop: 2, paddingBottom: 2, paddingLeft: 5, paddingRight: 5, verticalAlign: 'top', marginLeft: '-5px'
                      }} pill bg="success">{cartItems}</Badge>

                    </Link>

                  </Nav.Link>
                </>
              )}

            </Nav>
            {!loggedIn && (
              <Button
                style={{
                  border: "none",
                  "background-color": "teal",
                  "color": "white",
                  "cursor": "pointer"
                }}
                onClick={() => setShowModal(true)}>SIGN IN</Button>
            )}

            {loggedIn && (
              <Button
                style={{
                  border: "none",
                  "background-color": "teal",
                  "color": "white",
                  "cursor": "pointer"
                }}
                onClick={(e) => logout(e)}>
                Logout
              </Button>
            )}

          </Navbar.Collapse>
        </Container>
      </Navbar>
      {
        showModal && (
          <Signup
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )
      }
    </Fragment >

  )
}

NavBarLayout.propTypes = {}

export default NavBarLayout
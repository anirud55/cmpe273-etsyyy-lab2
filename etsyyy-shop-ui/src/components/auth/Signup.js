import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom'
import constants from './../../utils/constants.json'

const Signup = ({ showModal, setShowModal }) => {
    const [signin, setSignin] = useState(true)
    const [register, setRegister] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)


    const handleRegister = (e) => {
        e.preventDefault()
        setRegister(true)
        setSignin(false)
    }

    const [registerForm, setRegisterForm] = useState({
        email: "",
        firstName: "",
        password: ""
    })

    const [loginForm, setLoginForm] = useState({
        loginEmail: "",
        loginPassword: ""
    })

    const { email, firstName, password } = registerForm

    const { loginEmail, loginPassword } = loginForm

    const onChangeData = e => {
        e.preventDefault()
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })
    }

    const onChangeLoginData = e => {
        e.preventDefault()
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
        // console.log(loginForm)
    }

    const onSubmitRegister = async e => {
        e.preventDefault()
        console.log(registerForm)
        try {
            const res = await axios.post(constants.uri + "/users/register", registerForm)
            if (res.status === 200) {
                window.localStorage.setItem("userdetails", res.data.token)
                setShowModal(false)
                toast.success("Registered", {
                    position: "top-center",
                })
                setLoggedIn(true)
            }
        } catch (error) {
            setShowModal(false)
            toast("Sorry, Try again", { position: "top-center" })
        }
    }

    const onSubmitLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(constants.uri + "/users/login", { email: loginForm.loginEmail, password: loginForm.loginPassword })
            if (res.status === 200) {
                window.localStorage.setItem("userdetails", res.data.token)
                setShowModal(false)
                toast.success("Loggedin", {
                    position: "top-center",
                })
                setLoggedIn(true)
                window.location.reload(false)
            }
        } catch (error) {
            setShowModal(false)
            toast("Sorry, Try again", { position: "top-center" })
        }
    }

    toast.configure()

    if (loggedIn) {
        return <Navigate to="/dashboard" />
    }

    return (
        <Fragment>
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <Row>
                            <Col sm={8}>
                                LOGIN
                            </Col>
                            <Col sm={4}>
                                <Button onClick={(e => { handleRegister(e) })}
                                    style={{
                                        border: "none",
                                        "background-color": "teal",
                                        "color": "white",
                                        "cursor": "pointer"
                                    }}
                                    className='float-right'>SIGNUP</Button>
                            </Col>
                        </Row>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {signin && !register && (
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="email" name="loginEmail" value={loginEmail} onChange={(e) => onChangeLoginData(e)} placeholder="Enter Email Address" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control type="password" name="loginPassword" value={loginPassword} onChange={(e) => onChangeLoginData(e)} placeholder="Enter Password" />
                            </Form.Group>
                            <Button
                                style={{
                                    width: "40%",
                                    border: "none",
                                    "background-color": "teal",
                                    "color": "white",
                                    "cursor": "pointer"
                                }}
                                onClick={(e) => onSubmitLogin(e)} type="submit">
                                SIGN IN
                            </Button>
                        </Form>
                    )}

                    {!signin && register && (
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="email" name="email" value={email} placeholder="Enter Email address" onChange={(e) => onChangeData(e)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Control type="text" name="firstName" value={firstName} placeholder="Enter Full Name" onChange={(e) => onChangeData(e)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control type="password" name="password" value={password} placeholder="Enter Password" onChange={(e) => onChangeData(e)} />
                            </Form.Group>

                            <Button style={{
                                width: "40%",
                                border: "none",
                                "background-color": "teal",
                                "color": "white",
                                "cursor": "pointer"
                            }}
                                onClick={(e) =>
                                    onSubmitRegister(e)
                                }
                                type="submit">
                                SIGNUP
                            </Button>
                        </Form>
                    )}

                </Modal.Body>
            </Modal>
        </Fragment>
    )
}

Signup.propTypes = {}

export default Signup
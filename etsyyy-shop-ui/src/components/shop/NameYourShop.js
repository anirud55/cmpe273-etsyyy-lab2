import axios from 'axios'
import React, { Fragment, useState } from 'react'
import { Button, InputGroup, Card, FormControl, Badge } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import constants from './../../utils/constants.json'

const NameYourShop = () => {
    const [name, setName] = useState("")
    const [nameAvailable, setNameAvailable] = useState(false)
    const [show, setShow] = useState(false)

    const [registered, setRegistered] = useState(false)

    const checkAvailability = async (e) => {
        e.preventDefault()
        setShow(true)
        const res = await axios.post(constants.uri + "/shop/check-availablity", { name })
        if (res.status === 200) {
            setNameAvailable(true)
        } else if (res.status === 201) {
            setNameAvailable(false)
        } else {
            setNameAvailable(false)
        }
    }

    const createNewShop = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(constants.uri + "/shop/add", { name })
            if (res.data) {
                toast.success("Registered your new shop")
                setRegistered(true)
            }
        } catch (error) {
            toast("Sorry! Try registering agian")
        }
    }

    if (registered) {
        return <Navigate to={`/shop/${name}/home`} />
    }
    return (
        <Fragment>
            <div style={{ marginLeft: "15%", marginRight: "15%", marginTop: "10%" }}>
                <h3 style={{ textAlign: 'center' }}>Name your Shop</h3>
                <h5 style={{ fontWeight: "lighter", textAlign: 'center' }}>Don’t sweat it! You can just draft a name now and change it later. We find sellers often draw inspiration from what they sell, their style, pretty much anything goes.</h5>
            </div>
            <br />
            <Card>
                <Card.Body style={{ marginLeft: "15%", marginRight: "15%" }}>
                    <InputGroup >
                        <FormControl
                            placeholder="Enter your shop name"
                            aria-label="name"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Text id="basic-addon2">
                            <Button style={{
                                width: 'auto',
                                border: "none",
                                "background-color": "teal",
                                "color": "white",
                                "cursor": "pointer"
                            }}
                                onClick={(e) => checkAvailability(e)}>
                                CHECK!
                            </Button>
                        </InputGroup.Text>
                    </InputGroup>
                </Card.Body>
            </Card>
            <br />

            {nameAvailable && name && show && (
                <div style={{ marginLeft: "15%", marginRight: "15%", textAlign: 'center' }}>
                    <h3><Badge><i class="fa fa-check" aria-hidden="true"></i>{' '}Great thinking! This name's available!</Badge></h3><br />
                    <Button
                        style={{
                            border: "none",
                            "background-color": "teal",
                            "color": "white",
                            "cursor": "pointer"
                        }}
                        onClick={(e) => createNewShop(e)}>
                        CREATE SHOP!
                    </Button>
                    {/* <Link to={`/shop/${name}/home`}><span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Create your new Shop ?</span></Link> */}
                </div>
            )}

            {!nameAvailable && name && show && (
                <div style={{ marginLeft: "15%", marginRight: "15%", textAlign: 'center' }}>
                    <h3><Badge bg="danger"><i class="fa fa-frown-o" aria-hidden="true"></i>{' '}Shop name is not available!</Badge></h3><br />
                </div>
            )}


        </Fragment>
    )
}

export default NameYourShop
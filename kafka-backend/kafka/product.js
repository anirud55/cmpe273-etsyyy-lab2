const kafkaConection = require('./connection')
const actions = require('./../actions/actions.json')

const ProductService = require('./../services/product')

kafkaConection.getConsumer('products', (consumer) => {

    var producer = kafkaConection.getProducer()

    consumer.on('message', function (message) {
        var data = JSON.parse(message.value)
        const { payload, correlationId } = data
        const { action } = payload

        console.log("+=+=+=+=+=+=+=+=+=+=Backend data consumption+=+=+=+=+=\n",action)

        if (action == actions.CREATE_PRODUCT) {
            ProductService.createProduct(payload, (err, res) => {
                var payload = {}
                if (err) {
                    console.log("Serivce failed, ERR: ", err)
                    payload = {
                        status: 400,
                        content: err,
                        correlationId: correlationId
                    }
                }

                if (res) {
                    payload = {
                        status: 200,
                        content: res,
                        correlationId: correlationId
                    }
                }

                //Send Response to acknowledge topic
                payloads = [
                    { topic: 'acknowledge', messages: JSON.stringify({ "acknowledgementpayload": true, payload }), partition: 0 }
                ]
                producer.send(payloads, (err, data) => {
                    if (err) throw err
                    console.log("+=+=+=+=+=+=+=+=+=+=Acknowledged+=+=+=+=+=\n", data)
                })
            })
        }

        if (action == actions.EDIT_PRODUCT) {

            ProductService.editProduct(payload, (err, res) => {
                var payload = {}
                if (err) {
                    console.log("Serivce failed, ERR: ", err)
                    payload = {
                        status: 400,
                        content: err,
                        correlationId: correlationId
                    }
                }

                if (res) {
                    payload = {
                        status: 200,
                        content: res,
                        correlationId: correlationId
                    }
                }

                //Send Response to acknowledge topic
                payloads = [
                    { topic: 'acknowledge', messages: JSON.stringify({ "acknowledgementpayload": true, payload }), partition: 0 }
                ]
                producer.send(payloads, (err, data) => {
                    if (err) throw err
                    console.log("+=+=+=+=+=+=+=+=+=+=Acknowledged+=+=+=+=+=", data)
                })
            })
        }

        if (action == actions.GET_ITEMS) {

            ProductService.getItems(payload, (err, res) => {
                var payload = {}
                if (err) {
                    console.log("Serivce failed, ERR: ", err)
                    payload = {
                        status: 400,
                        content: err,
                        correlationId: correlationId
                    }
                }

                if (res) {
                    payload = {
                        status: 200,
                        content: res,
                        correlationId: correlationId
                    }
                }

                //Send Response to acknowledge topic
                payloads = [
                    { topic: 'acknowledge', messages: JSON.stringify({ "acknowledgementpayload": true, payload }), partition: 0 }
                ]
                producer.send(payloads, (err, data) => {
                    if (err) throw err
                    console.log("+=+=+=+=+=+=+=+=+=+=Acknowledged+=+=+=+=+=\n", data)
                })
            })
        }

        if (action == actions.GET_PRODUCTS) {

            ProductService.getProducts(payload, (err, res) => {
                var payload = {}
                if (err) {
                    console.log("Serivce failed, ERR: ", err)
                    payload = {
                        status: 400,
                        content: err,
                        correlationId: correlationId
                    }
                }

                if (res) {
                    payload = {
                        status: 200,
                        content: res,
                        correlationId: correlationId
                    }
                }

                //Send Response to acknowledge topic
                payloads = [
                    { topic: 'acknowledge', messages: JSON.stringify({ "acknowledgementpayload": true, payload }), partition: 0 }
                ]
                producer.send(payloads, (err, data) => {
                    if (err) throw err
                    console.log("+=+=+=+=+=+=+=+=+=+=Acknowledged+=+=+=+=+=\n", data)
                })
            })
        }

        if (action == actions.GET_PRODUCT_BY_ID) {

            ProductService.getProductById(payload, (err, res) => {
                var payload = {}
                if (err) {
                    console.log("Serivce failed, ERR: ", err)
                    payload = {
                        status: 400,
                        content: err,
                        correlationId: correlationId
                    }
                }

                if (res) {
                    payload = {
                        status: 200,
                        content: res,
                        correlationId: correlationId
                    }
                }

                //Send Response to acknowledge topic
                payloads = [
                    { topic: 'acknowledge', messages: JSON.stringify({ "acknowledgementpayload": true, payload }), partition: 0 }
                ]
                producer.send(payloads, (err, data) => {
                    if (err) throw err
                    console.log("+=+=+=+=+=+=+=+=+=+=Acknowledged+=+=+=+=+=\n", data)
                })
            })
        }

        if (action == actions.GET_FILTERED_PRODUCTS) {

            ProductService.getFilteredProducts(payload, (err, res) => {
                var payload = {}
                if (err) {
                    console.log("Serivce failed, ERR: ", err)
                    payload = {
                        status: 400,
                        content: err,
                        correlationId: correlationId
                    }
                }

                if (res) {
                    payload = {
                        status: 200,
                        content: res,
                        correlationId: correlationId
                    }
                }

                //Send Response to acknowledge topic
                payloads = [
                    { topic: 'acknowledge', messages: JSON.stringify({ "acknowledgementpayload": true, payload }), partition: 0 }
                ]
                producer.send(payloads, (err, data) => {
                    if (err) throw err
                    console.log("+=+=+=+=+=+=+=+=+=+=Acknowledged+=+=+=+=+=\n", data)
                })
            })
        }

        if (action == actions.GET_PRODUCTS_BY_CATEGORY) {

            ProductService.getProductsByCategory(payload, (err, res) => {
                var payload = {}
                if (err) {
                    console.log("Serivce failed, ERR: ", err)
                    payload = {
                        status: 400,
                        content: err,
                        correlationId: correlationId
                    }
                }

                if (res) {
                    payload = {
                        status: 200,
                        content: res,
                        correlationId: correlationId
                    }
                }

                //Send Response to acknowledge topic
                payloads = [
                    { topic: 'acknowledge', messages: JSON.stringify({ "acknowledgementpayload": true, payload }), partition: 0 }
                ]
                producer.send(payloads, (err, data) => {
                    if (err) throw err
                    console.log("+=+=+=+=+=+=+=+=+=+=Acknowledged+=+=+=+=+=\n", data)
                })
            })
        }

        if (action == actions.GET_FILTERED_PRODUCTS_SORT_BY_PRICE) {

            ProductService.getFilteredProductsSortByPrice(payload, (err, res) => {
                var payload = {}
                if (err) {
                    console.log("Serivce failed, ERR: ", err)
                    payload = {
                        status: 400,
                        content: err,
                        correlationId: correlationId
                    }
                }

                if (res) {
                    payload = {
                        status: 200,
                        content: res,
                        correlationId: correlationId
                    }
                }

                //Send Response to acknowledge topic
                payloads = [
                    { topic: 'acknowledge', messages: JSON.stringify({ "acknowledgementpayload": true, payload }), partition: 0 }
                ]
                producer.send(payloads, (err, data) => {
                    if (err) throw err
                    console.log("+=+=+=+=+=+=+=+=+=+=Acknowledged+=+=+=+=+=\n", data)
                })
            })
        }

        if (action == actions.GET_FILTERED_PRODUCTS_SORT_BY_QUANTITY) {

            ProductService.getFilteredProductsSortByQuantity(payload, (err, res) => {
                var payload = {}
                if (err) {
                    console.log("Serivce failed, ERR: ", err)
                    payload = {
                        status: 400,
                        content: err,
                        correlationId: correlationId
                    }
                }

                if (res) {
                    payload = {
                        status: 200,
                        content: res,
                        correlationId: correlationId
                    }
                }

                //Send Response to acknowledge topic
                payloads = [
                    { topic: 'acknowledge', messages: JSON.stringify({ "acknowledgementpayload": true, payload }), partition: 0 }
                ]
                producer.send(payloads, (err, data) => {
                    if (err) throw err
                    console.log("+=+=+=+=+=+=+=+=+=+=Acknowledged+=+=+=+=+=\n", data)
                })
            })
        }

        if (action == actions.GET_FILTERED_PRODUCTS_SORT_BY_SALES) {

            ProductService.getFilteredProductsSortBySales(payload, (err, res) => {
                var payload = {}
                if (err) {
                    console.log("Serivce failed, ERR: ", err)
                    payload = {
                        status: 400,
                        content: err,
                        correlationId: correlationId
                    }
                }

                if (res) {
                    payload = {
                        status: 200,
                        content: res,
                        correlationId: correlationId
                    }
                }

                //Send Response to acknowledge topic
                payloads = [
                    { topic: 'acknowledge', messages: JSON.stringify({ "acknowledgementpayload": true, payload }), partition: 0 }
                ]
                producer.send(payloads, (err, data) => {
                    if (err) throw err
                    console.log("+=+=+=+=+=+=+=+=+=+=Acknowledged+=+=+=+=+=\n", data)
                })
            })
        }

        if (action == actions.SEARCH_PRODUCT) {
            ProductService.searchProduct(payload, (err, res) => {
                var payload = {}
                console.log("ERR,RES",err,res)
                if (err) {
                    console.log("Serivce failed, ERR: ", err)
                    payload = {
                        status: 400,
                        content: err,
                        correlationId: correlationId
                    }
                }

                if (res) {
                    payload = {
                        status: 200,
                        content: res,
                        correlationId: correlationId
                    }
                    console.log("+=+=+=+=+=+=+=+=+=+=Sending response+=+=+=+=+=\n")
                }

                //Send Response to acknowledge topic
                payloads = [
                    { topic: 'acknowledge', messages: JSON.stringify({ "acknowledgementpayload": true, payload }), partition: 0 }
                ]
                producer.send(payloads, (err, data) => {
                    if (err) throw err
                    console.log("+=+=+=+=+=+=+=+=+=+=Acknowledged+=+=+=+=+=\n", data)
                })
            })
        }
    })
})
const conn = require('./connection')
const actions = require('./../action/actions.json')

const shop = require('./../services/shop')

conn.getConsumer('sellers',(consumer) => {
    
    var producer = conn.getProducer()

    consumer.on('message', function(message){
        var data = JSON.parse(message.value)
        const {payload,correlationId} = data 
        const { action } = payload
        
        console.log("1. Cosumed Data at backend...")

        if(action == actions.CREATE_SELLER){
            shop.createSeller(payload,(err,res) => {
                var payload = {}
                if(err){
                    console.log("Serivce failed, ERR: ",err)
                   payload ={
                    status: 400,
                    content : err,
                    correlationId:correlationId
                   } 
                }
        
                if(res){
                    payload = {
                        status:200,
                        content:res,
                        correlationId:correlationId
                    }
                }
        
                //Send Response to acknowledge topic
                payloads = [
                    {topic:'acknowledge',messages:JSON.stringify({"acknowledgementpayload":true,payload}),partition:0}
                ]
                producer.send(payloads,(err,data)=>{
                    if(err) throw err
                    console.log("2. Sent Acknowledegemt ...\n",data)
                })
            })
        }

        if(action == actions.UPDATE_SHOP){
            
            shop.updateShop(payload,(err,res) => {
                var payload = {}
                if(err){
                    console.log("Serivce failed, ERR: ",err)
                   payload ={
                    status: 400,
                    content : err,
                    correlationId:correlationId
                   } 
                }
        
                if(res){
                    payload = {
                        status:200,
                        content:res,
                        correlationId:correlationId
                    }
                }
        
                //Send Response to acknowledge topic
                payloads = [
                    {topic:'acknowledge',messages:JSON.stringify({"acknowledgementpayload":true,payload}),partition:0}
                ]
                producer.send(payloads,(err,data)=>{
                    if(err) throw err
                    console.log("2. Sent Acknowledegemt ...\n",data)
                })
            })
        }

        if(action == actions.CHECK_AVAILABILITY){
            
            shop.checkAvailability(payload,(err,res) => {
                var payload = {}
                if(err){
                    console.log("Serivce failed, ERR: ",err)
                   payload ={
                    status: 400,
                    content : err,
                    correlationId:correlationId
                   } 
                }
        
                if(res){
                    payload = {
                        status:200,
                        content:res,
                        correlationId:correlationId
                    }
                }
        
                //Send Response to acknowledge topic
                payloads = [
                    {topic:'acknowledge',messages:JSON.stringify({"acknowledgementpayload":true,payload}),partition:0}
                ]
                producer.send(payloads,(err,data)=>{
                    if(err) throw err
                    console.log("2. Sent Acknowledegemt ...\n",data)
                })
            })
        }

        if(action == actions.GET_SHOPS_BY_NAME){
            
            shop.getShopsByName(payload,(err,res) => {
                var payload = {}
                if(err){
                    console.log("Serivce failed, ERR: ",err)
                   payload ={
                    status: 400,
                    content : err,
                    correlationId:correlationId
                   } 
                }
        
                if(res){
                    payload = {
                        status:200,
                        content:res,
                        correlationId:correlationId
                    }
                }
        
                //Send Response to acknowledge topic
                payloads = [
                    {topic:'acknowledge',messages:JSON.stringify({"acknowledgementpayload":true,payload}),partition:0}
                ]
                producer.send(payloads,(err,data)=>{
                    if(err) throw err
                    console.log("2. Sent Acknowledegemt ...\n",data)
                })
            })
        }

        if(action == actions.MY_SHOPS){
            
            shop.myShops(payload,(err,res) => {
                var payload = {}
                if(err){
                    console.log("Serivce failed, ERR: ",err)
                   payload ={
                    status: 400,
                    content : err,
                    correlationId:correlationId
                   } 
                }
        
                if(res){
                    payload = {
                        status:200,
                        content:res,
                        correlationId:correlationId
                    }
                }
        
                //Send Response to acknowledge topic
                payloads = [
                    {topic:'acknowledge',messages:JSON.stringify({"acknowledgementpayload":true,payload}),partition:0}
                ]
                producer.send(payloads,(err,data)=>{
                    if(err) throw err
                    console.log("2. Sent Acknowledegemt ...\n",data)
                })
            })
        }
    })
})
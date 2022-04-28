const conn = require('./connection')
const actions = require('./../action/actions.json')

const user = require('./../services/users')
const auth = require('./../services/auth')

conn.getConsumer('users',(consumer) => {
    
    var producer = conn.getProducer()

    consumer.on('message', function(message){
        var data = JSON.parse(message.value)
        const {payload,correlationId} = data 
        const { action } = payload
        
        console.log("+=+=+=+=+=Kafka_Logs+=+=+=+=+=Backend data consumption+=+=+=+=+=")

        if(action == actions.CREATE_USER){
            user.createUser(payload,(err,res) => {
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
                    console.log("+=+=+=+=+=Kafka_Logs+=+=+=+=+=Acknowledeged+=+=+=+=+=\n",data)
                })
            })
        }

        if(action == actions.LOGIN){
            auth.login(payload,(err,res) => {
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
                    console.log("+=+=+=+=+=Kafka_Logs+=+=+=+=+=Acknowledeged+=+=+=+=+=\n",data)
                })
            })
        }

        if(action == actions.GET_USER_DETAILS){
            auth.getUserDetails(payload,(err,res) => {
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
                    console.log("+=+=+=+=+=Kafka_Logs+=+=+=+=+=Acknowledeged+=+=+=+=+=\n",data)
                })
            })
        }

        if(action == actions.UPDATE_USER){
            
            user.updateUser(payload,(err,res) => {
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
                    console.log("+=+=+=+=+=Kafka_Logs+=+=+=+=+=Acknowledeged+=+=+=+=+=\n",data)
                })
            })
        }
    })
})
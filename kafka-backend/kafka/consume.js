const kafkaConection = require('./connection')
const actions = require('../action/actions.json')

const cart = require('../services/cart')

kafkaConection.getConsumer('etsy',(consumer) => {
    
    var producer = kafkaConection.getProducer()

    consumer.on('message', function(message){
        var data = JSON.parse(message.value)
        const {payload,correlationId} = data 
        const { action } = payload
        
        console.log("+=+=+=+=+=Kafka_Logs+=+=+=+=+=Backend data consumption+=+=+=+=+=")

        if(action == actions.ADD_TO_CART){
            
            cart.addToCart(payload,(err,res) => {
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
const rpc = require('./kafkarpc')
const kafka = new rpc()

exports.sendKafkaRequest = (topic_name,msg_payload,callback) => {
    console.log("1. Requesting Kafka ...")
    kafka.kafkaRequest(topic_name,msg_payload,(error,response)=>{
        if(error) return callback(error,null)
        return callback(null,response)
    })
}
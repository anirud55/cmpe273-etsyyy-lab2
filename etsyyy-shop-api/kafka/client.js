const rpc = require('./kafkarpc')
const kafka = new rpc()

exports.sendKafkaRequest = (topicName,payload,cb) => {
    console.log("+=+=+=+=+=+=+=+=+=+=Requesting Kafka+=+=+=+=+=")
    kafka.kafkaRequest(topicName,payload,(err,res)=>{
        if(err) return cb(err,null)
        return cb(null,res)
    })
}
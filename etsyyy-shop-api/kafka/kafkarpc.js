const conn = require('./connection')
const uuid = require('uuid').v4

module.exports = class KafkaRequestResponse {

    requests = {}
    constructor() {}

    consumer = conn.getConsumer('acknowledge')

    kafkaRequest(topic_name,msg_payload,results){
        var producer = conn.getProducer()

        const correlationId = uuid()
        var entry = {
            results: results
        }

        this.requests[correlationId] = entry

        console.log("+=+=+=+=+=Kafka_Logs+=+=+=+=+=CorrelationId and requests entry+=+=+=+=+=")
        this.kafkaResponse(function(){
            producer.on('ready',function() {
                let payloads = [
                    {topic: topic_name,messages: JSON.stringify({msg_payload,correlationId}),partition:0}
                ]
                console.log("+=+=+=+=+=Kafka_Logs+=+=+=+=+=Producer sending data+=+=+=+=+=",payloads)
                producer.send(payloads,function(err,data){
                    console.log("ERR ",err)
                    console.log("DATA ",data)
                })
            })
        })
    }

    kafkaResponse(next){
        let requestsWaiting = this.requests
        console.log("Requests Waiting: ",requestsWaiting)
        this.consumer.on('message', function (message) {
            console.log("Acknowledgement recieved :",message)

            var acknowledgementData = JSON.parse(message.value)
            var correlationId = acknowledgementData.msg_payload.correlationId

            console.log("CorreleationID: ",correlationId)
            console.log("request:", requestsWaiting)
            if (correlationId in requestsWaiting) {

                var entry = requestsWaiting[correlationId]

                delete requestsWaiting[correlationId]

                if(acknowledgementData.msg_payload.status === 200){
                    console.log("200",acknowledgementData.msg_payload.content)
                    return entry.results(null, acknowledgementData.msg_payload.content)
                }

                if(acknowledgementData.msg_payload.status === 400){
                    return entry.results(acknowledgementData.msg_payload.content, null)   
                }

                entry.results('Server Error', null)   
            }
        });
        this.requests = requestsWaiting
        return next()
    }
}
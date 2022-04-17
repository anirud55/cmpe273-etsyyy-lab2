var kafka = require('kafka-node')

exports.getProducer = () => {
    var client = new kafka.KafkaClient("localhost:2181")
    var HighLevelProducer = kafka.HighLevelProducer;
    return new HighLevelProducer(client)
}

exports.getConsumer = (topic_name) => {
    console.log(topic_name)
    var client  = new kafka.KafkaClient("localhost:2181")
    var Consumer = kafka.Consumer
    var kafkaConsumer = new Consumer(client,[
        {topic:topic_name,partition:0}
 
    ])
    return kafkaConsumer
}
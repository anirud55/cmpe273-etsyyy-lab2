var kafka = require('kafka-node')

const latestoffset = require('./loff')

exports.getProducer = () => {
    var client = new kafka.KafkaClient("localhost:2181");
    var HighlevelProducer = kafka.HighLevelProducer;
    return new HighlevelProducer(client)
}

exports.getConsumer = (topic_name,results) => {

    var lOffset;
    latestoffset.getlatestOffset(topic_name, function (returnValue) {
        lOffset = returnValue

        var client = new kafka.KafkaClient("localhost:2181")
        var Consumer = kafka.Consumer

        var options = {
            groupId: 'orders-group',
            fromOffset: 'latest'
        };

        var kafkaConsumer = new Consumer(client, [
            { topic: topic_name, offset: lOffset, partition: 0 },
        ], options,
            {
                autoCommit: false 
            })
        return results(kafkaConsumer)
    })
}
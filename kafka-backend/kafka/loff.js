var kafka = require('kafka-node')

exports.getlatestOffset = (topic_name,callback) => {
    var client  = new kafka.KafkaClient("localhost:2181")

    var offset = new kafka.Offset(client)
    var loff;
    offset.fetch([{
        topic:topic_name,partition:0,time:-1}], function(err,data){
            loff = data[topic_name]['0'][0]
            return callback(loff)
        })
}
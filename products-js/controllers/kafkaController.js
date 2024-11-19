const KafkaProducer = require('../producer.js');

const sendMessageToKafka = (topic, data) => {
  const kafkaProducer = new KafkaProducer();
  const message = [{ 
    key: 'key' , 
    value: JSON.stringify(data)
  }];
  console.log(message)
  kafkaProducer.produce(topic, message);
}

module.exports = sendMessageToKafka
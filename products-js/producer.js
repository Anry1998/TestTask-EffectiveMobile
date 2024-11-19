
const { Kafka } = require('kafkajs');

class KafkaProducer {
  constructor() {
    this.kafka = new Kafka({
      clientId: "remains-products-service",
      brokers: ["localhost:9092"],
    });
    this.producer = this.kafka.producer();
  }

  async produce(topic, messages) {
    try {
      await this.producer.connect();
      await this.producer.send({
        topic: topic,
        messages: messages,
      });
    } catch (error) {
      console.error(error);
    } finally {
      await this.producer.disconnect();
    }
  }
}

module.exports = KafkaProducer;

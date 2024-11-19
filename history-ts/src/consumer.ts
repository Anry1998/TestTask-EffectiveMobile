import { Kafka, Consumer } from "kafkajs";

// const newBuffer = bufferFromBufferString('<Buffer 54 68 69 73 20 69 73 20 61 20 62 75 66 66 65 72 20 65 78 61 6d 70 6c 65 2e>')

// console.log(newBuffer.toString()) 

class KafkaConsumer {
  kafka: Kafka
  consumer: Consumer

  constructor() {
    this.kafka = new Kafka({
      clientId: "history-service",
      brokers: ["localhost:9092"],
    }); 
    this.consumer = this.kafka.consumer({ groupId: "test-group" });
  }

  async consume(topic: string, callback: any) {
    try {
      await this.consumer.connect();
      await this.consumer.subscribe({ topic: topic, fromBeginning: true });
      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          if (message.key && message.value) {
            console.log('Received message', {
              topic,
              partition,
              key: message?.key.toString(),
              value: message?.value.toString()
            })
          }

          if (message.value) { 
            const str = JSON.parse(message.value.toString()) ;
            callback(str);
          }
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export default KafkaConsumer;

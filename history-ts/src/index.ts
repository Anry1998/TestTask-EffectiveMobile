
import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import express from "express"
import cors from "cors"
import { AppDataSource } from "./data-source"
import KafkaConsumer from "./consumer";
import { HistoryCreateController } from "./controller/history-create.controller";
import router from "./routes";


const APP_PORT = process.env.APP_PORT || 5001
const app = express()
app.use(cors())
app.use(express.json()) 
app.use('/api', router) 

const kafkaConfig = new KafkaConsumer();
const create = new HistoryCreateController()
kafkaConfig.consume("test-topic", ( value: any) => {
    console.log("Receive object: ", value);
    create.save(value)
});

const start = async  () => {
    try {
        AppDataSource.initialize()
        app.listen(APP_PORT, () => console.log(`Server started on port ${APP_PORT}`))
    } catch (e) {
        console.log(e)
    } 
}
start()
import "reflect-metadata"
import { DataSource } from "typeorm"
import { History } from "./entity/history"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [History],
    migrations: [],
    subscribers: [],
})

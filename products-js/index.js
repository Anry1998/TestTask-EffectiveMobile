require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./modelss/model')
const cors = require('cors')
const router = require('./routes/index')
const  kafkaProducer  = require('./producer')
const APP_PORT = process.env.APP_PORT || 5001 

const kafkaController = require('./controllers/kafkaController')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)




app.get('/', (req, res) => {
    res.status(200).json({m: 'Работает как швейцарские часы'})
})

// app.post("/send", kafkaController.sendMessageToKafka);

// app.post('/send', async (req, res) => {
//     console.log('Все ок')
//     kafkaProducer.produce()

//     // const result = typeof(publishMessage)
//     // const result = await publishMessage()

//     res.status(200).json(test)
// })

const start = async  () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        app.listen(APP_PORT, () => console.log(`Server started on port ${APP_PORT}`))
    } catch (e) {
        console.log(e)
    } 
}
start() 


// const seeding = async () => {
//     try {
//         await sequelize.authenticate()
//         await sequelize.sync()
//         app.listen(APP_PORT, () => console.log(`Server started on port ${APP_PORT}`))

//         return console.log(`Server started on port ${APP_PORT}`)
       
        
//     } catch (e) {
//         console.log(e)
//     } 
// }

// const ARG_FUNCTION_MAP = {
//     '--run': seeding
// };

//   const arg = process.argv;  // [2](https://stackoverflow.com/questions/10522532/stop-node-js-program-from-command-line) Второй аргумент командной строки
//   if (ARG_FUNCTION_MAP[arg]) {
//     ARG_FUNCTION_MAP[arg]();
//   }
  // Пример использования: node index.js --run

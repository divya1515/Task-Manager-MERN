import dotenv from 'dotenv'
import connectDB from './db/index.js'
import {app} from './app.js'


dotenv.config();

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at ${process.env.PORT}`)
    })
    app.on("error",(error)=>{
        console.log("SERVER RUNTIME PROBLEM WHILE LISTENING",error)
       
    })

}).catch((error)=>{
    console.log("MONGODB Connecton Fails",error)
})
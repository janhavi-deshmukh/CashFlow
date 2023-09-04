const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const dotenv=require('dotenv')
const colors=require('colors')
const dbConnection=require("./config/dbConnection");
dotenv.config();
const app=express()

dbConnection();
app.use(cors())
app.use(morgan('dev'))
app.use(express.json());
app.use(cors())

//routes
//user routes
app.use("/api/v1/users",require('./routes/userRoute'));

//transaction route
app.use("/api/v1/transactions",require('./routes/transactionRoute'));

const PORT=8000 || process.env.PORT

//listen server
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});
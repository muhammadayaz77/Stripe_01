import express from 'express'
import connectDB from './config/db.mjs';
import cors from 'cors'
import paymentRouter from './routes/paymentRouter.mjs'
import userRouter from './routes/userRouter.mjs'
import dotenv from 'dotenv'
dotenv.config();
let app = express();

app.use(express.json());
app.use(cors());
let PORT = process.env.PORT || 3000;
connectDB();

app.use('/user',userRouter)
app.use('/payment',paymentRouter)
app.get("/ping",(req,res)=>{
  res.send("pong")
})

app.listen(PORT,()=>{
  console.log('running on http://localhost:3000');
})
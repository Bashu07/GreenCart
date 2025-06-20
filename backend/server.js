import express from 'express'

import cors from 'cors'
import cookieParser from 'cookie-parser';
import connectDB from './configs/db.js';
import 'dotenv/config'
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';

  

const app = express()

const PORT = 5000;

// Allowed multiple origins
const allowedOrigins = ['http://localhost:5173','https://greencart-frontend-jade.vercel.app','https://greencart-backend-bashu-awasthis-projects.vercel.app']

// Middleware configuration
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: allowedOrigins , credentials:true}))

await connectDB()
await connectCloudinary()


app.get('/' , (req , res)=>{
    res.send('API working')

})

app.use('/api/user' , userRouter)
app.use('/api/seller' , sellerRouter)
app.use('/api/product' , productRouter)
app.use('/api/cart' , cartRouter)
app.use('/api/address' , addressRouter)
app.use('/api/order' , orderRouter)



app.listen(PORT , ()=>{
console.log("Server runnnin at port" , PORT )
})
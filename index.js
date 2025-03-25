import express from 'express';
import productsRouter from './routes/products.js';
import mongoose from 'mongoose';
import userRouter from './routes/users.js';


//Make database connection
await mongoose.connect(process.env.MONGO_URI);

//create an express app
const app = express();
const port = process.env.PORT || 3000;

//use global middlewares
app.use(express.json())

//use route
app.use(productsRouter);
app.use(userRouter);

//listen for incoming request
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const {connectDb} = require('./config/connectDb');
connectDb();

var indexRouter = require('./routes/index');
app.use(express.json());
app.use('/auth', indexRouter);
const port = process.env.PORT || 5002;
app.listen(port,()=>{
  console.log(`server is listning to prot ${port}`);
})


module.exports = app;

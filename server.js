const express=require('express');
const app=express();

require('dotenv').config();
app.use(express.json());


const PORT=process.env.PORT || 3000;

const db=require('./config/db');
db.connect();

// importing the routes and perform mounting 
const userRoutes=require('./routes/userRoutes');
const candidateRoutes=require('./routes/candidateRoutes');
app.use('/user',userRoutes);
app.use('/candidate',candidateRoutes);

app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`);
})

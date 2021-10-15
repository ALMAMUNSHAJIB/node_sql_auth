const express = require('express');
const userRouter = require('./route');

// require('dotenv').config();

const app = express();
app.use(express.json());

// app.get('/api', (req, res) => {
//     res.json({
//         success: 1,
//         message: "This is working",
//     });
// });


app.use('/api/user', userRouter);



app.listen(3001, ()=> {
    console.log('Server is on:...')
});
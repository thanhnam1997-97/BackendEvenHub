const express = require('express')
const cors = require('cors');
const authRouter = require('./src/routers/authuRouter');
const connectDB = require('./src/configs/connectdb');
const errorMiddleHandle = require('./src/middlewares/errorMiddlewares');
require('dotenv').config()

const app = express();

app.use(cors())
app.use(express.json())

const PORT = 3001

app.use('/auth', authRouter)

connectDB();

app.use(errorMiddleHandle)

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        return
    }
    console.log(`Server starting at http://localhost:${PORT}`);
});
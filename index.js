require('dotenv').config()
const express = require('express');
const createError = require('http-errors')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require("helmet")
const xss = require('helmet')
const app = express();
const port = process.env.PORT;
const mainRouter = require('./src/routes/IndexRouter')

// body parse express 
app.use(express.json());
app.use(cors())
app.use(morgan('dev'))

// router utama
app.use('/', mainRouter);

app.use(helmet())
app.use(xss())
app.all('*', (req, res, next) => {
    next(new createError.NotFound())
})

app.use((err, req, res, next) => {
    const messageError = err.message || "internal server error"
    const statusCode = err.status || 500

    res.status(statusCode).json({
        message: messageError
    })
})


app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})
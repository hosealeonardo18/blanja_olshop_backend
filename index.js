const express = require('express');
const app = express();
const port = 3000;
const mainRouter = require('./src/routes/IndexRouter')

// body parse express 
app.use(express.json());

// router utama
app.use('/', mainRouter);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})
import express from 'express';

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello prom priyanka')
})
app.listen(PORT, () => {
    console.log(`app is running on ${PORT}`)
})

import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express()

app.use(cors())

app.get("/", async (req, res) => {
    const response = await fetch("https://www.reddit.com/r/memes.json?after=");
    res.json(await response.json())
}) 

app.listen(9098, () => {
    console.log("listening on port 9098")
})
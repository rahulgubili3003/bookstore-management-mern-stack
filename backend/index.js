import express from 'express';
import {PORT} from "./config.js";

const app = express();
app.listen(PORT, () => {
    console.log(`App is listening on Port ${PORT}`);
})

// Creating a Basic Route
app.get("/ping", (request, response) => {
    console.log(request)
    return response.status(200).send({"Message" : "Basic Node Js server route"});
})
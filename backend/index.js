import express from 'express';
import {PORT, MONGO_URI} from "./config.js";
import mongoose from 'mongoose';
import {Book} from "./models/bookModel.js";

const app = express();
// Middleware for parsing req body
app.use(express.json())

// Creating a Basic Route
app.get("/ping", (request, response) => {
    console.log(request)
    return response.status(200).send({"Message" : "Basic Node Js server route"});
})

app.post("/addBook", async (request, response) => {
    try {
        if (!request.body.title ||
            !request.body.author ||
            !request.body.year
        ) {
            console.log("One of the required fields is missing in the request body")
            return response.status(400).send({"Response" : "Required Field is Missing"});
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            year: request.body.year,
        };
        const book = await Book.create(newBook);
        return response.status(200).send(book)
    } catch (error) {
        console.log(error)
        return response.status(500).send({"Error" : "Failed to Add Book"})
    }
})

app.get("/books", async (request, response) => {
    try {
        const books = await Book.find({});
        response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message)
    }
})

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connection to DB successful')
        app.listen(PORT, () => {
            console.log(`App is listening on Port ${PORT}`);
        })

    })
    .catch((error) => {
        console.log("Error establishing connection")
        console.log(error)
    });



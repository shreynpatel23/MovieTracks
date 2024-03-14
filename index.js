//Loads the express module
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
// const { MongoClient, ObjectId } = require("mongodb");

// configure dotenv to use the env variables
dotenv.config();

// initialize the express app
const app = express();
// get port or add default port
const port = process.env.PORT || 3000;
// get db url from env or set as empty string
// const DB_URL = process.env.DB_URL || "";

// configure the views folder for rendering the views
app.set("views", path.join(__dirname, "views"));
// set up app to use EJS as template engine
app.set("view engine", "ejs");

// Serves static files (we need it to import a css file)
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

// SET UP FOR EASIER FORM DATA PARSING
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connect to the database url
// const client = new MongoClient(DB_URL);

//Render the home page
app.get("/", (_, res) => {
  res.render("./pages/index");
});

// // render the list of books
// app.get("/books", async (req, res) => {
//   // get all books
//   const books = await getAllBooks();
//   // pass it to the book-list page
//   res.render("./pages/bookList", { books });
// });

// app.get("/add-book", (req, res) => {
//   // render the add book page
//   res.render("./pages/addBook");
// });

// app.post("/add-book-submit", async (req, res) => {
//   // extract the request body as title, price, and publicationdate.
//   let isAddToReadingList = false;
//   const { title, price, publicationDate, addToReadingList } = req.body;

//   // check if the checkbox is clicked or not
//   if (addToReadingList) {
//     isAddToReadingList = true;
//   }
//   // pass into the addBook function
//   await addBook({
//     title,
//     price,
//     publicationDate,
//     addToReadingList: isAddToReadingList,
//   });
//   res.redirect("/books");
// });

// app.get("/edit-book", async (req, res) => {
//   // check if the book id is present to edit
//   // else redirect to books
//   if (req.query.bookId) {
//     // get book details from the getBookById API.
//     const book = await getBookById(req.query.bookId);
//     // render the edit book page with the book details
//     res.render("./pages/editBook", { book });
//   } else {
//     red.redirect("/books");
//   }
// });

// app.post("/edit-book-submit", async (req, res) => {
//   // extract the req body
//   let isAddToReadingList = false;
//   const { bookId, title, price, publicationDate, addToReadingList } = req.body;

//   // convert the id to object id for the update one filter
//   const _id = { _id: new ObjectId(bookId) };

//   // check if the checkbox is checked or not
//   if (addToReadingList) {
//     isAddToReadingList = true;
//   }
//   // pass the data and the id to the updateBook API.
//   await updateBook(_id, {
//     title,
//     price,
//     publicationDate,
//     addToReadingList: isAddToReadingList,
//   });
//   res.redirect("/books");
// });

// // render the list of books added in reading list
// app.get("/reading-list", async (req, res) => {
//   // get all reaading list books
//   const books = await getAllReadingListBooks();
//   // pass it to the reading-list page
//   res.render("./pages/reading-list", { books });
// });

//Makes the app listen to port 3000
app.listen(port, () =>
  console.log(`App listening to http://localhost:${port}`)
);

// // MONGODB FUNCTIONS
// async function connection() {
//   db = client.db("library");
//   return db;
// }

// // Function to select all books from database
// async function getAllBooks() {
//   db = await connection();
//   let results = db.collection("books").find({});
//   let res = await results.toArray();
//   return res;
// }

// // Function to select all books from database where addToReadingList is true
// async function getAllReadingListBooks() {
//   db = await connection();
//   let results = db.collection("books").find({
//     addToReadingList: true,
//   });
//   let res = await results.toArray();
//   return res;
// }

// // Function to get a book from id
// async function getBookById(id) {
//   db = await connection();
//   const bookId = { _id: new ObjectId(id) };
//   const result = await db.collection("books").findOne(bookId);
//   return result;
// }

// // Function to add a new book
// async function addBook(bookData) {
//   db = await connection();
//   await db.collection("books").insertOne(bookData);
// }

// // Function to update a book
// async function updateBook(bookId, bookData) {
//   db = await connection();
//   await db.collection("books").updateOne(bookId, { $set: bookData });
// }
import express from "express"
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("<h1>Hello</h1>");
});

app.get("/about", (req, res) => {
    res.send("<h1>About me</h1><p>My name is Ayushi</p>");
});

app.get("/contact", (req, res) => {
    res.send("<h1>My no is 9369577506</h1>");
});



app.listen(3000, () => {
    console.log(`server running on port ${port}`);
});

import express from "express";
import cors from "cors";

const app = express();
const port = process.env.port || 3000;

app.use(cors());
app.use(express.json);

let posts = [{id: 1, title:"First post", content: "This is a sample blog post"}];

app.get("/api/posts" ,(req,res) => {
    res.json(posts);

});

app.post("/api/posts" , (req,res) => {
    const newPost = {id:Date.now(), ...req.body};
    res.status(201).json(newPost);
});

app.put("/api/posts/:id", (req,res)=> {
    const {id} = req.params;
    posts = posts.map((p) => (p.id==id ? {...p, ...req.body} : p));
    res.json(posts.find((p) => p.id == id));
});

app.delete("/api/posts/:id" , (req, res) => {
    const {id} = eq.params;
    posts = posts.filter((P) => P.id != id);
    res.status(204).end();
});

app.listen(port, () =>{
    console.log(`Server is running at ${port}`);
});
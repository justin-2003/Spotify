import express from 'express';

const app = express();
const port = 4000;

app.get("/",(req,res)=>{
    res.send("hello World");
});

app.listen(port, ()=>{
    console.log(`Server starting on port: ${port}`);
})
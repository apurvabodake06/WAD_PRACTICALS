const express=require("express");
const fs=require("fs");
const PORT = 5000;
const app=express();

app.use(express.static("public"));

app.get("/restro",(req,res)=>
{
    fs.readFile("menu.json",(err,data)=>
    {
        if(err)
        {
            return res.status(500).send("error");
        }
        else
        res.json(JSON.parse(data));
    });
});

app.listen(PORT,()=>
console.log(`server running on port http://localhost:${PORT}`));
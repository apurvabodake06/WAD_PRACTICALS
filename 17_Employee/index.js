const express = require('express');
const app = express();
const fs = require('fs');
const PORT = 3000;

app.use(express.static('public'));

app.get('/api/employee',(req,res) =>{
    fs.readFile('employee.json',(err,data) =>{
        if(err){
            res.status(500).send('Error sendig file');
        }
        res.json(JSON.parse(data));
    })
})

app.listen(PORT,() =>{
    console.log(`server is listening on http://localhost:${PORT}`);
})
const express = require("express"),
        app = express(),
        port = process.env.PORT || 8080,
        cors = require("cors");
const bodyParser = require('body-parser');
const fs = require("fs");

app.use(cors());
app.use(bodyParser.json({extended: true}));

app.listen(port, () => console.log("Backend server live on " + port));

app.get("/", (req, res) => {
    res.send({message: "Connected to Backend!"})
});



const addItem = (req,res) => {
    let id = req.body.jsonObject.id;
    let task = req.body.jsonObject.task;
    let currDate = req.body.jsonObject.currentDate;
    let dueDate = req.body.jsonObject.dueDate;

    var Task = {
        ID: id,
        Task: task,
        Current_date: currDate,
        Due_date: dueDate
    }

    const jsonString = JSON.stringify(Task);

    var data = fs.readFileSync('database.json');

    var json = JSON.parse(data);

    json.push(jsonString);

    fs.writeFile("database.json", JSON.stringify(json), (err) => {
        if(err){
            console.log('error', err);
        }
        else{
            console.log('Successfully wrote to file')
        }
    });
    res.send(200);
}

app.post("/add/item" , addItem);


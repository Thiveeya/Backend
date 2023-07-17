const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

app.use(cors())
app.use(express.json());
const dirPath = path.join(__dirname, "timestamps");


app.get("/",(req,res)=>{

    const utc = new Date();

    //Current Date
    const date = utc.getDate();
    //Current Month
    const month = utc.getMonth()+1;
    //Current Year
    const year = utc.getFullYear();
    //Current Hours
    const hours = utc.getHours();
    //Current Minutes
    const min = utc.getMinutes();
    //Current Seconds
    const seconds = utc.getSeconds();

    const data = `The Current timestamp is Date(${year}-${month}-${date}), Indian Standard Time(${hours}:${min}:${seconds})`;

    fs.writeFile(`${dirPath}/date-time.txt`,data,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("file created");
        }
    })
    res.send(data)
    app.get('/', (request, response) => {

        const textFileFolder = [];
        const files = fs.readdirSync('./FileFolder');
        files.forEach(file => {
            if (path.extname(file) == '.txt') {
                textFileFolder.push(file);
            }
        })
        response.status(200).send(textFileFolder);
    })

    });

    const PORT = 3001;
app.listen(PORT, () => {
    console.log("Server running")
});
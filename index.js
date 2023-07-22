const mentorRouter = require('./Routers/MentorRouter')
const studentRouter = require('./Routers/StudentRouter')

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());  /* To avoid cross origin error */

app.use(express.json());  
const mongoose = require("mongoose");


const dbConnect = async () => {
  try {
    await mongoose.connect(
        "mongodb+srv://rbsthivi:thiveeya@cluster0.vgypaij.mongodb.net/",

      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
      }
    );
    console.log("DB Connected");
  } catch (e) {
    console.log(e.message, "error in connecting db");
  }
};



app.get('/',(req,res) => res.send(`
<div>
<p> In Home Page </p>
</div>
 `))

app.use('/Mentors',mentorRouter);
app.use('/Students',studentRouter);

app.listen(process.PORT || 3002, async (err) => {
    await dbConnect();
    console.log("Started server ");
    if (err) {
      console.log(err, "error in starting server");
    }
  });
import express from 'express';
import articles from "./routers/articles.js";
import users from "./routers/users.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();

let port = 3000;

let app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/articles", articles);
app.use("/users", users);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
      error: {
          message: err.message
      }
  });
});

try {
  await mongoose.connect(process.env.CONNECTION);
  app.listen(process.env.PORT, ()=>{
    console.log(`Listening on port ${port}`)
  })
} catch(e){
  console.log(e.message);
}


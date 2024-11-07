
import express from 'express';
import Article from '../models/Article.js';
import mongoose, { ObjectId } from 'mongoose';
import { auth } from '../auth.js';
let router = express.Router();


function asyncHandler(cb){
  return async (req,res, next) => {
      try {
          await cb(req, res, next);
      } catch(err) {
          next(err);
      }
  }
}

router.route("/")
  .get(asyncHandler(async (req, res)=>{
    let pageSize = 10;
    let { page = 1, category } = req.query;
    let filter = {};
    if(category){
      filter.category = category;
    }
    let articles = Article.find(filter)
    .sort({'createdAt': -1})
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .select(['title', 'userId', 'description']);

    return res.send({
      data: await articles.exec()
    })
  }))
  .post(auth, asyncHandler(async (req, res)=>{
      req.body.userId = req.user.id;
      if(!req.body.title || !req.body.content) {
        return res.status(400).end()
      }
      let response = await Article.create(req.body);
      res.send({
        data: response
      });
    }));

router.route("/:id")
    .get(async (req, res)=> {
      console.log(req.params.id);
      let article = await Article.findById(req.params.id);
      res.send({
        data: article
      });
    })
    .put(auth, async (req, res)=> {
      //return res.json(req.user);
      //let userId = new mongoose.Types.ObjectId("67282b4588b538da3a0026d5");
      let article = await Article.findOneAndUpdate({
        userId: req.user.id,
        _id: req.params.id
      }, {
        //userId: req.user.userId,
        title: req.body.title,
        content: req.body.content
      })
      //does this return the previous?
      res.send({
        data: article
      });

    });

export default router;
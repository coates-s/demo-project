
import express from 'express';
let router = express.Router();
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { createJWT, auth } from '../auth.js';

// function handler(runMe, req, res, next){
//   try {
//     runMe(req, res);
//   } catch (e){
//      next(e); 
//   }
// }

function asyncHandler(cb){
  return async (req,res, next) => {
      try {
          await cb(req, res, next);
      } catch(err) {
          next(err);
      }
  }
}

/*
api design: create, return the token
*/

router.route("/register")
  .post(asyncHandler(async (req, res)=> {
      if(req.body.username && req.body.password){
        let user = await User.create(req.body);
        let response = createJWT(user);
        return res.json({
          response
        });
      }
      else res.status(400).send();
  }));

  /*
    find user
    compare passwords,
    if invalid, return 401 (he includes { massage: nope })
    else return token
  */
  router.route("/login")
  .post(asyncHandler(async (req, res)=>{
    if(req.body.username && req.body.password){
      let user = await User.findOne({
        username: req.body.username
      });
      if(!user) return res.status(401).end();
      let result = await bcrypt.compare(req.body.password, user.password);
      if(result){
        return res.json(createJWT(user));
      }
    }
    return res.status(401).end();
 
  }));

  /*
  Doesn't seem to have a logout method.
  */


export default router;
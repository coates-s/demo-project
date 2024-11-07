import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  username: {
    type: String,
    index: true,
    unique: true, //WHY ISN'T THIS WORKING
    required: true, 
    trim: true
  },
  email: {
    //no email type
    type: String,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true
  },
  biography: {
    type: String,
  },
});
userSchema.pre('save', async function(next){
  if(this.isModified('password')){
    let pword = await bcrypt.hash(this.password, 10);
    this.password = pword;
  }
  next();
})
const User = mongoose.model('Users', userSchema);


export default User;
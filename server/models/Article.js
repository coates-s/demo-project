import mongoose, { Schema, ObjectId } from "mongoose";

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    required: true,
    enum: ['draft', 'published', 'retired']
  },
  category: {
    type: String,
    enum: ['General', 'Technology']
  },
  content: {
    type: String,
    required: true
  },
  userId: {
    type: ObjectId
  }
}, { timestamps: true });
const Article = mongoose.model('Article', articleSchema);

export default Article;
import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  author: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
  },
  urlToImage: {
    type: String,
  },
  publishedAt: {
    type: String,
    required: true,
  },  
  content: {
    type: String,
  },
});

const news = mongoose.model("news", newsSchema);

export default news;

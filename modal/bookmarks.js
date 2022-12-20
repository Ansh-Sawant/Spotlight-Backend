import mongoose from "mongoose";

const bookmarksSchema = new mongoose.Schema({
  name: String,
  email: String,
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
  },  
  content: {
    type: String,
  },
});

const Bookmarks = mongoose.model("bookmarks", bookmarksSchema);

export default Bookmarks;

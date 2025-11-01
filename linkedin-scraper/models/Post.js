const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  postId: { type: String, unique: true },
  authorName: String,
  authorProfile: String,
  content: String,
  publishedDate: Date,
  likes: Number,
  comments: Number,
  shares: Number,
  postUrl: String,
  scrapedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);

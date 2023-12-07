// shortUrlModel.js
import mongoose from 'mongoose';

const shortUrlSchema = new mongoose.Schema({
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
  longUrl: {
    type: String,
    required:true
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
  },
  click: {
    type: Number,
    default:0,
    required:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Url = mongoose.model('ShortUrl', shortUrlSchema);

export default Url;

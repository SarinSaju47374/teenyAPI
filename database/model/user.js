import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  picture:{
    type:String
  },
  email_verified:{
    type:Boolean
  }
});

const User = mongoose.model('User', userSchema);

export default User;

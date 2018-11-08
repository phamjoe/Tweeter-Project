const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

// User Model how data looks like
const userSchema = new Schema({
  email: {
    // Email type
    type: String,
    // Must be unique check if account exist
    unique: true,
    // Easier to work with a lowercase
    lowercase: true,
    // Make sure email doesn't have spaces
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please provide an email address',
  },
  name: {
    type: String,
    trim: true,
    required: 'Please provide a name',
  },
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);

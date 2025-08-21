const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema(
  {
    title: { type: String},
    author: { type: String},
    url:    { type: String},
    likes:  { type: Number},
  }
);

blogSchema.set('toJSON', {
  transform: (retObj) => {
    retObj.id = retObj._id.toString()
    delete retObj._id;
  },
});

module.exports = mongoose.model('Blog', blogSchema)
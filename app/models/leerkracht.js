// app/models/leerkracht.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var leerkrachtSchema=new Schema({
   username: { type: String, required: true, index: { unique: true } },
  firstname : {type : String, required: true,},
  lastname : {type : String, required: true},
  email : {type : String, required: true},
  password: {type: String,required: true}
});

// on every save, add the date
leerkrachtSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

var Leerkracht = mongoose.model('Leerkracht', leerkrachtSchema);

// module.exports allows us to pass this to other files when it is called
module.exports = Leerkracht;

// app/models/leerkracht.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
 bcrypt   = require('bcrypt-nodejs');

var leerkrachtSchema=new Schema({
  firstname : {type : String, required: true,},
  lastname : {type : String, required: true},
  email : {type : String, required: true, index: { unique: true },match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]},
  password: {type: String,required: true}

},{ collection: 'leerkrachten' });

// methods ======================
// generating a hash
leerkrachtSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
leerkrachtSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var Leerkracht = mongoose.model('Leerkracht', leerkrachtSchema);

// module.exports allows us to pass this to other files when it is called
module.exports = Leerkracht;

// app/models/leerkracht.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
 bcrypt   = require('bcrypt-nodejs');


var antwoordSchema=new Schema({
  voornaam : {type : String, required: true},
  achternaam : {type : String, required: true},
  antwoord:{type:String, required: true}
},{ collection: 'antwoorden' },{_id: true});

 var vraagSchema=new Schema({
   vraag : {type : String, required: true,},
   soort: {type : String},
   aangemaakt:  { type: String },
   bewerkt: { type: String },
   antwoorden:[antwoordSchema],
   actief:{type:Boolean},
   oplossingen:[String]
 },{ collection: 'vragen' },{_id: true});

 var lesSchema=new Schema({
   naam : {type : String, required: true},
   leerkrachtID:{type : String},
   vragen:[vraagSchema],
   aangemaakt:  { type: String },
   bewerkt: { type: String },
   token: {type: String },
   actief:{type:Boolean}
 },{ collection: 'lessen' },{_id: true});

 //subdocument schema's have to be before parent schema
var leerkrachtSchema=new Schema({
  firstname : {type : String, required: true},
  lastname : {type : String, required: true},
  email : {type : String, required: true, index: { unique: true },match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]},
  password: {type: String,required: true},
  lessen:[lesSchema]
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
var Les = mongoose.model('Les', lesSchema);
var Vraag = mongoose.model('Vraag', vraagSchema);
var Antwoord = mongoose.model('Antwoord', antwoordSchema);

// module.exports allows us to pass this to other files when it is called
module.exports ={
  Leerkracht: Leerkracht,
    Les: Les,
    Vraag: Vraag,
    Antwoord:Antwoord
  } ;

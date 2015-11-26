// app/models/leerkracht.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var leerkrachtSchema=new Schema({
  firstname : {type : String, required: true,},
  lastname : {type : String, required: true},
  email : {type : String, required: true, index: { unique: true }},
  password: {type: String,required: true}

});

leerkrachtSchema.pre('save', function(next) {
    var leerkracht = this;

    // only hash the password if it has been modified (or is new)
    if (!leerkracht.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(leerkracht.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            leerkracht.password = hash;
            next();
        });
    });
});

leerkrachtSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

var Leerkracht = mongoose.model('Leerkracht', leerkrachtSchema);

// module.exports allows us to pass this to other files when it is called
module.exports = Leerkracht;

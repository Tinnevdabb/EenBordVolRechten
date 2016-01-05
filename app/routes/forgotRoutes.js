var models = require('../models/leerkracht');


    module.exports = function(app, passport, nodemailer,crypto,async) {

app.post('/Forgot', function(req, res, next) {
  console.log('init');
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
        models.Leerkracht.findOne({ email: req.body.email }, function(err, leerkracht) {
        if (!leerkracht) {
            return res.json({ error: 'Er bestaat geen leerkracht met dat email adres.' });
        }

        leerkracht.resetPasswordToken = token;
        leerkracht.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        leerkracht.save(function(err) {
          done(err, token, leerkracht);
        });
      });
    },
    function(token, leerkracht, done) {
      var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'hotmail',
        auth: {
          user: 'eenbordvolrechten@hotmail.com',
          pass: '3ea2cloud'
        }
      });
      var mailOptions = {
        to: leerkracht.email,
        from: 'eenbordvolrechten@hotmail.com',
        subject: 'Node.js Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        done(err, 'done');
        return res.json({ success: 'Er is een email verstuurd naar '+leerkracht.email+' met verdere instructies.' });
      });
    }
  ], function(err) {
    if (err) return next(err);
    return res.json({ redirect: '/Forgot' });
  });
});

};

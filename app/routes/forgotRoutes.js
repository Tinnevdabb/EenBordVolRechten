var models = require('../models/leerkracht');


    module.exports = function(app, passport, nodemailer,crypto,async) {

 //SEND FORGOT PASSWORD EMAIL===============================================
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
        subject: 'EenBordVolRechten Paswoord Reset',
        text: 'Je ontvangt deze email omdat jij (of iemand anders) een paswoord reset voor je account hebt aangevraagd.\n\n' +
          'Klik op de volgende link, of plak de link in je browser om het process te voltooien:\n\n' +
          'http://' + req.headers.host + '/Reset/' + token + '\n\n' +
          'Indien je dit niet hebt aangevraagd kan u deze mail negeren en zullen u email en paswoord onveranderd blijven.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        return res.json({ success: 'Er is een email verstuurd naar '+leerkracht.email+' met verdere instructies.' });
      });
    }
  ], function(err) {
    if (err) return next(err);
    return res.json({ redirect: '/Forgot' });
  });
});


//RESET PASSWORD===============================================

app.post('/reset/:token', function(req, res) {
  async.waterfall([
        function(done) {
          models.Leerkracht.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, leerkracht) {
            if (!leerkracht) {
              return res.json({ error: 'Paswoord token is ongeldig of verlopen.' });
            }
            if (!req.body.newPassword1 || !req.body.newPassword2) {
                return res.json({ error: 'Vul aub alle velden in' });
            }
            if (req.body.newPassword1 != req.body.newPassword2) {
                return res.json({ error: 'wachtwoorden waren niet identiek' });
            }

            leerkracht.password =leerkracht.generateHash( req.body.password1);
            leerkracht.resetPasswordToken = undefined;
            leerkracht.resetPasswordExpires = undefined;

            leerkracht.save(function(err) {
              req.logIn(leerkracht, function(err) {
  		             done(err, leerkracht);

  		        });
            });
          });
        },
        function(leerkracht, done) {
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
            subject: 'Je paswoord is veranderd',
            text: 'Hallo,\n\n' +
              'Dit is een bevestiging dat je paswoord is veranderd.\n'
          };
          smtpTransport.sendMail(mailOptions, function(err) {
            return res.json({ redirect: '/BeheerLessen' });
            done(err);
          });
        }
      ], function(err) {
        return res.json({ redirect: '/' });
      });

  });

};

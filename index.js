var express = require('express');
var exec = require('ssh-exec')
var email = require('./email_sender');
var app = express();
app.set('port', 7999);

/*
{ monitorID: '776793137',
  monitorURL: 'http://beta.carre-project.eu:8080',
  monitorFriendlyName: 'TESTHOST',
  alertType: '2',
  alertTypeFriendlyName: 'Up',
  alertDetails: 'HTTP 200 - OK',
  monitorAlertContacts: '2325540;5;http://beta.carre-project.eu:7999/carre?' }
*/

app.get('/carre', function(req, res) {
  console.log(req.query);
  var id=req.query.monitorID;
  var monitorURL=req.query.monitorURL;
  var monitorFriendlyName=req.query.monitorFriendlyName;
  var status=req.query.alertType; //1 or 2
  //var alertDetails=req.params.alertDetails; //0 or 1
  //monitorAlertContacts
  var responseText='UpRobot : '+monitorFriendlyName + ' is'+(Number(status)===2?' up ':' down ');
  console.log(responseText);
  email.send();
  res.send(responseText);
  
  
});


exec('list', 'dokku@athina.med.duth.gr').pipe(process.stdout)

/*exec('list', {
  user: 'dokku',
  host: 'athina.med.duth.gr',
  key: myKeyFileOrBuffer
  
}).pipe(process.stdout);*/

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

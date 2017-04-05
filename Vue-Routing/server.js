var express = require('express'),
    path    = require('path'),
    app = express();

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'index.html'));
    });

app.post('/world', function(req, res){
  res.send('hello again');
});

app.get('/statuses', function(req, res){
  res.status(201).send('Success get to server');
});


app.listen(9000);

var express = require('express'),
    app = express();

var mongoose = require('mongoose')
  , db = mongoose.createConnection('localhost', 'kisi');

var kisiSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    age: { type: Number, min: 18, max: 100 }
});

var Kisi = db.model('Kisi', kisiSchema);
mongoose.model('Kisi', kisiSchema);
app.get('/kisiEkle', function(req, res) {
    var kisi = new Kisi({ name: 'Ertuğrul', surname: 'Taş', email: 'ertugrul@nodejstr.com', age: 25 });
    kisi.save(function(err) {
        if(err) // TODO handle the error
            res.send(err);
        else
            res.send("kayit başarılı");
    });
});

app.get('/list', function(req, res) {
    Kisi.find(function(err, kisiler) {
        res.send(kisiler)
    });
});

app.listen(3000);
console.log('Server started at port 3000');
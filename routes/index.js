var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'mysql'
});

module.exports = router;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/comentario', function(req, res, next){
    var titulo = req.body.titulo;
    var texto = req.body.texto;
    console.log([titulo, texto]);
    //var query = 'insert into comentarios (titulo, texto) values (' + titulo + ',' + texto + ')';
    //console.log(query);
    connection.query("insert into comentarios values ?", [titulo, texto], function (error, results, fields) {
      if (error) {
        return error;
      } else {
        console.log(results);
        console.log(fields);
      }
    });
});


router.get('/comentarios', function(req, res, next){
    var query = 'select * from comentarios';
    var data = [];
    //console.log(query);
    connection.query(query, function (error, results, fields) {
      if (error) {
        return error;
      } else {

        for (var i = 0; i < results.length; i++) {
          //console.log(results[i].titulo);
          data.push({titulo: results[i].titulo, texto: results[i].texto});
        }
        res.json(data);
      }
    });
});

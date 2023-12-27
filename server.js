var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

let router_productos = require('./router/productos.js');

var http = require('http').Server(app);
var io = require('socket.io')(http, { cors: { origin: '*' } });


const PORT = process.env.PORT || 6500;

const cors = require('cors');
app.use(cors({
    origin: '*' //orign: ["www.app1.com","www.app2.com"]
}));

app.use(bodyParser.json());

app.use(express.static('build'));

var path = __dirname + '/'

//manejador de rutas
router.use(function (req,res,next) {
    next();
});

app.get("/",function(req,res){
    res.sendFile(path + 'index.html');
}); 

app.get("/login",function(req,res){
  res.redirect('/');
}); 

app.get("/test_service",function(req,res){
  res.send('ONLINE')
}); 



app.use('/productos', router_productos);

app.use("/",router);

app.use("*",function(req,res){
  res.redirect('/');
  //res.send('<h1 class="text-danger">NO DISPONIBLE</h1>');
});




// SOCKET HANDLER
io.on('connection', function(socket){
  
  socket.on('avisos', (tipo,mensaje)=>{
    io.emit('avisos', tipo, mensaje);
  });

  socket.on('noticias nueva', (msg,usuario)=>{
    io.emit('noticias nueva', msg,usuario);
  });

  socket.on('productos precio', function(msg,usuario){
	  io.emit('productos precio', msg, usuario);
  });

  socket.on('productos bloqueado', function(msg,usuario){
	  io.emit('productos bloqueado', msg, usuario);
  });

  socket.on('ventas nueva', (msg,usuario)=>{
    io.emit('ventas nueva', msg,usuario);
  })

  // sucede cuando el repartidor marca un pedido y notifica a su respectivo vendedor
  socket.on('reparto pedidomarcado', (msg,status,vendedor)=>{
    io.emit('reparto pedidomarcado', msg,status,vendedor);
  })

  
});


http.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});


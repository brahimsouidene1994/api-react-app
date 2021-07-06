const cart = require('./controller/cart');
const customer = require('./controller/client');
const ligne_cart = require('./controller/ligne_cart');
const phone = require('./controller/phone');


const client = require('./db_connection');
var express = require('express');
var app = express();
const cors = require('cors');
app.use(cors());
app.use(express.urlencoded({extended: true}));  
  app.use(express.json());
//app.use(require('body-parser').json());

client.connect(function(err){
    if(err){
        console.log(err.message);
    }else{
        console.log('connected');
    }
});

app.get('/phone-list', phone.getAllPhones);
app.get('/phone/:id', phone.getOnePhone);
app.post('/phone/add', phone.addPhone);
app.delete('/phone/delete/:id', phone.deletePhone);

app.get('/cart-list', cart.getAllCart);
app.get('/cart/client-id/:id', cart.getMyCart);
app.post('/cart/add', cart.addCart);
app.delete('/cart/delete/:id', cart.deleteCart);

app.get('/ligne_cart-list', ligne_cart.getAllLigneCart);
app.get('/ligne_cart/:id',ligne_cart.getLigne_Cart);
app.post('/ligne_cart/add', ligne_cart.addLigne_Cart);
app.delete('/ligne_cart/delete/:id', ligne_cart.deleteLigne_Cart);


app.listen(3010,(err)=>{
    if(err)
        console.log("not connected");
    else
    console.log("Server listen on " , 3010);
})
const express = require('express');
const app = express();
const router = express.Router()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const userAction = require('./useraction');
const cors = require('cors');
const bid = require('./routes/api/bid')

const port = 8080
mongoose.connect(config.path);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/bid/',bid)

app.post('/registration',(req,res)=>userAction.registration(req,res));
app.post('/login',(req,res)=>userAction.login(req,res));
app.post('/addProduct',(req,res)=> {console.log(req.body); userAction.product(req,res)});
app.get('/edit/:id',(req,res)=>userAction.edit(req,res));
app.post('/updateProfile/:id',(req,res)=>userAction.updateProfile(req,res));
app.post('/home',(req,res)=>userAction.displayProduct(req,res));
app.get('/detail/:id',(req,res)=>userAction.detail(req,res));
app.get('/user/:id',(req,res)=>userAction.user(req,res));
app.post('/cart',(req,res)=>userAction.cart(req,res));
app.post('/getCart/:id',(req,res)=>userAction.getCart(req,res));
app.get('/deleteCart/:id',(req,res)=>userAction.deleteCart(req,res));
app.post('/payment',(req,res)=>userAction.payment(req,res));
app.post('/getOrder/:id',(req,res)=>userAction.getOrder(req,res));
app.get('/cancelOrder/:id',(req,res)=>userAction.cancelOrder(req,res));
app.post('/getUsers',(req,res)=>userAction.getUsers(req,res));
app.post('/getProducts',(req,res)=>userAction.getProducts(req,res));
app.post('/getOrders',(req,res)=>userAction.getOrders(req,res));

app.listen(port,console.log("Server Running on",port));
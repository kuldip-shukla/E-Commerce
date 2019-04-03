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
app.get('/getCart/:id',(req,res)=>userAction.getCart(req,res));

app.listen(port,console.log("Server Running on",port));
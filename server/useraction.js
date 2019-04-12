const model = require('./model');
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'skbusinesspvtltd@gmail.com',
      pass: 'skbusiness1234'
    }
});

module.exports = {
    'registration': function(req,res){
        var mailOptions = {
            from: 'skbusinesspvtltd@gmail.com',
            to: req.body.email,
            subject: 'Email Verification',
            html: `
                Hello <b>${req.body.name}</b>,<br>
                <div>Please Verify Your Email by clicking on below button<br>
                <a href="http://192.168.0.138:4200/login" style="padding: 8px 12px; border: 1px solid green;border-radius: 8px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;background-color: green;text-decoration: none;font-weight:bold;display: inline-block;">Verify Your Email</a><br>
                Thank You</div>`
          };
        transporter.sendMail(mailOptions,async function(error, info){
            if (error) {
                console.log(error);
            } else {
                req.body.password = await bcrypt.hash(req.body.password, 10);
                var Model = new model.registration(req.body)
                Model.save((err) => {
                    if(err){ console.log(err); return res.json({code:400, message:"Try again for Registration"})}
                    else return res.redirect("http://192.168.0.138:4200/login");
                })
            }
        });
    },
    'login': async function(req,res){
        var login = mongoose.model('registration');
        var param = await login.findOne({email:req.body.email}).exec();
        let isPasswordMatch = await bcrypt.compare(req.body.password, param.password);
        if(isPasswordMatch){
            return res.json(param)
        }else return res.status(400).send({message:"Invalid Username or Password"}) 
    },
    "edit": function(req,res){
        var Model = mongoose.model("registration")
        let id = req.params.id;
        Model.findById({_id : id},function (err, data){
            if(err) res.json(err);
            else res.json(data);
        });
    },
    "updateProfile":async function(req,res){
        var Model = mongoose.model("registration")
        let id = req.params.id;
        var update = {$set:{name:req.body.name,email:req.body.email,phone:req.body.phone,address:{street:req.body.street,city:req.body.city,state:req.body.state,pincode:req.body.pincode}}}
        var param = await Model.findByIdAndUpdate({_id : id},update)
        if(param){return res.json({code:201, message:"Data Updated Successfully"})}
        else  return res.json({code:400, message:"Data Updation Failed"})
    },
    'product': function(req,res){
        var Model = new model.product(req.body)
        Model.save((err) => {
            if(err){ console.log(err); return res.json({code:400, message:"Error in Adding Product"})}
            else return res.json({code:201, message:"Add Product Successfully"})
        })
    },
    "displayProduct":async function(req,res){
        var Model = mongoose.model("product")
        Model.find({}, function(err,result){
            if(err){return res.json({code:400, message:"Data Display Error"})}
            else return res.json(result)
        })
    },
    "detail": function(req,res){
        var Model = mongoose.model("product")
        Model.findById({_id : req.params.id},function (err, result){
            if(err) res.json(err);
            else res.json(result);
        });
    },
    "user": function(req,res){
        var Model = mongoose.model("registration")
        Model.findById({_id : req.params.id},function (err, result){
            if(err) res.json(err);
            else res.json(result);
        });
    },
    'cart': async function(req,res){
        var Model = new model.cart(req.body)
        Model.save((err,data) => {
            if(err){ console.log(err); return res.json({code:400, message:"Try again for Cart"})}
            else return res.json({code:201, message:"Cart Successfully"})
        })
    },
    "getCart": async function(req,res){
        var Model = mongoose.model("cart")
        let id = req.params.id;
        await Model.find({user_id : id}).populate("product_id").exec(function (err, data){
            if(err) res.json(err);
            else res.json(data);
        });
    },
    "deleteCart": function(req,res){
        var Model = mongoose.model("cart")
        Model.findByIdAndRemove({_id : req.params.id},function (err, data){
            if(err) res.json(err);
            else res.json(data);
        });
    },
    "payment": function(req,res){
        var Model = new model.purchase(req.body)
        Model.save((err) => {
            if(err){ console.log(err); return res.json({code:400, message:"Try again for Payment"})}
            else return res.json({code:201, message:"Payment Successfully"})
        })
    },
    "getOrder": async function(req,res){
        var Model = mongoose.model("purchase")
        let id = req.params.id;
        await Model.find({user_id : id}).populate("product_id").exec(function (err, data){
            if(err) res.json(err);
            else res.json(data);
        });
    },
    "cancelOrder": function(req,res){
        var Model = mongoose.model("purchase")
        Model.findByIdAndRemove({_id : req.params.id},function (err, data){
            if(err) res.json(err);
            else res.json(data);
        });
    },
    "getUsers":async function(req,res){
        var Model = mongoose.model("registration")
        Model.find({}, function(err,result){
            if(err){return res.json({code:400, message:"Data Display Error"})}
            else return res.json(result)
        })
    },
    "getProducts":async function(req,res){
        var Model = mongoose.model("product")
        Model.find({}, function(err,result){
            if(err){return res.json({code:400, message:"Data Display Error"})}
            else return res.json(result)
        })
    },
    "getOrders":async function(req,res){
        var Model = mongoose.model("purchase")
        Model.find({}).populate("product_id").exec(function(err,result){
            if(err){return res.json({code:400, message:"Data Display Error"})}
            else return res.json(result)
        })
    },
    "updateStatus":async function(req,res){
        var Model = mongoose.model("purchase")
        let id = req.params.id;
        var update = {$set:{status:req.body.status}}
        var param = await Model.findByIdAndUpdate({_id : id},update)
        if(param){return res.json({code:201, message:"Data Updated Successfully"})}
        else  return res.json({code:400, message:"Data Updation Failed"})
    },
}
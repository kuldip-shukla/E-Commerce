const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Insta = require('instamojo-nodejs');
const paypal = require('paypal-rest-sdk')
const url = require('url');
const model = require('../../model').purchase;

router.post('/instamojo',(req,res)=>{
    Insta.setKeys('test_c2da64e889852eb0d3906b71b10', 'test_b09c849fac96c8bc6c7d871fc78');

    const data = new Insta.PaymentData();
    Insta.isSandboxMode(true);

    data.purpose = req.body.purpose,
    data.amount = req.body.amount,
    data.buyer_name = req.body.buyer_name,
    data.redirect_url = req.body.redirect_url,
    data.email = req.body.email,
    data.phone = req.body.phone,
    data.send_email = false,
    data.webhook_url = 'http://www.example.com/webhook/',
    data.send_sms = false,
    data.allow_repeated_payments = false

    Insta.createPayment(data, function(error, response) {
        if (error) {
          console.log("Error Instamojo",error);
        } else {
          const responseData = JSON.parse(response);
          const redirectUrl = responseData.payment_request.longurl;
          res.status(200).json(redirectUrl);
        }
    });
});



router.post('/paypal',(req,res)=>{
  paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AT8zBRdyNFvIr7-MImWoRqQnQNi5knLXa5Gn6ud9Rkouk6Z_mHheqPHF8mU-O6hzAWkDH-pv7yDF6BS6',
    'client_secret': 'EM0e_APtkJ5eZB--H7fNi6u47n0P_lSk4nbvwAJHo3ujVx9u7rUDmH0u2sAh0erscsVt9bg-_u8vwuy_'
  });

  var data = {
    intent: req.body.intent,
    payer: req.body.payer,
    redirect_urls: req.body.redirect_urls,
    transactions: req.body.transactions
  };


  paypal.payment.create(data, function (error, payment) {
      if (error) {
          console.log("Error Paypal",error)
      } else {
          for(let i =0;i<payment.links.length;i++){
            if(payment.links[i].rel === 'approval_url'){
              let redirectUrl = payment.links[i].href
              res.status(200).json(redirectUrl)
            }
          }
      }
  });
})

router.get('/callback/',(req,res)=>{
  let url_parts = url.parse(req.url,true);
  let responseData = url_parts.query;
  if(responseData.payment_status == "Credit"){
    let url = "http://192.168.0.138:4200/success?payment_id=" + responseData.payment_id
    return res.redirect(url);
  }else{
    return res.redirect("http://192.168.0.138:4200/failed");
  }
})

router.post('/webhook/',(req,res)=>{
  let url_parts = url.parse(req.url,true);
  let responseData = url_parts.query;
  if(responseData.payment_status == "Credit"){
    let paymentId = payment_id
    // const purchase = {};
    // // purchase.user_id = userId;
    // purchase.payment_id = paymentId;
    let Model = new model(paymentId)

    Model.save((err) => {
      if(err){ console.log(err); return res.json({code:400, message:"Error in Adding Payment Data"})}
      else return res.json({code:200, message:"Payent Data Added Successfully"})
    })
  }
})

module.exports = router;
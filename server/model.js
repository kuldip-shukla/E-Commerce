const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registrationSchema = new Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    phone:{
        type:Number
    },
    address:{
        street:{
            type:String
        },
        city:{
            type:String
        },
        state:{
            type:String
        },
        pincode:{
            type:Number
        }
    },
    role:{
        type:String, 
        enum:['Seller','User']
    },
    createdAt:{
        type: Date, default: Date.now 
    }
},{
    versionKey: false
});

const productSchema = new Schema({
    productname:{
        type:String
    },
    price:{
        type:Number
    },
    image:{
        type:String
    },
    category:{
        type:String, 
        enum:['Laptop','Mobile']
    },
    feature:{
        type:String
    },
    features:[{
        type:String
    }]
},{
    versionKey: false
})

const purchaseSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId, ref: 'registration'
    },
    product_id:{
        type: Schema.Types.ObjectId, ref: 'product'
    },
    payment_id:{
        type: String
    },
    status:{
        type:String, 
        enum:['Awaiting Order','Order In Processing','Order Dispatched','Order Delivered','Order Returned'],
        default: 'Awaiting Order'
    }
},{
    versionKey: false
})

const cartSchema = new Schema({
    product_id:{ 
        type: Schema.Types.ObjectId, ref: 'product' 
    },
    user_id:{ 
        type: Schema.Types.ObjectId, ref: 'registration' 
    },
    qty:{
        type:Number,
        default: 1
    }
},{
    versionKey: false
})

module.exports = {
    'registration':mongoose.model('registration',registrationSchema),
    'product':mongoose.model('product',productSchema),
    'purchase':mongoose.model('purchase',purchaseSchema),
    'cart':mongoose.model('cart',cartSchema)
}
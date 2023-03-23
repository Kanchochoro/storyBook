const mongoose=require("mongoose");


const roleSchema=new mongoose.Schema({
    role:{
        type:String,
        validate: [{
            validator: function(val) {
            return val.length > 0;
            },
            msg: 'Role must have more than or equal to one elements',
            errorCode: 25
        }
        ]
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});


module.exports=new mongoose.model("Role",roleSchema);
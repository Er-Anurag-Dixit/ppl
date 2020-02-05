var mongoose=require('mongoose')

var myschema=mongoose.Schema({

    cID:{type:String},
    comment:{type:String},
    user:{type:String}
})

module.exports=mongoose.model("commentdatas",myschema)
var mongoose=require('mongoose')

var myschema=mongoose.Schema({
    category:{type: String}
})

module.exports=mongoose.model("categories",myschema)
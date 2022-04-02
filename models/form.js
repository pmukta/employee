//Requiring mongoose package
var mongoose=require("mongoose");
  
// Schema
var formSchema=new mongoose.Schema({
    empname : String,
    empid    : Number
});
  
module.exports=mongoose.model("Form",formSchema);
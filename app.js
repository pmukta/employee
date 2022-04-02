const express = require("express")
const app=express();
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
  
// Calling form.js from models
var Form=require("./models/form");
  
// Connecting to database
mongoose.connect("mongodb://localhost/form",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
  
//middlewares
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));


app.get("/delete",function(req,res){
    Form.find(function (err, response) {
        if (err) {
            console.log(err)
        }
        // Pass the DB result to the template
        res.render('delete', { dropdownVals: response })
    });
})
app.get('/delresult',(req,res)=>{
    res.render('delresult');
});
app.post('/delete', function(req, res) {
    var empid=req.body.empid;
    var id = parseInt(empid);

    console.log(id);
    Form.remove({empid: id}, function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/delresult");
        }
    
    });
});

app.get("/index", (req,res) => {
    Form.find(function(err, data){
        if(err){
            console.log(err);
        }
        else{
           // res.send(data);
            res.render("index.ejs", { data })
        }
    });
});
  

//rendering form.ejs
app.get("/new",function(req,res){
    res.render("form");
});
// form submission
app.get('/result',(req,res)=>{
    res.render('result');
});
  
//creating form
app.post("/new",function(req,res){
    var empname=req.body.empname;
    var id=req.body.empid;
    var empid=parseInt(id);
    var f={empname: empname,empid:empid};
    Form.create(f,function(err,newlyCreatedForm){
        if(err)
        {
            console.log(err);
        }else{
            res.redirect("/result");
        }
    });
});

app.get("/update",function(req,res){
    Form.find(function (err, response) {
        if (err) {
            console.log(err)
        }
        // Pass the DB result to the template
        res.render('update', { dropdownVals: response })
    });
})
app.get('/updateresult',(req,res)=>{
    res.render('updateresult');
});
app.post('/updateDetails', (req,res)=>{
    var empid=req.body.empid;
    var id = parseInt(empid);
    Form.find(function(err, response){
        if(err){
            console.log(err)
        }
        res.render('updateDetails', { empid : id })
    })
    
})
app.post('/update', function(req, res) {
    var empid=req.body.empid;
    var id = parseInt(empid);
    var name = req.body.empname;
    Form.updateOne({empid : id}, 
        {empname: name}, function(err, data) {
            if(err){
                console.log(err);
            }
            else{
                res.render('updateResult')  
        }
    
    });
});
// Starting the server at port 3000
app.listen(3000, function() { 
    console.log('Server running on port 3000'); 
});
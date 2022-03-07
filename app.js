const favicon = require('serve-favicon');
const express = require("express");
const bodyparser = require("body-parser");
const date=require(__dirname+"/date.js");
var path = require('path')
const app = express();

const items = ["Watch Game of Thrones", "Buy Groceries","Complete the Assignment"];
let workitems=[];
app.use(favicon(path.join(__dirname,'favicon.ico')));

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extented: true}));
app.use(express.static("public"));
app.get("/", function (req, res) {
 const day =date.getdate();
    res.render("list", {
        listtitle: day,
        newlistitems: items
    });

});

app.post("/", function (req, res) {
    let item = req.body.newitem;
    if(req.body.list==="Work List"){
        workitems.push(item);
        res.redirect("/work");
    }
    else{
    items.push(item);
    res.redirect("/");

    }
});
app.get("/work",function(req,res){
    res.render("list",{listtitle:"Work List",newlistitems: workitems});
});
app.get("/about",function(req,res){
res.render("about");
});

app.listen(process.env.PORT||3000, function () {
    console.log("server running at 3000");
});
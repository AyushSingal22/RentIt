
const express = require('express');
const res = require('express/lib/response');
const app = express();
const path = require('path');
app.use(express.urlencoded({ extended: true }))
// To parse incoming JSON in POST request body:
app.use(express.json())
const mysql = require('mysql');
let connection  = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '980123',
    database: 'mydb'
});  
var ftypes;
var numberofFuels;
connection.connect(async function(err) {
    if (err) throw err;
    console.log("Connected!");
    await connection.query(Q.engineType, function (err, result, fields) {
      if (err) throw err;
      //console.log("Result: " + result);
      ftypes = result; 

    }); 
    await connection.query(Q.availableBiketypes, function (err, result, fields) {
        if (err) throw err;
        numberofFuels = result; 
        console.log(numberofFuels);
      });
  }); 
  
  
app.use(express.static(path.join(__dirname,'content')));
const port = process.env.PORT;
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views') )

const {Q} = require('./query.js');
const req = require('express/lib/request');

app.get('/',(req,res)=>{
    res.render('home.ejs');
})
app.post("/landing", (req , res)=>{
    const {fueltype} = req.body;
    
    res.redirect('/page2');
})
app.post("/page2" , (req,res)=>{
    const {fueltype} = req.body;
    res.render('page2.ejs', {fueltype});
})
app.get('/landing',(req,res)=>{
    
      res.render('landing.ejs' , {ftypes , numberofFuels});
})
app.get('/about',(req,res)=>{
    res.send("under  construction");
})

app.listen(port || 3000,()=>{
    console.log("connected");
})
  
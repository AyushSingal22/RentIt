var {Q} = require('./query.js');
var {imgs} = require('./images.js');

const express = require('express');
const res = require('express/lib/response');
const app = express();
const path = require('path');
app.use(express.urlencoded({ extended: true }))
// To parse incoming JSON in POST request body:
app.use(express.json())
const mysql = require('mysql');
var ftypes 
//sqlCall(Q.engineType ,ftypes);
var numberofFuels; 
//sqlCall(Q.availableBiketypes , numberofFuels);
 let connection  = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '980123',
    database: 'mydb'
});  

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
        //console.log(numberofFuels);
      });
  });  
  
  
app.use(express.static(path.join(__dirname,'content')));
const port = process.env.PORT; 
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views') )

 
const req = require('express/lib/request');

app.post('/page3',async(req,res)=>{ 
    
    const {idbike} = req.body;
    var data = await mySql(`select * from bike where idbike = ${idbike}` );
    var storeid = data[0].idstore;
    var datastore = await mySql(`select location from store where idstore = ${storeid}`);
    var price = await mySql(Q.getprice+ idbike);
    
    res.render('page3.ejs' , {data , datastore , price });
})
function rand(imgs){
    var num = Math.floor(Math.random() * (6 - 1)) + 1;
    return imgs[num];
}
app.get('/',(req,res)=>{
    res.render('home.ejs');
})
app.post("/landing", (req , res)=>{
    const {fueltype} = req.body;
    
    res.redirect('/page2');
}) 
app.post('/page5',(req,res)=>{
    const {idbike,pickupdate,dropdate,price,phonenumber,username} = req.body;
    
    res.render('page5.ejs');
})
app.post("/page4" , async(req,res)=>{
    var{dropdate,pickupdate,price,idbike} = req.body;
     
    console.log(idbike)
    var data = await mySql(`select * from bike where idbike = ${idbike}` );
    var storeid = data[0].idstore;
    var datastore = await mySql(`select location from store where idstore = ${storeid}`);
    if(dropdate<pickupdate) res.send("<div class=\"container\"> <h1>Wrong date input</h1> </div>");
    
    else res.render('page4.ejs',{price,dropdate,pickupdate,data,datastore});
})
app.post("/page2" ,async (req,res)=>{
    var {fueltype} = req.body;
    var storein;
    storein = await mySql(Q.allbikes+` where enginetype = \"${fueltype}\" `);
    if(fueltype=="*"){
        storein= await mySql(Q.allbikes);
        fueltype ="All";
    }
    //console.log(rand(imgs));
    res.render('page2.ejs',{fueltype,storein,imgs , rand});
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
  

async function mySql(Q){
    const conn = await connect();
    const [rows] = await conn.query(Q);
    //console.log(rows);
    return rows;
  }
  
  async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:980123@localhost:3306/mydb");
    console.log("Connected to MySQL!");
    global.connection = connection;
    return connection;
  }
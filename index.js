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
    password: 'purunushi',
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
const { stat } = require('fs');

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
function random(){
    return Math.floor(Math.random() * (20 - 1)) + 1;
    
}
app.get('/',(req,res)=>{
    res.render('home.ejs');
})
app.post("/landing", (req , res)=>{
    const {fueltype} = req.body;
    
    res.redirect('/page2');
}) 
app.post('/checkout', async (req,res)=>{
    var {idcust,pickupdate,idcust,dropdate,idbike,price} = req.body;
    try{
    var bid = await mySql("select max(idbooking) as max from booking")

    }catch{}
    var idbook = parseInt(bid[0].max) +1;
    idbike = parseInt(idbike);
    price = parseInt(price); 
    idcust = parseInt(idcust);
   
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
    var booked = await mySql(`insert into booking values(${idbook} , ${idcust}, ${idbike},\"${dateTime}\",\"${pickupdate}\" , \"${dropdate}\" , ${price} , ${random()}) `);
     
    res.redirect('/landing');

}) 
 
app.post('/page5',async (req,res)=>{
    const {idbike,pickupdate,dropdate,price,makeit,phonenumber,username,address,age,email,dl,idcust} = req.body;
    if(makeit=="makeit"){
        var newuser = await mySql(`INSERT INTO customer VALUES(${idcust}, \"${username}\",${age}, \"${email}\", ${dl},${phonenumber}, \"${address}\")`)
    }
        var customer = await mySql(Q.checkuser+ ` name=\"${username}\"and phone = \"${phonenumber}\"`)
        if(customer[0] == null){
            var status = "Welcome new user";
            var maxid = await mySql(Q.getmaxidcutomer);
            var id = parseInt(maxid[0].maxid) +1; 
            console.log(id) 
            res.render('page5b.ejs',{status,email,phonenumber,username,id,idbike,pickupdate,dropdate,price})
        }
        else{
            var status = "Welcome back";
            res.render('page5.ejs' ,{status,customer,phonenumber,username,id,newuser,idbike,pickupdate,dropdate,price});  
        }
    
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
    var topbikes = await mySql(Q.topbikes);
    //console.log(rand(imgs));
    res.render('page2.ejs',{fueltype,storein,imgs , rand ,topbikes});
})
app.get('/landing',async (req,res)=>{
    var rating = await mySql(Q.getratings);
    var avg = await mySql(Q.avgrating);
      res.render('landing.ejs' , {ftypes , numberofFuels, rating , avg});
})
app.get('/about',(req,res)=>{
    res.send("under  construction");
})
app.get('/userbook', async (req,res)=>{

    res.render('login');
})
app.post('/loggedin' , async(req,res)=>{
    const {username , phonenumber  } = req.body;
    var customer = await mySql(`select * from customer where name= \"${username}\" and phone=   ${phonenumber}  `)
    var books = await mySql(`select * from booking where idcustomer = ${customer[0].idcustomer}`)
        res.render('userbookings',{customer, books})
})
app.get('/admin', async (req,res)=>{ 

    res.send("duvks");
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
    const connection = await mysql.createConnection("mysql://root:purunushi@localhost:3306/mydb");
    console.log("Connected to MySQL!");
    global.connection = connection;
    return connection;
  }
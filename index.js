const express = require('express');
const res = require('express/lib/response');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname,'content')));
const port = process.env.PORT;
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views') )


app.get('/',(req,res)=>{
    res.render('home.ejs');
})
app.get('/landing',(req,res)=>{
    
    res.render('landing.ejs');
})
app.get('/about',(req,res)=>{
    res.send("under  construction");
})

app.listen(port || 3000,()=>{
    console.log("connected");
})  
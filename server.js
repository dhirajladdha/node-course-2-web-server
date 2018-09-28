const express = require('express');
const hbs = require('hbs');
const fs=require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
   // var log = now, req.method, '\n', req.url;
   // var log = new Date().toString();
   console.log('Date:' + now,'\n', 'Method:' + req.method, '\n', 'Url:' +req.url);
  // console.log(log);
    fs.appendFile('server.log', now,(err)=>{
        if(err){
            console.log('unable to conenct to server.log')
        }
    });
    next();
});

// app.use((req,res,next) => {
//     res.render('maintenence.hbs')
// });

app.use(express.static(__dirname + '/Public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});
hbs.registerHelper('screamIT',(text)=>{
    return text.toUpperCase()
})
// app.get('/',(req,res) => {
//     //res.send('<h1>Hello Express</h1>');
//     res.send({
//     name:'Dhiraj',
//     likes:[
//         'cricket', 
//         'driving'
//     ]
// });
// });
app.get('/',(req,res) => {
    //res.send('<h1>Hello Express</h1>');
    res.render('home.hbs',{
    pageTitle:'Home Page',
    WelcomeMessage:'Welcome to my new Website',
   // currentYear:new Date().getFullYear()
});
});


app.get('/about', (req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page',
        // currentYear:new Date().getFullYear()
    });
});

app.get('/bad', (req,res)=>{
    res.send ({
        Error : 'errormessage',
});
});
app.listen(3000,()=> {
console.log('server is up on port 3000')
});
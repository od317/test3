const mysql=require("mysql");
const express=require("express");
const path=require("path");
const app=express();
const faker=require(`faker`);
const bodyp=require(`body-parser`);
app.use(bodyp.urlencoded({extended:true}));
app.set('view engine','ejs');

app.use(express.static(__dirname + "/public"));

const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"0935905716",
    database:"learn"
});



app.use('^/$',(req,res)=>{
    
     con.query("select count(*) as c from users;",(err,ress)=>{
     var cc=ress[0].c;
     res.render('home',{data:cc});
   });
}
);



app.post('/register',(req,res)=>{
    var person={
        email:req.body.email
    };
    con.query(`insert into users SET ?`,person,(err,resu,fil)=>{
       if(err)
       throw err;
        res.redirect('/');
    });
})
app.use('/log',(req,res)=>{
   res.send("<h1>loging</h1>")
}
);


app.listen(3000,()=>{
    console.log("server is running on port 3000");
})
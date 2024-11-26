const express = require("express");
const port = 3002;

const app = express();

app.set("view engine","ejs");
app.use(express.urlencoded());

let students =[
    {id: 1,name: "keval", mobile: "i phone"},
    {id: 2,name: "vatsal", mobile: "oppo"},
    {id: 3,name: "fenil", mobile: "i phone"},
];

app.get("/",(req,res)=>{
    res.render("index",{students});
});

app.post("/addData",(req,res)=>{
    req.body.id = students.length +1;
    students.push(req.body);
    res.redirect("/");
});

app.get("/deleteData",(req,res)=>{
    let deleteRecord =students.filter((item)=> item.id !=req.query.id);
    students=deleteRecord;
    res.redirect("/");
});

app.get("/editData/:id",(req,res)=>{
    let singleData =students.find((item)=> item.id == req.params.id);
    res.render("edit",{singleData});

});


app.post("/updateData",(req,res)=>{
    students.forEach((student)=>{
        if(student.id == req.body.id){
            (student.id = req.body.id),
            (student.name = req.body.name),
            (student.mobile = req.body.mobile);
        }
        else{
            student;
        }
    });
    res.redirect("/");
});

app.listen(port,(err)=>{
    err? console.log(err) : console.log("server started on port" +port);
});
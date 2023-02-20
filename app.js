const express = require('express');
//Qwerty222
const app = express();
const mongoose = require('mongoose');

async function run(){
    await mongoose.connect("mongodb+srv://Kmitron:Qwerty222@cluster0.134rxcq.mongodb.net/Articles?retryWrites=true&w=majority",(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Connected DB");
    }
});
}

run();

let sc = new mongoose.Schema({username:{type:String,required:true},
    heading:{type: String, required: true},
    article: {type: String, required: true},
    coverArt: {type: String, required: true}
  })

let authSchema = new mongoose.Schema({username:{type:String, required: true,unique: true},password:{type:String, required: true}});

let mod = new mongoose.model('Articles', sc);
let authMod = new mongoose.model('auths',authSchema);

app.use(express.json());

app.post('/register',(req,res)=>{
    var registration = new authMod({
        username: req.body.username,
        password: req.body.password
    })

    registration.save((err,data)=>{
        if(err){
            res.send("Could not register");
            console.log(err);
        }
        else{
            console.log("User registered!");
            res.send("Registered successfully");
        }
    })
})


app.post('/login', async (req,res)=>{
    // try{
    //     var username = "Vijay";
    //     var password = "Qwerty123";
    //     var data = mongoose.model('auths',authSchema);
    //     // var check = data.find({username});
    //     // if(!check){
    //     //     res.send("User not registered!");
    //     //     throw new Error('user not found')
    //     // }
    //     // else{
    //     //     res.send(check.json());
    //     //     console.log(check.json());
    //     //     }

    //     authMod.find({username}).then(data =>{
    //         console.log(data);
    //         res.send("Found!");
    //     })
    // }
    // catch(err){
    //     console.log(err);
    //     res.send('no user')
    // }

    var username = req.body.username;
    var password = req.body.password;

    // console.log(username);

    authMod.findOne({username})
    .then(data =>{
        console.log(data);
        if(data){
            if(data.password === password){
                res.status(200);
                res.send("Bruh");
                console.log("Logged in!")
            }
            else{
                res.status(201);
                res.send("Wrong password");
            }
        }
        else{
            res.status(202);
            res.send("User not found!");
        }
    })

})

app.post('/send', (req,res) => {
    var input = new mod({
        username: req.body.username,
        heading:req.body.heading,
        article: req.body.article,
        coverArt: req.body.coverArt,
    })

    input.save((err,data)=>{
        if(err){
            //{} console.log(err);
            // return res.status(201).json({error:"Error ochindi"})
            res.send("Error");
        }
        else{
            console.log("Data added");
            return res.send("Success!");
        }
    })
})

app.get('/getData',(req,res)=>{
    console.log("Called");

    let data = mongoose.model('Articles',sc);
    data.find((err,data)=>{
        if(err){
            console.log("Unable to fetch data");
        }
        else{
            // console.log(data);
            res.send(JSON.stringify(data));
        }
    })
})



app.listen(3002,()=>{
    console.log("Listening at 3002");
})




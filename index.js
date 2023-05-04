const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    let town = req.body.town;
    const apiId="7355004621882f3bd7938a0a689e67b8";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+town+"&appid="+apiId;
    https.get(url, (response)=>{
        if(response.statusCode>200){
            res.send("invalid city");
        }
        else{
            response.on('data', (data)=>{
                const weather = JSON.parse(data);
                const weatherIcon = weather.weather[0].icon;
                const weatherDescription = weather.weather[0].description;
                const temp = Math.round(weather.main.feels_like-273);
                const link = "http://openweathermap.org/img/wn/"+weatherIcon+"@2x.png";
                res.send("<img src='"+link+"' alt='photo'><br>feels like: "+temp+"<br>"+weatherDescription+"<br>");
            });
        }
    });
});
app.listen(3000, function(){
    console.log("server working on port 3000");
});
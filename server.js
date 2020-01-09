const express = require("express");
const serveStatic = require("serve-static");

const path = require("path");
const categoriesData = require('./data/categories.js')
const citiesData = require('./data/cities.js')
const itemsData = require('./data/items.js')


//create the express app
const app = express();

//create middleware to handle the serving of the app
app.use("/", serveStatic(path.join(__dirname, "/public")));

//api
//shows all the cities available
app.get('/api/cities', function(req, res){
  res.json(citiesData)
})
//shwos all the categories available
app.get('/api/:city', function(req, res){
  res.json(categoriesData)
})
//This is going to show all the items for that category
app.get('/api/:city/:category', function(req, res){
    let newData;
  if(req.query.min_price != undefined){
    newData = itemsData.filter((item)=>{
      return item.city == req.params.city && item.category == req.params.category
      && item.price >= req.query.min_price && item.price <= req.query.max_price && item.extraDetails.make == req.query.make && item.extraDetails.model == req.query.model
    })
    }else{
     newData = itemsData.filter((item)=>{
      return item.city == req.params.city && item.category == req.params.category
    })
    }


  res.json(newData)
})
//show all the items for that listing
app.get('/api/:city/:categories/:listing', function(req, res){
  res.json(itemsData)
})
//show the item that was selected
app.get('/api/:city/:categories/:listing/:item', function(req, res){
  res.json(itemsData)
})


app.get('*', function(req, res){
  res.sendFile(__dirname + '/public/index.html')
})
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

//create default port to serve the app
const port = process.env.PORT || 5000;

app.listen(port);

console.log("Server started on part " + port);

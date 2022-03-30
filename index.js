const express = require('express')
const mongoose = require("mongoose")

const app = express();

mongoose.connect('mongodb://localhost:27017/person')
.then(() => console.log("DB CONNECTED"))
.catch(err => console.log(err));

const Person = require("./models/Person")


Person.insertMany([{name:"Amine" ,age : 28 , favoriteFoods : ["fricassé" ,"mtabga" , "mlewi"]} ,
                {name:"Mary" , age : 24 ,favoriteFoods : ["rechta" , "broudou" , "chorba"]},
                {name:"Mary" , age : 24 ,favoriteFoods : ["rechta" , "broudou" , "chorba","burritos"]},
                   {name:"Bassem", age:23, favoriteFoods: ["lablebi" , "spaghetti", "fruit de mer"]} ,
                    {name:"Omar" , age : 22 ,favoriteFoods : ["couscous" , "jelbena" , "me7chi"]} ,
                    {name:"Lmok" , age : 24 ,favoriteFoods : ["rechta" , "broudou" , "chorba"]}])

const personList = async () =>  {
   const list =  await Person.find({})
} 
//console.log(personList());

// find one by favorite food 
Person.findOne({favoriteFoods:'rechta'} , (err,data)=>{
    if(err) throw err 
   // console.log(data)
})



// find person by ID 
let id = "61f800cc52e5a20d842db7a6"
Person.findById({_id : id} , (err , data)=>{
  if(err) throw err  
  //console.log(data)
})

//find and update
let id2 = "61fa504f52e3c303ef7a1366"
Person.findOneAndUpdate({_id : id2} ,{$push: {favoriteFoods:  "hamburger"}},(err,data)=> {  
    if (err) throw err

   //console.log(data);
})
// find one and delete
let id3 ="61fa50b8d422c45fd80b0d9c"
Person.findByIdAndRemove({_id:id3},(err)=>{
    if (err) throw err
   // console.log('Deleted successfully');
}) 
//check if delete 
Person.findById({_id : id3} , (err , data)=>{
  if(err) throw err  
 // console.log(data)
})

// delete many
Person.deleteMany({name:'Mary'} ,(err)=>{
    if(err) throw err
   // console.log('Mary is removed');
})

//Chain Search Query Helpers to Narrow Search Results
Person.find({favoriteFoods:'burritos'})
    .limit(2)
    .sort({firstName: 1})
    .select({age: true})
    .exect()
    .then(docs => {
        console.log(docs)
      })
     .catch(err => {
        console.error(err)
      })

app.listen(5000 , (err)=>{
    if (err) {
        console.log('errooor')
    }
    console.log(`Server is runnig 5000`)
})


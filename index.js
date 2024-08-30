const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

dotenv.config()
const app = express()

//MIDDLE WARE
app.use(express.json()) //express body passer

const PORT = process.env.PORT || 6000

//connect to mongoDb
mongoose.connect(`${process.env.MONGODBLINK}`)
.then(() => console.log("MongoDB server connected..."))


app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})

//get request (frontend requesting data)
app.get("/", (request, response) => {
    response.json("Welcome to backend environment")
})

//Post request ( frontend sending you data)
app.post("/students", (request, response) => {
    const {name, email} = request.body
    response.json(email)
    //console.log(request.body)
})

//Put request
app.put("/data", (request, response) => {
    const {name, gender, age} = request.body
    if(!age) {
       return response.json({message: "You must insert your age"})
    }
    return response.json({message: "Registration successful", name})
})

//post request
app.post("/register", (request, response) => {
    const {name, email, phone, state, localGovt} = request.body

    if(!name) {
        return response.status(400).json({message: "You must insert your name"})
     }
    
    if(!email) {
        return response.status(400).json({message: "You must insert your email"})
     }
    
     if(phone.length < 11) {
        return response.status(400).json({message: "enter valid phone number"})
     }

    if(!state) {
        return response.status(400).json({message: "You must insert your state"})
     }

    if(!localGovt) {
        return response.status(400).json({message: "You must insert your localGovt"})
     }

    const newRegistration = {name, email, phone, state, localGovt}

    return response.status(200).json({message: "Registration successful", newRegistration})

})

app.put("/add", (request, response) => {
    const {name, email, gender} = request.body
    if(!name){
        return response.status(400).json({message: "Most include name"})
    }
    const date = new Date()
    const id = "ID" + Math.ceil(Math.random()*100)
    const newReg = {
        name,
        email,
        gender,
        date,
        id
    }

    return response.status(200).json({message: "User added", newReg})
})

app.use((request, response) => {
    return response.status(400).json({message: "Bad request!"})
})
const express = require('express');
require('dotenv').config();
const cors = require('cors') //protección api (middleware)

const mongoose = require('mongoose');
const doctorProfileRoute = require('./routes/doctorProfile.route');
const app = express()



//middleware
app.use(express.json()); //recibir info hacia backend
app.use(cors()); //protección
app.use(express.urlencoded({extended: true})); //para enviar urlencoded (postman)



app.get('/', (req, res) => {
    res.send("Hello from Doctor Profile - Findr API")
});


//Get ALL
app.use('/api/doctors', doctorProfileRoute)

//Get one by ID
app.get('/api/doctors/:id', doctorProfileRoute)

//Create
app.post('/api/doctors', doctorProfileRoute);

//Update 
app.put('/api/doctors/:id', doctorProfileRoute)

//DELETE
app.delete('/api/doctors/:id',doctorProfileRoute)




//DB connection
mongoose.connect("mongodb+srv://admin:F8dxBhiBFzH458sR@findrdb.1gxc4.mongodb.net/Findr-API?retryWrites=true&w=majority&appName=FindrDB")
    .then(() => {
        app.listen( process.env.PORT, () => {
            console.log("Connected to Database", process.env.PORT || 8080)
        });
        /* app.listen(port, () => {
            console.log(`Server is running on ${port}`)
        }); */
    })
    .catch(() => { console.log("Connection failed") });
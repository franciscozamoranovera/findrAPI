const express = require('express');
require('dotenv').config();
const cors = require('cors') //protección api (middleware)
const mongoose = require('mongoose');
const doctorProfileRoute = require('./routes/doctorProfile.route');


const app = express()
const uri = process.env.MONGODB_URI;
const PORT = process.env.PORT || 8080;



//middleware
//app.use(cors()); //protección

app.use(cors({
    origin: '*', // Allow all origins for debugging
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow all necessary methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow common headers
    credentials: false // No cookies or credentials for now
}));

app.use(express.json()); //recibir info hacia backend
app.use(express.urlencoded({extended: true})); //para enviar urlencoded (postman)


app.get('/', (req, res) => {
    res.send("Hello from Doctor Profile - Findr API")
});


//Get ALL
app.use('/api/doctors', doctorProfileRoute)

//Get one by ID
//app.get('/api/doctors/:id', doctorProfileRoute)

//Create
//app.post('/api/doctors', doctorProfileRoute);

//Update 
//app.put('/api/doctors/:id', doctorProfileRoute)

//DELETE
//app.delete('/api/doctors/:id',doctorProfileRoute)




//DB connection
mongoose.connect(uri)

    .then(() => {

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on port ${PORT}`);
            console.log('Connected to MongoDB');
        });

        
        /* app.listen( process.env.PORT, () => {
            console.log("Connected to MONGODB", process.env.PORT || 8080)
            
        }); */
        
    })
    .catch(() => { 
        console.log("Connection failed")
        process.exit(1)

    });


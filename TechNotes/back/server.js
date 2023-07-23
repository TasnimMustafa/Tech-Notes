const auth = require("./middleware/auth-Middleware");
const isAdmin = require("./middleware/isAdmin-Middleware");
const jwt = require("jsonwebtoken")

require("dotenv").config();
const express = require("express");
const app = express();
const  {logger} = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const connDB= require('./config/dbconn')
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
const cors = require("cors");
const { corsOptions } = require('./config/corsOptions');
const path = require("path");
const port = process.env.PORT || 5000;

const router = require("./routes/root")
const notesRoutes = require("./routes/notes")
const usersRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")

connDB()
app.use(logger)
// app.use(cors(corsOptions));
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/',router)
app.use("/note",notesRoutes)
app.use("/user",usersRoutes)
app.use("/auth",authRoutes)


///////////////////////////////////////////////////////////////////////////////
// const publicPath = path.join(__dirname,"public");
// app.use(express.static(publicPath));
// app.set('view engine','hbs')
// app.set('views',"./views")

// const hbs = require("hbs");
// const authMiddleware = require("./middleware/auth-Middleware");
// const partialsPath = path.join(__dirname,"views/partials")
// hbs.registerPartials(partialsPath)

// app.get('/login',(req,res)=>{
//     res.render('login')
// })

/////////////////////////////////////////////////////////////////////////////

// const currentDate = new Date();
// const dayOfWeek = currentDate.getDay();
// const date = currentDate.getDate();
// const month = currentDate.getMonth();
// const year = currentDate.getFullYear();
// const hours = currentDate.getHours();
// const minutes = currentDate.getMinutes();
// const seconds = currentDate.getSeconds();

// const daysOfWeekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// const dayName = daysOfWeekNames[dayOfWeek];

// const monthsNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// const monthName = monthsNames[month];

// app.get('/dash',(req,res)=>{
//     res.render('dash',{
//         title: "TechNotes",
//         Date: {dayName, monthName, date, year, hours , minutes ,seconds}
//     })
// })
//////////////////////////////////////////////////////////////////////////////////////////////////////////

app.all('*',(req,res)=>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,"views","404.html"))
    }
    else if(req.accepts('json')) {
        res.send({message: "404 page not found"})
    }
    else {
        res.type('text').send("404 page not found")
    }
})


app.use(errorHandler)
mongoose.connection.once('open',()=>{
    console.log("connected DB")
    app.listen(port,()=>{console.log(`Server Works!!! ${port}`)})
})

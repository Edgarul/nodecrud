'use strict'

const express = require('express');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const Router = require('./routes/routes.js');
const methodOverride = require('method-override');


const app = express();

//METHOD-OVERRIDE
app.use(methodOverride('_method'))

//BODYPARSER
app.use(express.urlencoded({extended:true}));
app.use(express.json())

//RECURSOS ESTATICOS
//Uso de static
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

//MOTOR DE VISTAS
app.engine('.hbs', hbs({
    defaultLayout: 'index',
    extname: '.hbs'
}))

app.set('view engine', '.hbs');




//EDGAR URIEL TAMAYO 
//CONEXION A LA BASE DE DATOS
require('dotenv').config({path: 'variables.env'});

mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex:true
}, (err,res)=>{
    if(err){
        return console.log(`No se conecto ${err}`);
    }

    console.log(`Se conecto a la base ${process.env.DB_URL}`)

})


//Router
app.use('/', Router);
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3500;
app.listen(port,host, (err, res)=>{
    if(err){
        console.log('Hubo un error');
    }
    console.log(`El servidor funciona en el puerto ${port} y el host ${host}`)
});
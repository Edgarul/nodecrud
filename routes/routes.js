/*jshint esversion: 6 */

//import module

const express = require('express');
const path = require('path');
const Product = require('../models/product.js')

//create a route object
const app = express.Router();

module.exports = app;


//ROUTES
app.get('/', (req, res)=>{
    Product.find({}, (err, productos)=>{
        if(err){
            return res.status(500).send({
                message: `No se pudo hacer la consulta ${err}`
            });
        }

        if(!productos){
            return res.status(400).send({
                message: `No se encontraron datos`
            });
        }
        res.render('home', {productos});
    }).lean();
});


//Insertar
app.get('/registrar', (req, res)=>{
    res.render('product')
});


//MOSTRAR DATOS Pagina HOME
app.get('/api/product/home', (req, res) =>{
    Product.find({}, (err, productos)=>{
        if(err){
            return res.status(500).send({
                message: `No se pudo hacer la consulta ${err}`
            });
        }

        if(!productos){
            return res.status(400).send({
                message: `No se encontraron datos`
            });
        }
        res.render('home', {productos});
    }).lean();
});


// INSERTAR VALORES EN LA BD
const postProduct = require('../controllers/posProduct.js')

app.post('/api/product', postProduct, (req, res)=>{
    app.render('product')
});


//POR FILTRO
app.get('/editar/:datoBusqueda', (req, res) =>{
    let datoBusqueda = req.params.datoBusqueda;
    Product.findById(datoBusqueda, (err, products)=>{
    //Product.find({name: datoBusqueda}, (err,products)=>{
        if(err){
            return res.status(500).send({
                message: `Error en la busqueda ${err}`
            });
        }

        if(!products){
            return res.status(404).send({
                message: 'El producto no existe'
            });
        }

        //res.status(200).send({Product: products})
        res.render('editar', {products})
    }).lean();;
})


//Modificar producto PUT
const putProduct = require('../controllers/putProduct.js');
app.put('/api/product/:id', putProduct)
//Edgar Uriel Tamayo Lopez

//Eliminar registro DELETE
const deleteProduct = require('../controllers/deleteProduct.js');
app.delete('/api/product/:id', deleteProduct);


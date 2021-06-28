const product = require("../models/product");

/*jshint esversion: 6 */

module.exports = (req, res)=>{
    let datoModificar = req.params.id;
    let update = req.body;

    product.findOneAndUpdate(datoModificar, update, (err, products)=>{
        if(err){
            return res.status(500).send({
                message: `Error al actualizar ${err}`
            });
        }

        if(!products){
            return res.status(404).send({
                message: 'El producto no existe'
            });
        }

        //res.status(200).send({Product: products})
        res.redirect('home')
    }).lean();
}
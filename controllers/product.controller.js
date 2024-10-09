const { json } = require('express');
const Product = require('../models/product.model');



// get list product

const getProducts = async (req, res) =>{

    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }

}

// get product by id

const getProduct = async (req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


// add a product

const addProduct = async(req, res) =>{
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }

}    

// delete a product

const deleteProduct = async (req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            res.status(404).json({message:"Product not found!"});
        }
        res.status(200).json({message:"deleted product successfully!"});

    } catch (error) {
        res.status(500).json({message: error.message});
    }

}


// update a product

const updateProduct = async (req, res)=>{
    try {

        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            res.status(404).json({message:"Product not found!"});
        }
        const productUpdate = await Product.findById(id);
        res.status(200).json(productUpdate);

    } catch (error) {
        res.status(500).json({message:error.message});
    }

}




module.exports = {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
};
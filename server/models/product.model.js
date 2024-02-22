//const mongoose = require('mongoose');
import mongoose from 'mongoose'
       const ProductSchema = new mongoose.Schema({
       name: {
         type: String,
         trim: true,
         required: 'Product name is required'
         },
            description: {
              type: String,
              trim: true,
              required: 'Product description is required'
            },
            price: {
              type: String,
              trim: true,
              required: 'Product price is required'
            },
            quantity: {
              type: Number,
              required: 'Product quantity is required'
            },
            category: {
              type: String,
              trim: true,
              required: 'Product category is required'
            
            } 
          })

          export default mongoose.model('Product',ProductSchema);






import Product from '../models/product.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'


const create = async (req, res) => { 
const product = new Product(req.body) 
try {
await product.save()
return res.status(200).json({ 
message: "Successfully created a new product!"
})
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}
const list = async (req, res) => {
    try {
      const keyword = req.query.name;
      console.log('Received keyword:', keyword); // Add this line
  
      // Construct a MongoDB query to find products with a name containing the keyword
      const query = keyword ? { name: { $regex: new RegExp(keyword, 'i') } } : {};
      console.log('Constructed query:', query); // Add this line
  
      // Use the query to find products
      let products = await Product.find(query);
  
      res.json(products);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  };
  
  


const productByID = async (req, res, next, id) => { 
try {
let product = await Product.findById(id) 

if (!product)
return res.status('400').json({ 
error: "Product not found"
})

req.result = product 
next()
} catch (err) {
return res.status('400').json({ 
error: "Could not retrieve product"
}) 
}
}


const read = (req, res, next) => {

return res.json(req.result) 
}


const update = async (req, res) => { 
    try {
      let product = req.result; // Use req.result from productByID middleware
      product = extend(product, req.body);
  
      await product.save();
  
      res.json(product);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err) 
      });
    } 
  }
  

  const remove = async (req, res) => { 
    try {
      const productId = req.params.productId; // Assuming the product ID is in the URL parameters
      const deletedProduct = await Product.findOneAndDelete({ _id: productId });
  
      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      res.json(deletedProduct);
    } catch (err) {
      return res.status(500).json({
        error: errorHandler.getErrorMessage(err)
      });
    } 
  }

  // In your product.controller.js file

const removeAll = async (req, res) => {
    try {
      await Product.deleteMany({}); // Delete all products
  
      res.json({ message: "All products deleted successfully" });
    } catch (err) {
      return res.status(500).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
  }
  

 
  
 export default { create, productByID, read, list, remove, update, removeAll }


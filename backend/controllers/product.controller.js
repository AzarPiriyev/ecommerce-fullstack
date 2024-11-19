import Product from '../models/product.model.js';


export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const createProduct = async (req, res) => {
  const { name, writer, price, description, category, rating, imageUrl, newArrival, topSelling } = req.body;

  const newProduct = new Product({
    name,
    writer,
    price,
    description,
    category,
    rating,
    imageUrl,
    newArrival,
    topSelling,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNewArrival = async (req, res) => {
    try {
      const products = await Product.find({newArrival:true});
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
  export const getTopSelling = async (req, res) => {
    try {
      const products = await Product.find({topSelling:true});
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
export const getProducts = async (req, res) => {
  const { writer, topSelling, newArrival, category, page = 1, limit = 10 } = req.query;

  const filter = {};

  
  if (category) filter.category = category;
  if (writer) filter.writer = writer;
  if (topSelling) filter.topSelling = true; 
  if (newArrival) filter.newArrival = true; 


  try {
    const options = {
      page: parseInt(page, 10), 
      limit: parseInt(limit, 10) 
    };

    
    const products = await Product.find(filter)
      .skip((options.page - 1) * options.limit) 
      .limit(options.limit); 

    const total = await Product.countDocuments(filter); 
    const totalPages = Math.ceil(total / options.limit); 

    res.status(200).json({
      totalPages,
      currentPage: options.page,
      products,
    });
  } catch (error) {
    console.error('Database query error:', error); 
    res.status(500).json({ message: error.message });
  }
};

import Product from '../models/product.model.js';

// Tüm ürünleri listeleme
export const getProducts = async (req, res) => {
  const { writer, price, category } = req.query;

  const filter = {};

  // Добавление фильтров
  if (category) filter.category = category;
  if (writer) filter.writer = writer;
  if (price) {
    const priceNum = Number(price);
    if (!isNaN(priceNum)) {
      filter.price = { $lte: priceNum }; // Пример: фильтр по цене меньше или равно
    }
  }

  try {
    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    console.error('Database query error:', error); // Логирование ошибки
    res.status(500).json({ message: error.message });
  }
};

// Tek bir ürünü getirme
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

// Yeni ürün ekleme
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

// Ürün güncelleme
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

// Ürün silme
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
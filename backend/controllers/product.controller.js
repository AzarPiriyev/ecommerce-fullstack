import Product from '../models/product.model.js';



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

  // Tüm ürünleri listeleme
export const getProducts = async (req, res) => {
  const { writer, topSelling, newArrival, category, page = 1, limit = 10 } = req.query;

  const filter = {};

  // Filtreler ekleniyor
  if (category) filter.category = category;
  if (writer) filter.writer = writer;
  if (topSelling) filter.topSelling = true; // добавьте это условие
  if (newArrival) filter.newArrival = true; // добавьте это условие


  try {
    const options = {
      page: parseInt(page, 10), // Sayfa numarasını sayıya çevir
      limit: parseInt(limit, 10) // Limit değerini sayıya çevir
    };

    // Sayfalama ile ürünleri al
    const products = await Product.find(filter)
      .skip((options.page - 1) * options.limit) // Hangi sayfada olduğuna göre atla
      .limit(options.limit); // Belirtilen limit kadar ürün getir

    const total = await Product.countDocuments(filter); // Filtrelenmiş toplam ürün sayısı
    const totalPages = Math.ceil(total / options.limit); // Toplam sayfa sayısını hesapla

    res.status(200).json({
      totalPages,
      currentPage: options.page,
      products,
    });
  } catch (error) {
    console.error('Database query error:', error); // Hata loglama
    res.status(500).json({ message: error.message });
  }
};

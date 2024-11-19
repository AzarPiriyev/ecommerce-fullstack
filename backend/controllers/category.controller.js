import Category from '../models/category.model.js';


export const createCategory = async (req, res) => {
  const { name, imageUrl } = req.body;

  if (!name || !imageUrl) {
    return res.status(400).json({ error: 'Name and imageUrl are required' });
  }
  
  try {
    const newCategory = new Category({ name, imageUrl });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error("Category creation error:", error);
    res.status(500).json({ error: 'Failed to create category' });
  }
};


export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};


export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error("Failed to fetch category:", error);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};


export const updateCategory = async (req, res) => {
  const { name, imageUrl } = req.body;

  if (!name || !imageUrl) {
    return res.status(400).json({ error: 'Name and imageUrl are required' });
  }
  
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, imageUrl },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Failed to update category:", error);
    res.status(500).json({ error: 'Failed to update category' });
  }
};


export const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error("Failed to delete category:", error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
};

// CategoriesTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../navigation';
import AddCategory from '../addCategory';
import EditCategory from '../editCategory';

const CategoriesTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:3000/api/categories/${categoryId}`);
      setCategories(categories.filter((category) => category._id !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleEditClick = (category) => {
    setEditingCategory(category);
    toggleEditModal();
  };

  const handleUpdateCategory = (updatedCategory) => {
    setCategories(
      categories.map((category) =>
        category._id === updatedCategory._id ? updatedCategory : category
      )
    );
  };

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <div className='bg-gray-900 text-white w-[250px] p-6'>
        <Navigation />
      </div>

      <div className="p-8 bg-gray-100 min-h-screen w-full">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Categories</h1>
          <button
            onClick={toggleModal}
            className="bg-green-500 text-white py-2 px-4 rounded-md mb-4 hover:bg-green-600 transition duration-300 shadow-md"
          >
            Add Category
          </button>
        </div>

        <div className="overflow-auto bg-white shadow-md rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4 text-gray-700 font-semibold">Name</th>
                <th className="p-4 text-gray-700 font-semibold">Image</th>
                <th className="p-4 text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id} className="border-t">
                  <td className="p-4 text-gray-800">{category.name}</td>
                  <td className="p-4">
                    <img
                      src={category.imageUrl}
                      alt="Category"
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditClick(category)}
                        className="bg-yellow-400 text-white py-1 px-3 rounded-md hover:bg-yellow-500 transition duration-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category._id)}
                        className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 transition duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <AddCategory toggleModal={toggleModal} onAdd={handleAddCategory} />
        )}

        {isEditModalOpen && editingCategory && (
          <EditCategory
            category={editingCategory}
            toggleEditModal={toggleEditModal}
            onUpdate={handleUpdateCategory}
          />
        )}
      </div>
    </div>
  );
};

export default CategoriesTable;

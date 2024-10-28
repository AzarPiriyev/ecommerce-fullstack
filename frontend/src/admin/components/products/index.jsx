import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../navigation';
import AddProducts from '../addProducts';
import EditProducts from '../editProducts';

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products from backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Handlers for Add Product modal
  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  // Handlers for Edit Product modal
  const handleOpenEditModal = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  // Update products after adding/editing
  const handleUpdateProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error updating products:', error);
    }
  };

  // Delete a product
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${productId}`);
      handleUpdateProducts(); // Update products list after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className='flex min-h-screen bg-gray-100'>
      {/* Navigation Sidebar */}
      <div className='bg-gray-900 text-white w-[250px] p-6'>
        <Navigation />
      </div>

      {/* Main Content Area */}
      <div className='w-full p-8'>
        {/* Page Header */}
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-3xl font-semibold text-gray-800'>Products</h2>
          <button
            onClick={handleOpenAddModal}
            className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 shadow-lg'>
            Add Product
          </button>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Product Name</th>
                <th className="py-3 px-6 text-left">Writer Name</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">Image</th>
                <th className="py-3 px-6 text-left">Rating</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {products.map((product) => (
                <tr key={product._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{product.name}</td>
                  <td className="py-3 px-6 text-left">{product.writer}</td>
                  <td className="py-3 px-6 text-left">${product.price}</td>
                  <td className="py-3 px-6 text-left">{product.category}</td>
                  <td className="py-3 px-6 text-left">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-md shadow-sm"
                    />
                  </td>
                  <td className="py-3 px-6 text-left">{product.rating}</td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenEditModal(product)}
                        className='bg-yellow-400 text-white py-1 px-3 rounded-md hover:bg-yellow-500 transition duration-300 shadow-md'>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className='bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 transition duration-300 shadow-md'>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AddProducts Modal */}
      {isAddModalOpen && <AddProducts onClose={handleCloseAddModal} onUpdate={handleUpdateProducts} />}

      {/* EditProducts Modal */}
      {isEditModalOpen && selectedProduct && (
        <EditProducts
          product={selectedProduct}
          onClose={handleCloseEditModal}
          onUpdate={handleUpdateProducts}
        />
      )}
    </div>
  );
};

export default ProductsAdmin;

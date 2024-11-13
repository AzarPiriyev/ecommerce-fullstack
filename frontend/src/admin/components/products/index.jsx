import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../navigation';
import AddProducts from '../addProducts';
import EditProducts from '../editProducts';

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  
  const fetchProducts = async (page = 1) => {
    try {
      const response = await axios.get('http://localhost:3000/api/products', {
        params: { page, limit: itemsPerPage },
      });
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
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
    fetchProducts(currentPage);
    fetchCategories(); 
  }, [currentPage]);

  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);

  const handleOpenEditModal = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  const handleUpdateProducts = async () => {
    await fetchProducts(currentPage);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${productId}`);
      handleUpdateProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : 'Unknown';
  };

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <div className='bg-gray-900 text-white w-[250px] p-6'>
        <Navigation />
      </div>

      <div className='w-full p-8'>
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-3xl font-semibold text-gray-800'>Products</h2>
          <button
            onClick={handleOpenAddModal}
            className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 shadow-lg'>
            Add Product
          </button>
        </div>

       
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
                  <td className="py-3 px-6 text-left">{getCategoryName(product.category)}</td> 
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

       
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50">
            Previous
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50">
            Next
          </button>
        </div>
      </div>

    
      {isAddModalOpen && <AddProducts onClose={handleCloseAddModal} onUpdate={handleUpdateProducts} />}

     
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

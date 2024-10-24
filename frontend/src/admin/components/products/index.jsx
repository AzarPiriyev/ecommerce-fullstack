import React, { useState } from 'react';
import Navigation from '../navigation';
import AddProducts from '../addProducts';
import EditProducts from '../editProducts'; // Import EditProducts component

const ProductsAdmin = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Add product modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Edit product modal

  // Handlers for Add Product modal
  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  // Handlers for Edit Product modal
  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
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
            onClick={handleOpenAddModal} // Open Add Product modal
            className='bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 shadow-lg'>
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
              {/* Sample Row */}
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">Product 1</td>
                <td className="py-3 px-6 text-left">Name</td>
                <td className="py-3 px-6 text-left">$100</td>
                <td className="py-3 px-6 text-left">Category 1</td>
                <td className="py-3 px-6 text-left">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Product 1"
                    className="w-12 h-12 object-cover rounded-md shadow-sm" />
                </td>
                <td className="py-3 px-6 text-left">4.5</td>
                <td className="py-3 px-6 text-left">
                  <div className="flex gap-2">
                    {/* Edit Button */}
                    <button
                      onClick={handleOpenEditModal} // Open Edit Product modal
                      className='bg-yellow-400 text-white py-1 px-3 rounded-md hover:bg-yellow-500 transition duration-300 shadow-md'>
                      Edit
                    </button>
                    <button className='bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 transition duration-300 shadow-md'>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              {/* More rows can be added similarly */}
            </tbody>
          </table>
        </div>
      </div>

      {/* AddProducts Modal */}
      {isAddModalOpen && <AddProducts onClose={handleCloseAddModal} />} {/* Show AddProducts modal */}

      {/* EditProducts Modal */}
      {isEditModalOpen && <EditProducts onClose={handleCloseEditModal} />} {/* Show EditProducts modal */}
    </div>
  );
};

export default ProductsAdmin;

// src/components/AddInformModal.js

import React, { useState } from 'react';
import axios from 'axios';

const AddInformModal = ({ isOpen, onClose, onInformAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    code: '', // This will hold the selected option
  });
  
  const [error, setError] = useState(null); // State for error handling

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before making request
    try {
      const response = await axios.post('http://localhost:3000/api/informs', formData);
      onInformAdded(response.data); // Callback to update the list of informs
      onClose(); // Close the modal after successful submission
    } catch (error) {
      setError('Error adding inform: ' + error.response?.data?.error || error.message);
      console.error('Error adding inform:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h3 className="text-2xl font-semibold mb-4">Add New Inform</h3>
        {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error message */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="content">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="code">
              Select Code Type
            </label>
            <select
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            >
              <option value="" disabled>Select an option</option>
              <option value="Privacy Policy">Privacy Policy</option>
              <option value="Customer Support">Customer Support</option>
              <option value="Delivery Details">Delivery Details</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInformModal;

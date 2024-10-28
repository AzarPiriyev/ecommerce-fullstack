// EditFAQ.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

const EditFAQ = ({ toggleModal, onEdit, faq }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Populate the fields with the current FAQ data
  useEffect(() => {
    if (faq) {
      setTitle(faq.title);
      setDescription(faq.description);
    }
  }, [faq]);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updatedFAQ = { title, description };

    try {
      // Send a PUT request to update the FAQ
      const response = await axios.put(`http://localhost:3000/api/faqs/${faq._id}`, updatedFAQ);
      console.log('Updated FAQ:', response.data);

      onEdit(response.data); // Call the callback to update the FAQ list
      toggleModal(); // Close the modal
    } catch (error) {
      console.error('Error updating FAQ:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h3 className="text-2xl font-semibold mb-4">Edit FAQ</h3>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={toggleModal}
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFAQ;
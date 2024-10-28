import React, { useState } from 'react';
import axios from 'axios'; // Axios'ı içe aktar

const AddFAQ = ({ toggleModal, onAdd }) => {
  const [title, setTitle] = useState(''); // Updated to use title instead of question
  const [description, setDescription] = useState(''); // Updated to use description instead of answer
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newFAQ = { title, description }; // Create the FAQ object with correct properties

    try {
      // Send a POST request to the backend
      const response = await axios.post('http://localhost:3000/api/faqs', newFAQ);
      
      console.log('Added FAQ:', response.data); // Log the response from the server

      onAdd(response.data); // Call the callback to update the FAQ list with the new data
      toggleModal(); // Close the modal
    } catch (error) {
      // Log detailed error messages
      if (error.response) {
        console.error('Error adding FAQ:', error.response.data); // Log the server response
      } else {
        console.error('Error adding FAQ:', error.message); // Log the error message
      }
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h3 className="text-2xl font-semibold mb-4">Add New FAQ</h3>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)} // Update title state
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
              onChange={(e) => setDescription(e.target.value)} // Update description state
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

export default AddFAQ;

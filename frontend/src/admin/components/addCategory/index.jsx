import React, { useState } from 'react';
import axios from 'axios';

const AddCategory = ({ toggleModal, onAdd }) => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));

    
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', 'qslbztwu'); 

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dfdds09gi/image/upload', 
        formData
      );
      setImageUrl(res.data.secure_url); 
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newCategory = { name, imageUrl };

    try {
      const response = await axios.post('http://localhost:3000/api/categories', newCategory);
      onAdd(response.data);
      toggleModal();
    } catch (error) {
      console.error('Error adding category:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h3 className="text-2xl font-semibold mb-4">Add New Category</h3>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
              Category Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="imageUrl">
              Upload Image
            </label>
            <input
              type="file"
              id="imageUrl"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          {preview && (
            <div className="mb-4">
              <img src={preview} alt="Selected Preview" className="w-full h-auto rounded-md" />
            </div>
          )}
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

export default AddCategory;

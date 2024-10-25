import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProducts = ({ product, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    writer: '',
    description: '',
    price: '',
    category: '',
    rating: 0,
    imageUrl: '',
    newArrival: false,
    topSelling: false,
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isCreating, setIsCreating] = useState(!product);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        writer: product.writer || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || '',
        rating: product.rating || 0,
        imageUrl: product.imageUrl || '',
        newArrival: product.newArrival || false,
        topSelling: product.topSelling || false,
      });
      setPreview(product.imageUrl || '');
      setIsCreating(false);
    } else {
      setIsCreating(true);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = formData.imageUrl;

      if (file) {
        const formDataImage = new FormData();
        formDataImage.append('file', file);
        formDataImage.append('upload_preset', 'qslbztwu');

        const uploadRes = await axios.post(
          'https://api.cloudinary.com/v1_1/dfdds09gi/image/upload',
          formDataImage
        );
        imageUrl = uploadRes.data.secure_url;
      }

      if (isCreating) {
        await axios.post('http://localhost:3000/api/products', {
          ...formData,
          imageUrl,
        });
      } else {
        await axios.put(`http://localhost:3000/api/products/${product._id}`, {
          ...formData,
          imageUrl,
        });
      }

      if (onUpdate) onUpdate();
      if (onClose) onClose();
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4 max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">{isCreating ? 'Add Product' : 'Edit Product'}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="border border-gray-300 p-3 mb-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="writer"
            value={formData.writer}
            onChange={handleChange}
            placeholder="Writer"
            className="border border-gray-300 p-3 mb-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="border border-gray-300 p-3 mb-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border border-gray-300 p-3 mb-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>Select Category</option>
            <option value="history">History</option>
            <option value="literature">Literature</option>
            <option value="economy">Economy</option>
            <option value="psychology">Psychology</option>
            <option value="children">Children's Books</option>
          </select>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="border border-gray-300 p-3 mb-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>Select Rating</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="border border-gray-300 p-3 h-24 resize-none mb-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="border border-gray-300 p-3 mb-4 rounded-lg w-full focus:outline-none"
          />
          {preview && <img src={preview} alt="Preview" className="mb-4 w-full h-40 object-cover rounded-lg" />}

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="newArrival"
              checked={formData.newArrival}
              onChange={handleChange}
              className="form-checkbox h-4 w-4 text-blue-500 transition duration-150 ease-in-out"
            />
            <label className="ml-2 text-gray-600">New Arrival</label>
          </div>
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              name="topSelling"
              checked={formData.topSelling}
              onChange={handleChange}
              className="form-checkbox h-4 w-4 text-blue-500 transition duration-150 ease-in-out"
            />
            <label className="ml-2 text-gray-600">Top Selling</label>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isCreating ? 'Add' : 'Edit'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition duration-200 ml-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  
  );
};

export default EditProducts;

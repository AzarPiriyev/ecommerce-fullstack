import React from 'react'

const EditProducts = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4 transition-transform transform scale-100">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">Edit Product</h2>
  
      {/* Input Fields */}
      <input
        type="text"
        placeholder="Product Name"
        className="border border-gray-300 p-3 mb-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        placeholder="Price"
        className="border border-gray-300 p-3 mb-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
  
      {/* Category Dropdown */}
      <select
        className="border border-gray-300 p-3 mb-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled selected>Select Category</option>
        <option value="history">History</option>
        <option value="literature">Literature</option>
        <option value="economy">Economy</option>
        <option value="psychology">Psychology</option>
        <option value="children">Children's Books</option>
      </select>
  
      {/* Rating Dropdown */}
      <select
        className="border border-gray-300 p-3 mb-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled selected>Select Rating</option>
        <option value="1">1 - Poor</option>
        <option value="2">2 - Fair</option>
        <option value="3">3 - Good</option>
        <option value="4">4 - Very Good</option>
        <option value="5">5 - Excellent</option>
      </select>
  
      <textarea
        type="text"
        placeholder="Description"
        className="border border-gray-300 p-3 h-24 resize-none mb-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
  
      {/* Image Upload */}
      <input
        type="file"
        className="border border-gray-300 p-3 mb-4 rounded-lg w-full focus:outline-none"
      />
  
      {/* Checkboxes */}
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          className="form-checkbox h-4 w-4 text-blue-500 transition duration-150 ease-in-out"
        />
        <label className="ml-2 text-gray-600">New Arrival</label>
      </div>
  
      <div className="mb-6 flex items-center">
        <input
          type="checkbox"
          className="form-checkbox h-4 w-4 text-blue-500 transition duration-150 ease-in-out"
        />
        <label className="ml-2 text-gray-600">Top Selling</label>
      </div>
  
      {/* Buttons */}
      <div className="flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Edit
        </button>
        <button
         onClick={onClose} className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition duration-200 ml-3 focus:outline-none focus:ring-2 focus:ring-gray-500">
          Close
        </button>
      </div>
    </div>
  </div>
  )
}

export default EditProducts
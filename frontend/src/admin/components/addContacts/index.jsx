import React, { useState } from 'react';
import axios from 'axios';

const AddContacts = ({ toggleModal, onUpdate }) => {
  const [phone, setPhone] = useState('');
  const [adress, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = (e) => {
    e.preventDefault(); // Formun sayfayı yenilemesini önle
    setIsLoading(true);
    const contactData = { phone, adress };

    // Axios ile POST isteği gönder
    axios.post('http://localhost:3000/api/contacts', contactData)
      .then(() => {
        onUpdate(); // Kontakları güncelle
        toggleModal(); // Modali kapat
      })
      .catch(error => console.error('Error saving contact:', error))
      .finally(() => setIsLoading(false)); // Yükleniyor durumunu kapat
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h3 className="text-2xl font-semibold mb-4">Add New Contact</h3>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={adress}
              onChange={(e) => setAddress(e.target.value)} // Input değeri değiştikçe durumu güncelle
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required // Zorunlu alan
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="phone">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)} // Input değeri değiştikçe durumu güncelle
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required // Zorunlu alan
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={toggleModal}
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              disabled={isLoading} // Yüklenirken butonu devre dışı bırak
            >
              {isLoading ? 'Saving...' : 'Save'} {/* Yüklenirken buton metnini değiştir */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContacts;

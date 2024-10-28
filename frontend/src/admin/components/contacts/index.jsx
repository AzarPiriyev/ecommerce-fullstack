import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navigation from '../navigation';
import AddContacts from '../addContacts';
import EditContact from '../editContacts'; // Yeni bileşeni içe aktar

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null); // Düzenlenecek kontaktı sakla
  
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) {
      setContactToEdit(null); // Modal kapandığında contact'ı sıfırla
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleEditClick = (contact) => {
    setContactToEdit(contact); // Düzenlemek için seçilen contact'ı ayarla
    toggleModal(); // Modali aç
  };

  // Silme fonksiyonu
  const handleDeleteClick = async (contactId) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await axios.delete(`http://localhost:3000/api/contacts/${contactId}`);
        fetchContacts(); // Kontakları güncelle
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <div className='bg-gray-900 text-white w-[250px] p-6'>
        <Navigation />
      </div>
      <div className='w-full p-8'>
        {/* Page Header */}
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-3xl font-semibold text-gray-800'>Contacts</h2>
          <button
            onClick={toggleModal}
            className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 shadow-md'>
            Add Contact
          </button>
        </div>

        {/* Contacts Table */}
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Address</th>
                <th className="py-3 px-6 text-left">Phone</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {contacts.map((contact) => (
                <tr key={contact._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{contact.adress}</td>
                  <td className="py-3 px-6 text-left">{contact.phone}</td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(contact)} // Düzenleme butonuna tıklayınca düzenleme fonksiyonunu çağır
                        className='bg-yellow-400 text-white py-1 px-3 rounded-md hover:bg-yellow-500 transition duration-300 shadow-md'>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(contact._id)} // Silme fonksiyonu
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

        {/* Add Contact Modal */}
        {isModalOpen && !contactToEdit && (
          <AddContacts toggleModal={toggleModal} onUpdate={fetchContacts} />
        )}

        {/* Edit Contact Modal */}
        {isModalOpen && contactToEdit && (
          <EditContact toggleModal={toggleModal} contact={contactToEdit} onUpdate={fetchContacts} />
        )}
      </div>
    </div>
  );
}

export default Contacts;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../navigation';
import AddFAQ from '../addFaq';
import EditFAQ from '../editFaq';

const FAQs = () => {
  const [openFAQId, setOpenFAQId] = useState(null);
  const [faqToEdit, setFaqToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [faqs, setFaqs] = useState([]);

  const handleAddFAQ = () => {
    setIsModalOpen(true);
  };

  const handleEditFAQ = (faq) => {
    setFaqToEdit(faq);
    setIsEditModalOpen(true);
  };

  const handleDeleteFAQ = async (faq) => {
    console.log('Delete FAQ clicked', faq);
    try {
      // Send a DELETE request to remove the FAQ
      await axios.delete(`http://localhost:3000/api/faqs/${faq._id}`);
      
      // Update the FAQ list by filtering out the deleted FAQ
      setFaqs((prev) => prev.filter((item) => item._id !== faq._id));
      
      console.log('FAQ deleted successfully');
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleAddFAQSubmit = (newFAQ) => {
    setFaqs((prev) => [...prev, newFAQ]);
    toggleModal();
  };

  const handleEditFAQSubmit = (updatedFAQ) => {
    setFaqs((prev) => prev.map((faq) => (faq._id === updatedFAQ._id ? updatedFAQ : faq)));
    toggleEditModal();
  };

  const toggleAnswer = (id) => {
    setOpenFAQId(openFAQId === id ? null : id);
  };

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/faqs');
        setFaqs(response.data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };

    fetchFAQs();
  }, []);

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <div className='bg-gray-900 text-white w-[250px] p-6'>
        <Navigation />
      </div>
      
      <div className='flex-grow p-8'>
        <div className='flex justify-between'>
        <h1 className='text-3xl font-bold text-gray-800 mb-6'>FAQ</h1>

        <button
          onClick={handleAddFAQ}
          className='bg-green-500 text-white py-2 px-4 rounded-md mb-4 hover:bg-green-600 transition duration-300 shadow-md'
        >
          Add FAQ
        </button></div>

        {isModalOpen && (
          <AddFAQ toggleModal={toggleModal} onAdd={handleAddFAQSubmit} />
        )}

        {isEditModalOpen && faqToEdit && (
          <EditFAQ toggleModal={toggleEditModal} onEdit={handleEditFAQSubmit} faq={faqToEdit} />
        )}

        {faqs.map((faq) => (
          <div key={faq._id} className="mb-4 border-b border-gray-300 w-full">
            <div 
              onClick={() => toggleAnswer(faq._id)}
              className="cursor-pointer py-2 text-lg font-semibold text-gray-800 hover:text-blue-600 transition duration-300"
            >
              {faq.title}
            </div>
            {openFAQId === faq._id && (
              <div className="text-gray-600 mt-2 flex justify-between">
                {faq.description}
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleEditFAQ(faq)}
                    className='bg-yellow-400 text-white py-1 px-2 rounded-md hover:bg-yellow-500 transition duration-300'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteFAQ(faq)}
                    className='bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-700 transition duration-300'
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;

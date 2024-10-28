import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../navigation';
import AddInformModal from '../addİnform';
import EditInformModal from '../editİnform';

const Inform = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [informs, setInforms] = useState([]); 
  const [currentInform, setCurrentInform] = useState(null); 

  const fetchInforms = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/informs'); 
      setInforms(response.data); 
    } catch (error) {
      console.error('Error fetching informs:', error);
    }
  };

  useEffect(() => {
    fetchInforms();
  }, []);

  const toggleAccordion = (index) => {
    setIsAccordionOpen((prevIndex) => (prevIndex === index ? null : index)); 
  };

  const handleAddInform = (newInform) => {
    setInforms((prev) => [...prev, newInform]);
  };

  const handleEditInform = (inform) => {
    setCurrentInform(inform); // Set the current inform to be edited
    setIsEditModalOpen(true); // Open the edit modal
  };

  const handleInformUpdated = (updatedInform) => {
    setInforms((prev) => 
      prev.map((inform) => (inform.id === updatedInform.id ? updatedInform : inform)) 
    );
  };

  const handleDeleteInform = async (informId) => {
    try {
      await axios.delete(`http://localhost:3000/api/informs/${informId}`);
      setInforms((prev) => prev.filter((inform) => inform._id !== informId)); // Remove the inform from the state
    } catch (error) {
      console.error('Error deleting inform:', error);
    }
  };

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <div className='bg-gray-900 text-white w-[250px] p-6'>
        <Navigation />
      </div>
      <div className='flex-1 p-8'>
        <div className='flex justify-between'>
        <h1 className='text-3xl font-bold text-gray-800 mb-6'>Informs Page</h1>
        <button
          className='bg-green-500 text-white px-4 py-2 rounded-md mb-6 hover:bg-green-600'
          onClick={() => setIsModalOpen(true)} // Open add modal
        >
          Add Inform
        </button>
        </div>

        <AddInformModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onInformAdded={handleAddInform} 
        />

        <EditInformModal 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)} 
          inform={currentInform} 
          onInformUpdated={handleInformUpdated} 
        />

        <div className='bg-white shadow-md rounded-lg'>
          {informs.map((inform, index) => (
            <div key={index} className="mb-4"> {/* Add margin bottom for spacing */}
              <div
                className='flex justify-between items-center p-4 cursor-pointer bg-gray-200 rounded-t-lg'
                onClick={() => toggleAccordion(index)} // Toggle accordion
              >
                <h2 className='text-lg font-medium text-gray-800'>{inform.title}</h2>
                <span className='text-gray-600'>{isAccordionOpen === index ? '-' : '+'}</span>
              </div>
              {isAccordionOpen === index && (
                <div className='p-4'>
                  <div className='mb-4'>
                    <strong>Content:</strong>
                    <p className='text-gray-700'>{inform.content}</p>
                  </div>
                  <div className='mb-4'>
                    <strong>Description:</strong>
                    <p className='text-gray-700'>{inform.description}</p>
                  </div>
                  <div className='mb-4'>
                    <strong>Code:</strong>
                    <p className='text-gray-700'>{inform.code}</p>
                  </div>
                  <div className='flex justify-end gap-2'>
                    <button
                      className='bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600'
                      onClick={() => handleEditInform(inform)} // Open edit modal
                    >
                      Edit
                    </button>
                    <button
                      className='bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600'
                      onClick={() => handleDeleteInform(inform._id)} 
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
    </div>
  );
};

export default Inform;

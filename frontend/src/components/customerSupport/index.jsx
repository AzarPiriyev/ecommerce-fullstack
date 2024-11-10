import React, { useState, useEffect } from 'react';
import Container from '../common/container';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const CustomerSupport = () => {
  const [customerSupportData, setCustomerSupportData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchCustomerSupportData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/informs');
        const data = await response.json();
        
        
        const customerSupportItems = data.filter(item => item.code === "Customer Support");
        setCustomerSupportData(customerSupportItems);
      } catch (error) {
        console.error('Error fetching Customer Support data:', error);
      }
    };

    fetchCustomerSupportData();
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Container>
      <div className="max-w-2xl mx-auto p-4 mt-5 mb-10">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Customer Support</h1>
        <div className="space-y-4">
          {customerSupportData.map((item, index) => (
            <div key={index} className="border rounded-lg shadow-sm">
              <button
                className="w-full flex justify-between items-center p-4 text-left text-lg font-medium text-gray-700 hover:text-orange-500 focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <span>{item.content}</span>
                {activeIndex === index ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
              </button>
              {activeIndex === index && (
                <div className="px-4 pb-4 text-gray-600">
                  {item.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default CustomerSupport;
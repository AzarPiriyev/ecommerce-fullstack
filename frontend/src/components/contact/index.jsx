import React, { useState, useEffect } from 'react';
import Container from '../common/container';

const ContactComp = () => {
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/contacts');
        if (!response.ok) throw new Error('Failed to fetch contact information');

        const data = await response.json();
        setContactInfo(data[0]); 
      } catch (error) {
        console.error('Error fetching contact information:', error);
      }
    };

    fetchContactInfo();
  }, []);

  if (!contactInfo) {
    return <p>Loading contact information...</p>;
  }

  return (
    <Container>
      <div className='mt-5 mb-5'>
        <h1 className='text-[26px] font-bold text-[#2f2f2f] mb-3 md:text-[36px]'>Contact Information</h1>
        <div>
          <div className='mb-1'>
            <h2 className='text-[16px] font-bold text-[#2f2f2f]'>Address:</h2>
            <p className='text-[16px] font-normal text-[#2f2f2f]'>
              {contactInfo.adress || 'Address not available'}
            </p>
          </div>
          <div>
            <h2 className='text-[16px] font-bold text-[#2f2f2f]'>Phone:</h2>
            <p className='text-[16px] font-normal text-[#2f2f2f]'>{contactInfo.phone}</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ContactComp;

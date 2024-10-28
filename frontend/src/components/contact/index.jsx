import React from 'react'
import Container from '../common/container'

const ContactComp = () => {
  return (
    <Container>
        <div className='mt-5 mb-5'>
            
            <h1 className='text-[26px] font-bold text-[#2f2f2f] mb-3 md:text-[36px]'>Contact Information</h1>
            <div>
                <div className='mb-1'>
                    <h2 className='text-[16px] font-bold text-[#2f2f2f] '>Adress:</h2>
                    <p className='text-[16px] font-normal text-[#2f2f2f]'>123 Main St, City, State, Zip</p>
                </div>
                <div>
                    <h2 className='text-[16px] font-bold text-[#2f2f2f] '>Phone:</h2>
                    <p className='text-[16px] font-normal text-[#2f2f2f]'>00000000</p>
                </div>
            </div>
            
        </div>
    </Container>
  )
}

export default ContactComp
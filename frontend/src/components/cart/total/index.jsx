import React from 'react';

const Total = ({ totalPrice = 0 }) => {  // totalPrice varsayılan olarak 0
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 md:static md:shadow-none md:bg-transparent lg:min-w-[220px] lg:mt-[30px]"
      style={{ zIndex: 1000 }}>
      <div className='flex justify-between mb-[10px]'>
        <p className='text-[12px] text-[#2f2f2f] font-medium md:text-[16px]'>Your subtotal</p>
        <p className='text-[12px] text-[#2f2f2f] font-medium md:text-[16px]'>${totalPrice.toFixed(2)}</p>
      </div>
      <div className='flex justify-between mb-[10px]'>
        <p className='text-[12px] text-[#2f2f2f] font-medium md:text-[16px]'>Shipping charges</p>
        <p className='text-[12px] text-[#2f2f2f] font-medium md:text-[16px]'>Free</p>
      </div>
      <hr className='mb-[20px]' />
      <div className='flex justify-between md:flex-col md:gap-y-5'>
        <div className='md:flex justify-between'>
          <p className='text-[12px] text-[#2f2f2f] font-medium md:text-[16px]'>Total</p>
          <p className='text-[20px] text-[#ff5100] font-semibold'>${totalPrice.toFixed(2)}</p>
        </div>
        <button className='border border-[#ff5100] bg-[#ff5100] text-white py-[5px] px-[33px] rounded-[28px] md:py-[10px]'>Confirm cart</button>
      </div>
    </div>
  );
};

export default Total;

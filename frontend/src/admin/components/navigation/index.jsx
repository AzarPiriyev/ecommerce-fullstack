import React from 'react';
import { FaCartShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { MdQuestionAnswer } from "react-icons/md";

const Navigation = () => {
  return (
    <div className='bg-gray-900 text-white h-screen'>
      <div className='flex flex-col w-[200px] py-[20px] px-[10px] h-full'>
        {/* Logo */}
        <div className='mb-[40px]'>
          <img src="/src/assets/images/babil-logo.svg" alt="Babil Logo" className='w-full' />
        </div>

        {/* Navigation Items */}
        <nav className='flex flex-col space-y-6'>
          {/* Products */}
          <div className='flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md cursor-pointer'>
            <FaCartShopping className='text-[24px]' />
            <p className='text-[18px] font-medium'>Products</p>
          </div>

          {/* Users */}
          <div className='flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md cursor-pointer'>
            <FaUser className='text-[24px]' />
            <p className='text-[18px] font-medium'>Users</p>
          </div>

          {/* Contacts */}
          <div className='flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md cursor-pointer'>
            <IoCall className='text-[24px]' />
            <p className='text-[18px] font-medium'>Contacts</p>
          </div>

          {/* FAQ */}
          <div className='flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md cursor-pointer'>
            <MdQuestionAnswer className='text-[24px]' />
            <p className='text-[18px] font-medium'>FAQ</p>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navigation;

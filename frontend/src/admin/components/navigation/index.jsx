import React from 'react';
import { FaCartShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { MdQuestionAnswer } from "react-icons/md";
import { Link } from 'react-router-dom';
import { BiSolidCategory } from "react-icons/bi";
import { IoIosInformationCircle } from "react-icons/io";

const Navigation = () => {
  return (
    <div className='bg-gray-900 text-white h-screen'>
      <div className='flex flex-col w-[200px] py-[20px] px-[10px] h-full'>
        {/* Logo */}
        <div className='mb-[40px]'>
          <Link to={'/'}><img src="/src/assets/images/babil-logo.svg" alt="Babil Logo" className='w-full' /></Link>
        </div>

        {/* Navigation Items */}
        <nav className='flex flex-col space-y-6'>
          {/* Products */}
          <Link to={'/admin'}><div className='flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md cursor-pointer'>
            <FaCartShopping className='text-[24px]' />
            <p className='text-[18px] font-medium'>Products</p>
          </div></Link>

           {/* Categories */}
           <Link to={'/admin/categories'}><div className='flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md cursor-pointer'>
            <BiSolidCategory className='text-[24px]' />
            <p className='text-[18px] font-medium'>Categories</p>
          </div></Link>

          {/* Users */}
          <Link to={'/admin/users'}><div className='flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md cursor-pointer'>
            <FaUser className='text-[24px]' />
            <p className='text-[18px] font-medium'>Users</p>
          </div></Link>

          {/* Contacts */}
          <Link to={'/admin/contacts'}><div className='flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md cursor-pointer'>
            <IoCall className='text-[24px]' />
            <p className='text-[18px] font-medium'>Contacts</p>
          </div></Link>

          {/* FAQ */}
          <Link to={'/admin/faq'}><div className='flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md cursor-pointer'>
            <MdQuestionAnswer className='text-[24px]' />
            <p className='text-[18px] font-medium'>FAQ</p>
          </div></Link>

          {/* Inform */}
          <Link to={'/admin/informs'}><div className='flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md cursor-pointer'>
            <IoIosInformationCircle className='text-[24px]' />
            <p className='text-[18px] font-medium'>Informs</p>
          </div></Link>
        </nav>
      </div>
    </div>
  );
}

export default Navigation;

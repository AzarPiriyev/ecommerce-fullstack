import React, { useState } from 'react';
import { IoFilterSharp } from "react-icons/io5";

const Filter = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Durum yönetimi ekliyoruz

  // Filtreyi açıp kapatma fonksiyonu
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className='mt-[20px]'>
      {/* Sadece mobilde gözükecek olan filtre ikonu */}
      <div className='flex justify-end md:hidden'>
        <button onClick={toggleFilter}>
          <IoFilterSharp size={24} className='text-[#ff5100]' />
        </button>
      </div>

      {/* Filtre menüsü: mobilde ikon tıklanınca açılır */}
      <div className={`px-[30px] min-w-[358px] ${isFilterOpen ? 'block' : 'hidden'} md:block`}>
        <h2 className='mb-[20px] text-center text-[18px] font-semibold block md:hidden'>Filter</h2>
        <ul className='mb-[20px]'>
          <p className='text-[16px] text-[#2f2f2f] font-medium py-[7px] '>Categories</p>
          <div className='max-h-[180px] overflow-y-auto'>
            <li className='text-[14px] text-[#2f2f2f] font-normal py-[7px] cursor-pointer hover:text-[#ff5100] transition '>History</li>
            <li className='text-[14px] text-[#2f2f2f] font-normal py-[7px] cursor-pointer hover:text-[#ff5100] transition'>Literature</li>
            <li className='text-[14px] text-[#2f2f2f] font-normal py-[7px] cursor-pointer hover:text-[#ff5100] transition'>Economy</li>
          </div>
        </ul>
        <hr />
        <ul className='mb-[20px]'>
          <p className='text-[16px] text-[#2f2f2f] font-medium py-[7px] '>Writer</p>
          <div className='max-h-[180px] overflow-y-auto'>
            <li className='text-[14px] text-[#2f2f2f] font-normal py-[7px] cursor-pointer hover:text-[#ff5100] transition'>Matt Haig</li>
            <li className='text-[14px] text-[#2f2f2f] font-normal py-[7px] cursor-pointer hover:text-[#ff5100] transition'>Jules Payot</li>
            <li className='text-[14px] text-[#2f2f2f] font-normal py-[7px] cursor-pointer hover:text-[#ff5100] transition'>Gabor Mate</li>
          </div>
        </ul>
        <hr />
        <ul className='mb-[20px] '>
          <p className='text-[16px] text-[#2f2f2f] font-medium py-[7px] '>Price</p>
          <div className='max-h-[180px] overflow-y-auto'>
            <li className='text-[14px] text-[#2f2f2f] font-normal py-[7px] cursor-pointer hover:text-[#ff5100] transition'>0 - 10 $</li>
            <li className='text-[14px] text-[#2f2f2f] font-normal py-[7px] cursor-pointer hover:text-[#ff5100] transition'>10 - 20 $</li>
            <li className='text-[14px] text-[#2f2f2f] font-normal py-[7px] cursor-pointer hover:text-[#ff5100] transition'>20 - 30 $</li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Filter;

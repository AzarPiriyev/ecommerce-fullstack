import React, { useRef } from 'react';
import Container from '../../common/container';
import { GrBasket } from "react-icons/gr";
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

const New = () => {
  const scrollRef = useRef(null);

  
  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -300, 
      behavior: 'smooth',
    });
  };

  
  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 300, 
      behavior: 'smooth',
    });
  };

  return (
    <Container>
      <div className="relative mb-[40px]">
        <div className='py-[10px] flex justify-between mb-[10px]'>
          <h1 className='text-[24px] font-bold text-[#2f2f2f] '>New</h1>
          <p className='text-[20px] font-semibold text-[#979797] mt-[4px] underline cursor-pointer'>See All</p>
        </div>

        <div className="overflow-x-auto flex gap-[20px]" ref={scrollRef}>
          <div className="flex gap-[30px] w-full min-w-max px-[30px] md:px-[50px] md:gap-[40px]">

            <div className=''>
              <img src="/src/assets/images/new.jpeg" alt="product" className='rounded-[8px] mb-[15px]' />
              <p className='text-[18px] text-[#333333] font-medium'>Hilkat Garibeleri</p>
              <p className='text-[#c9cccc] text-[14px] font-normal'>Serdar Uslu</p>
              <p className='text-[#2f2f2f] text-[16px] font-medium mb-[10px]'>$10</p>
              <div className='flex gap-[10px]'>
                <p className='text-[16px] text-[#ff5100] font-bold'>Add to Cart</p>
                <GrBasket className='text-[#ff5100] mt-[4px]' />
              </div>
            </div>

          </div>
        </div>

        <button
          className='absolute left-[-20px] top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100'
          onClick={scrollLeft}
          style={{ zIndex: 10 }} 
        >
          <IoChevronBackOutline size={24} />
        </button>

        <button
          className='absolute right-[-20px] top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100'
          onClick={scrollRight}
          style={{ zIndex: 10 }} 
        >
          <IoChevronForwardOutline size={24} />
        </button>
      </div>
    </Container>
  );
};

export default New;

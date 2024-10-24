import React from 'react'
import { GrBasket } from "react-icons/gr";

const Products = () => {
  return (
    <div>
        <h1 className='text-[20px] text-[#2f2f2f] font-semibold text-center mb-[20px]'>New Products</h1>
        <div className='grid grid-cols-2 gap-x-5 gap-y-5 px-[20px] sm:grid-cols-3 md:grid-cols-2 md:gap-x-7 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-10 mb-[40px]'>

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

        <div className='flex gap-[10px] justify-center'>
            <button className='border border-[#979797] rounded-[50%] bg-[#979797] text-white py-1 px-3'>1</button>
            <button className='border border-[#f2f5f5] rounded-[50%] bg-[#f2f5f5] text-[#979797] py-1 px-3'>2</button>
        </div>
    </div>
  )
}

export default Products
import React from 'react'
import Container from '../common/container'
import { GrBasket } from "react-icons/gr";


const Wishlist = () => {
  return (
    <Container>
        <div className='mt-[30px] mb-[30px]'>
        <h1 className='text-[20px] text-[#2f2f2f] font-semibold text-center mb-[20px]'>Library</h1>
        <div className='grid grid-cols-2 gap-x-5 gap-y-5 px-[20px] sm:grid-cols-3 md:grid-cols-2 md:gap-x-7 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-10 mb-[40px]'>

            <div className='px-2 py-1 max-w-[160px] mx-auto'>
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
    </Container>
  )
}

export default Wishlist
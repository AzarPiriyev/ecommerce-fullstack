import React from 'react'
import Container from '../../common/container'
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

const Basket = () => {
  return (
    
    <div className='mb-[30px] mt-[30px] lg:w-full'>
        <h1 className='mb-[20px] text-[20px] text-[#2f2f2f] font-bold'>My Cart</h1>
        <div className='flex px-5 max-w-[824px] w-full border-2 py-[10px] rounded-[16px]'>
            <div className='flex gap-[10px] min-w-[80px]'>
                <img src="/src/assets/images/product.jpeg" alt="" className='w-[80px] h-[120px]'/>               
            </div>

            <div className='px-4 w-full md:flex md:justify-between'>
                <div className='mb-3 md:mt-[30px]'>
                    <p className='text-[14px] text-[#2f2f2f] font-semibold md:text-[18px]'>Dağınık Zihinler</p>
                    <p className='text-[10px] text-[#e95b1d] font-medium md:text-[14px]'>Gabor Mate</p>
                </div>
                <div className='flex justify-between mb-3 md:gap-[60px]'>
                    <div className='flex gap-2'>
                        <button><FaMinus className='text-[#ff5100]' /></button>
                        <p className='border-2 rounded-[4px] py-1 px-3 md:mt-[35px] md:h-[35px]'>1</p>
                        <button><FaPlus className='text-[#ff5100]' /></button>
                    </div>
                    <p className='text-[14px] text-[#2f2f2f] font-semibold mt-[5px] md:text-[18px] md:mt-[40px]'>$10</p>
                </div>

                <div className='flex justify-end'>
                <RiDeleteBin6Line className='text-[#e95b1d] w-[24px] h-[27px] md:mt-[37px]' />
                </div>
            </div>  
        </div>

        
    </div>
    
  )
}

export default Basket
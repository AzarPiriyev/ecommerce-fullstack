import React from 'react'
import { FaCartShopping } from "react-icons/fa6";

const Navigation = () => {
  return (
    <div>
        <div className='mb-[20px]'>
            <img src="/src/assets/images/babil-logo.svg" alt="" />
        </div>

        <div className='flex gap-2'>
            <FaCartShopping className='mt-[10px]'/>
            <p className='text-[20px] font-semibold'>Products</p>
        </div>
    </div>
  )
}

export default Navigation
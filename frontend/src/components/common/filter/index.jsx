import React from 'react'

const Filter = () => {
  return (
    <div className='px-[30px] min-w-[358px]'>
        <ul className='mb-[20px]'>
            <p className='text-[16px] text-[#2f2f2f] font-medium py-[7px] '>Categories</p>
            <div className='max-h-[180px] overflow-y-auto'>
            <li className='text-[14px] text-[#2f2f2f] font-normal py-[7px] cursor-pointer '>History</li>
            <li className='text-[14px] text-[#2f2f2f] font-normal py-[7px] cursor-pointer '>Literature</li>
            <li className='text-[14px] text-[#2f2f2f] font-normal py-[7px] cursor-pointer '>Economy</li>
            </div>
        </ul>
        <hr />

        <ul className='mb-[20px]'>
            <p className='text-[16px] text-[#2f2f2f] font-medium py-[7px] '>Writer</p>
            <div className='max-h-[180px] overflow-y-auto'>
            <li className='text-[14px] text-[#2f2f2f] font-normal py-[7px] cursor-pointer '>Matt Haig</li>
            <li className='text-[14px] text-[#2f2f2f] font-normal py-[7px] cursor-pointer '>Jules Payot</li>
            <li className='text-[14px] text-[#2f2f2f] font-normal py-[7px] cursor-pointer '>Gabor Mate</li>
            </div>
        </ul>
        <hr />

        <ul className='mb-[20px] '>
            <p className='text-[16px] text-[#2f2f2f] font-medium py-[7px] '>Price</p>
            <div className='max-h-[180px] overflow-y-auto'>
            <li className='text-[14px] text-[#2f2f2f] font-normal py-[7px] cursor-pointer '>0 - 10 $</li>
            <li className='text-[14px] text-[#2f2f2f] font-normal py-[7px] cursor-pointer '>10 - 20 $</li>
            <li className='text-[14px] text-[#2f2f2f] font-normal py-[7px] cursor-pointer '>20 - 30 $</li>
            </div>
        </ul>
    </div>
  )
}

export default Filter
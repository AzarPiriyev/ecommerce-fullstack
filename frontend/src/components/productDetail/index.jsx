import React from 'react'
import Container from '../common/container'
import { GrBasket } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa";


const ProductDetail = () => {
  return (
    <Container>
        <div className='mt-[40px] mb-[40px]'>

            <div className='mb-[40px] md:flex  '>
             <div className='py-[20px] px-[50px] mb-[20px] flex justify-center md:justify-start'>
                <img src="/src/assets/images/product.jpeg" alt="" className='w-[220px] h-[340px] xl:w-[260px] md:h-[400px]'/>
             </div>

             <div className='md:px-[30px] md:py-[17px] md:min-w-[350px] lg:min-w-[500px] xl:min-w-[700px]'>
                <h1 className='text-[34px] text-[#2f2f2f] font-bold'>Dağınık Zihinler</h1>
                <p className='text-[14px] font-medium text-[#ff5100] mb-[30px]'>Gabor Mate</p>
                <div className='mb-[30px] md:flex md:justify-between'>
                    <p className='text-[30px] font-semibold text-[#2f2f2f] text-center mb-[20px]'>$20</p>
                    <div>
                    <button className='flex gap-2 border border-[#ff5100] bg-[#ff5100] py-[17px] justify-center rounded-[31px] w-full mb-2 lg:min-w-[225px] xl:min-w-[280px] '>
                      <GrBasket className='text-white mt-[3px]'/>
                      <p className='text-5 font-bold text-white'>Add to Cart</p>
                    </button>
                    <p className='text-[16px] font-bold text-[#2e2e2e] text-center'>Available in 2 Days</p>
                    </div>
                </div>
                <div className='flex gap-[10px]'>
                    <div className='border-2 border-[#fc521f] py-3 px-3 rounded-[50%]'>
                <FaRegHeart className='text-[#fc521f] h-[24px] w-[24px] '/>
                </div>
                <p className='text-[14px] text-[#2f2f2f] font-normal mt-[15px]'>Add to Library</p>
                </div>
             </div>
            </div>

            <div>
                <h3 className='mb-[20px] text-[20px] font-medium text-[#2f2f2f]'>About the Book</h3>
                <p className='text-[#2f2f2f] text-[16px] font-normal'>Çocuklarımızı sevgi dolu bir güven ortamında yetiştirmek için elimizden geleni yapan ebeveynler olarak halihazırda hissettiğimizden daha suçlu hissetmemizin hiç lüzumu yok.</p>
            </div>


        </div>
    </Container>
  )
}

export default ProductDetail
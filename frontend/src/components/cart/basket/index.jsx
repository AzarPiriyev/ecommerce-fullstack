import React, { useEffect, useState } from 'react';
import Container from '../../common/container';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import useCartStore from '../../../store/cart';

const Basket = () => {
    const { fetchCart, cart = [] } = useCartStore(); // Установите начальное значение cart как пустой массив
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setUserId(user._id);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            fetchCart(userId);
        }
    }, [userId, fetchCart]);

    console.log(cart); // Проверка содержимого корзины в консоли

    return (
        <div className='mb-[30px] mt-[30px] lg:w-full'>
            <h1 className='mb-[20px] text-[20px] text-[#2f2f2f] font-bold'>My Cart</h1>
            {Array.isArray(cart) && cart.map((item) => (  // Извлекаем items из объекта cart
                <div key={item.productId} className='flex px-5 max-w-[824px] w-full border-2 py-[10px] rounded-[16px]'>
                    <div className='flex gap-[10px] min-w-[80px]'>
                        <img src={item.imageUrl} alt={item.name} className='w-[80px] h-[120px]' />               
                    </div>
                    <div className='px-4 w-full md:flex md:justify-between'>
                        <div className='mb-3 md:mt-[30px]'>
                            <p className='text-[14px] text-[#2f2f2f] font-semibold md:text-[18px]'>{item.name}</p>
                        </div>
                        <div className='flex justify-between mb-3 md:gap-[60px]'>
                            <div className='flex gap-2'>
                                <button><FaMinus className='text-[#ff5100]' /></button>
                                <p className='border-2 rounded-[4px] py-1 px-3 md:mt-[35px] md:h-[35px]'>{item.quantity}</p>
                                <button><FaPlus className='text-[#ff5100]' /></button>
                            </div>
                            <p className='text-[14px] text-[#2f2f2f] font-semibold mt-[5px] md:text-[18px] md:mt-[40px]'>${item.price}</p>
                        </div>
                        <div className='flex justify-end'>
                            <RiDeleteBin6Line className='text-[#e95b1d] w-[24px] h-[27px] md:mt-[37px]' />
                        </div>
                    </div>  
                </div>
            ))}
        </div>
    );
}

export default Basket;

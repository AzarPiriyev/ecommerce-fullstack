import React, { useEffect, useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaMinus, FaPlus } from "react-icons/fa";
import useCartStore from '../../../store/cart';
import Total from '../total'; // Total bileşenini içe aktarın

const Basket = () => {
    const { fetchCart, cart = [], updateCartItemQty, removeCartItem } = useCartStore();
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

    const handleQuantityChange = (productId, quantity) => {
        if (quantity < 1) return;
        updateCartItemQty(userId, productId, quantity);
    };

    // Toplam fiyatı hesaplayan fonksiyon
    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className='mb-[30px] mt-[30px] lg:w-full '>
            <div className='lg:flex lg:justify-between'>
            <div className='lg:min-w-[620px] w-full'>
            <h1 className='mb-[20px] text-[20px] text-[#2f2f2f] font-bold'>My Cart</h1>
            {Array.isArray(cart) && cart.map((item, index) => (
                <div key={item.productId || index} className='flex px-5 max-w-[824px] w-full border-2 py-[10px] rounded-[16px] mb-5'>
                    <div className='flex gap-[10px] min-w-[80px]'>
                        <img src={item.imageUrl} alt={item.name} className='w-[80px] h-[120px] ' />               
                    </div>
                    <div className='px-4 w-full md:flex md:justify-between'>
                        <div className='mb-3 md:mt-[30px]'>
                            <p className='text-[14px] text-[#2f2f2f] max-w-[210px] font-semibold md:text-[18px]'>{item.name}</p>
                        </div>
                        <div className='flex justify-between mb-3 md:gap-[60px]'>
                            <div className='flex gap-2 items-center'>
                                <button onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}>
                                    <FaMinus className='text-[#ff5100]' />
                                </button>
                                <p className='border-2 rounded-[4px] py-1 px-3  md:h-[35px]'>{item.quantity}</p>
                                <button onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}>
                                    <FaPlus className='text-[#ff5100]' />
                                </button>
                            </div>
                            <p className='text-[14px] text-[#2f2f2f] font-semibold mt-[5px] md:text-[18px] md:mt-[40px]'>${item.price}</p>
                        </div>
                        <div className='flex justify-end'>
                            <button onClick={() => removeCartItem(userId, item.productId)}>
                                <RiDeleteBin6Line className='text-[#e95b1d] w-[24px] h-[27px]' />
                            </button>
                        </div>
                    </div>  
                </div>
            ))}
            </div>
            <div>
            {/* Total bileşenine totalPrice prop'u ile gönderilir */}
            <Total totalPrice={calculateTotalPrice()} />
            </div>
            </div>
        </div>
    );
};

export default Basket;

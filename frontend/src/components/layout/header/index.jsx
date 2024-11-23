import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '../../common/container';
import { IoSearch } from "react-icons/io5";
import { PiBooks } from "react-icons/pi";
import { GrBasket } from "react-icons/gr";
import { VscAccount, VscSignOut } from "react-icons/vsc";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import { FaUserShield } from "react-icons/fa"; 
import { AiOutlineClose } from "react-icons/ai"; 
import useWishlistStore from '../../../store/wishlist';
import useCartStore from '../../../store/cart';

const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [foundProducts, setFoundProducts] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); 
    const navigate = useNavigate();
    const [wishlistCount, setWishlistCount] = useState(0);
    const { wishlist } = useWishlistStore(); 
    const [cartCount, setCartCount] = useState(0);
    const { cart} = useCartStore();


    useEffect(() => {
        setWishlistCount(wishlist.length); 
    }, [wishlist]); 

    useEffect(() => {
        setCartCount(cart.length);  
      }, [cart]);

      useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartCount(storedCart.length);  
      }, [cart]);  

      useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('user'))?.userId;  
        if (userId) {
          useCartStore.getState().fetchCart(userId); 
        }
      }, []); 
      
      

    const navElements = [
        { title: "NEW", href: "/products/new" },
        { title: "TOP SELLINGS", href: "/products/top-sellings" },
        { title: "CATEGORIES", href: "/categories" },
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSearchProduct = async (keyword) => {
        try {
            if (keyword && keyword.trim() !== '' && keyword.trim().length > 2) {
                const response = await axios.get(`http://localhost:3000/api/search/${keyword}`);
                setFoundProducts(response.data.data);
            } else {
                setFoundProducts([]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (keyword) {
            handleSearchProduct(keyword);
        } else {
            setFoundProducts([]);
        }
    }, [keyword]);

    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setIsLoggedIn(!!user);
        if (user && user.role === 'Admin') {
            setIsAdmin(true); 
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('cart'); 
        setIsLoggedIn(false);
        setIsAdmin(false);
        setCartCount(0);  
        navigate('/'); 
      };
      

    return (
        <div>
            <Container>
                <div className='flex justify-between py-[15px]'>
                    <div className='flex gap-[20px]'>
                        <GiHamburgerMenu
                            onClick={toggleSidebar}
                            className='block md:hidden h-[20px] w-[20px] text-[#979797] mt-[10px] md:h-[30px] md:w-[30px] cursor-pointer'
                        />
                        <Link to={'/'}>
                            <img src="/src/assets/images/babil-logo.svg" alt="" className='relative w-[80px] h-[40px] md:h-auto md:w-auto' />
                        </Link>
                    </div>

                    <div className='hidden md:block relative'>
                        <IoSearch className='absolute mt-[18px] ml-[25px] h-[24px] w-[24px] text-[#ff5100]' />
                        <input
                            type="text"
                            placeholder='What are you looking for?'
                            className='border border-[#979797] py-[14px] pl-[70px] pr-[300px] rounded-[16px] text-[20px] md:pr-[10px] lg:pr-[160px] xl:pr-[250px] xl:w-[550px]'
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)} 
                        />
                        {foundProducts.length > 0 && (
                            <div className='absolute top-[50px] left-0 w-full bg-white border border-[#979797] z-10'>
                                <ul>
                                    {foundProducts.map((product) => (
                                        <li key={product._id} className='p-2 flex items-center hover:bg-gray-100'>
                                            <Link onClick={() => setKeyword('')} to={`/product/${product._id}`} className="flex items-center">
                                                <img 
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    className="w-12 h-12 object-cover mr-3"
                                                />
                                                <span>{product.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className='flex gap-[20px]'>
                        <Link to={'/library'}>
                        <div className="relative inline-block">
                        <PiBooks className="h-[25px] w-[25px] text-[#979797] mb-[2px] ml-[4px] md:h-[30px] md:w-[30px]" />
                        {wishlistCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-[#ff5100] text-white text-[10px] font-bold rounded-full w-[18px] h-[18px] flex items-center justify-center border-2 border-white">
                        {wishlistCount}
                        </span>
                        )}
                        <p className="text-[14px] font-normal text-[#979797] hidden md:block">Library</p>
                        </div>

                        </Link>
                        <Link to={'/cart'}>
                        <div className="relative inline-block">
                        <GrBasket className="h-[25px] w-[25px] text-[#979797] mb-[2px] md:h-[30px] md:w-[30px]" />
                        {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-[#ff5100] text-white text-[10px] font-bold rounded-full w-[18px] h-[18px] flex items-center justify-center border-2 border-white">
                        {cartCount}
                        </span>
                        )}
                        <p className="text-[14px] font-normal text-[#979797] ml-[2px] hidden md:block">Cart</p>
                        </div>

                        </Link>
                        {isLoggedIn ? (
                            <>
                                {isAdmin && (
                                    <Link to="/admin">
                                        <div className="cursor-pointer">
                                            <FaUserShield className='h-[25px] w-[25px] text-[#ff5100] md:h-[30px] md:w-[30px]' />
                                            <p className='text-[14px] font-normal text-[#ff5100] hidden md:block'>Admin</p>
                                        </div>
                                    </Link>
                                )}
                                <div onClick={handleLogout} className="cursor-pointer">
                                    <VscSignOut className='h-[25px] w-[25px] text-[#979797] md:h-[30px] md:w-[30px]' />
                                    <p className='text-[14px] font-normal text-[#979797] hidden md:block'>Log out</p>
                                </div>
                            </>
                        ) : (
                            <Link to={'/login'}>
                                <div>
                                    <VscAccount className='h-[25px] w-[25px] text-[#979797] md:h-[30px] md:w-[30px]' />
                                    <p className='text-[14px] font-normal text-[#979797] hidden md:block'>Log in</p>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className='px-[200px] py-[12px] hidden md:block'>
                    <ul className='flex justify-between min-w-[300px] text-[#979797] text-[18px] font-medium'>
                        {navElements.map((link, index) => (
                            <li key={index}>
                                <a href={link.href}>{link.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Sidebar for Mobile */}
                {isSidebarOpen && (
                        <div className="fixed top-0 left-0 w-1/2 h-full bg-white z-50 p-4 flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-[20px] font-semibold text-gray-700">Menu</h2>
                                <button onClick={() => setIsSidebarOpen(false)} className="text-2xl text-gray-500">
                                    <AiOutlineClose /> 
                                </button>
                            </div>
                            <ul className="space-y-4">
                                {navElements.map((link, index) => (
                                    <li key={index}>
                                        <Link to={link.href} onClick={() => setIsSidebarOpen(false)} className="text-[#979797] text-[18px] font-medium block">
                                            {link.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                {/* Mobile Search Bar */}
                <div className='block md:hidden mt-[20px]'>
                    <IoSearch className='absolute mt-[15px] ml-[10px] h-[20px] w-[20px] text-[#ff5100]' />
                    <input
                        type="text"
                        placeholder='What are you looking for?'
                        className='border border-[#979797] py-[10px] pl-[40px] pr-[110px] w-full rounded-[16px] text-[18px]'
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)} 
                    />
                    {foundProducts.length > 0 && (
                        <div className='absolute top-[50px] left-0 w-full bg-white border border-[#979797] z-10'>
                            <ul>
                                {foundProducts.map((product) => (
                                    <li key={product._id} className='p-2 flex items-center hover:bg-gray-100'>
                                        <Link onClick={() => setKeyword('')} to={`/product/${product._id}`} className="flex items-center">
                                            <img 
                                                src={product.imageUrl}
                                                alt={product.name}
                                                className="w-12 h-12 object-cover mr-3"
                                            />
                                            <span>{product.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default Header;

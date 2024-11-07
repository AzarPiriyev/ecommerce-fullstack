import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '../../common/container';
import { IoSearch } from "react-icons/io5";
import { PiBooks } from "react-icons/pi";
import { GrBasket } from "react-icons/gr";
import { VscAccount, VscSignOut } from "react-icons/vsc";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import { FaUserShield } from "react-icons/fa"; // Admin icon (or any other icon you prefer)

const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [foundProducts, setFoundProducts] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // To track if the user is an admin
    const navigate = useNavigate();

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
            if (keyword && keyword.trim() !== '' && keyword.trim().length > 3) {
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

    // Update login state and check for user role (Admin) when the component mounts
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setIsLoggedIn(!!user);
        if (user && user.role === 'Admin') {
            setIsAdmin(true); // Set admin state if the user role is Admin
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user'); // Remove user data from localStorage
        localStorage.removeItem('token'); // Remove the token from localStorage if needed
        setIsLoggedIn(false); // Set login state to false
        setIsAdmin(false); // Reset admin state
        navigate('/'); // Redirect to homepage or login page
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
                            className='border border-[#979797] py-[14px] pl-[70px] pr-[300px] rounded-[16px] text-[20px] md:pr-[10px] lg:pr-[200px] xl:pr-[300px]'
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)} // Update keyword on input change
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
                            <div>
                                <PiBooks className='h-[25px] w-[25px] text-[#979797] mb-[2px] ml-[4px] md:h-[30px] md:w-[30px]' />
                                <p className='text-[14px] font-normal text-[#979797] hidden md:block'>Library</p>
                            </div>
                        </Link>
                        <Link to={'/cart'}>
                            <div>
                                <GrBasket className='h-[25px] w-[25px] text-[#979797] mb-[2px] md:h-[30px] md:w-[30px]' />
                                <p className='text-[14px] font-normal text-[#979797] ml-[2px] hidden md:block'>Cart</p>
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
                    <ul className='flex justify-between text-[#979797] text-[18px] font-medium'>
                        {navElements.map((link, index) => (
                            <li key={index}>
                                <a href={link.href}>{link.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Mobile Search Bar */}
                <div className='block md:hidden mt-[20px]'>
                    <IoSearch className='absolute mt-[15px] ml-[10px] h-[20px] w-[20px] text-[#ff5100]' />
                    <input
                        type="text"
                        placeholder='What are you looking for?'
                        className='border border-[#979797] py-[10px] pl-[40px] pr-[110px] w-full rounded-[16px] text-[18px]'
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)} // Update keyword on input change
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

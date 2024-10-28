import React from 'react'
import Container from '../../common/container'
import { AiFillFacebook } from "react-icons/ai";
import { FaTwitterSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
    const homeElements =[
        {title: "Home", href: "/"},
        {title: "Contact", href: "/contact"},
      ]

    const helpElements =[
        {title: "FAQ", href: "/"},
        {title: "Privacy Policy", href: "/"},
        {title: "Customer Support", href: "/"},
        {title: "Delivery Details", href: "/"},
      ]
    
  return (

        <div>

            <div className='py-[20px] bg-[#f2f5f5]'>
            <Container>
                <div className='block md:hidden'>
                <img src="/src/assets/images/babil-logo.svg" alt="" className=''/>
                </div>

                <div className='grid grid-cols-2 gap-y-5 md:grid-cols-4'>
                <ul className='flex flex-col '>
                    <p className='text-[18px] font-medium text-[#979797]'>Babil.com</p>
                    {homeElements.map((link, index) => (
            <li key={index} className='text-[#979797] text-[16px]'>
                <a href={link.href}>{link.title}</a>
            </li>
        ))}
                </ul>

                <ul className='flex flex-col '>
                    <p className='text-[18px] font-medium text-[#979797]'>Company</p>
                    {helpElements.map((link, index) => (
            <li key={index} className='text-[#979797] text-[16px]'>
                <a href={link.href}>{link.title}</a>
            </li>
        ))}
                </ul>

                <ul  className='flex flex-col gap-y-1'>
                    <p className='text-[18px] font-medium text-[#979797]'>Social Media</p>
                    <li className='flex gap-1 '>
                    <AiFillFacebook className='h-[24px] w-[24px] text-[#979797]' />
                    <p className='text-[#979797] text-[16px] font-normal'>Facebook</p>
                    </li>
                    <li className='flex gap-1 '>
                    <FaTwitterSquare className='h-[24px] w-[24px] text-[#979797]' />
                    <p className='text-[#979797] text-[16px] font-normal'>Twitter</p>
                    </li>
                    <li className='flex gap-1 '>
                    <FaInstagramSquare className='h-[24px] w-[24px] text-[#979797]' />
                    <p className='text-[#979797] text-[16px] font-normal'>Instagram</p>
                    </li>                   
                </ul>

                <ul>
                <p className='text-[18px] font-medium text-[#979797]'>Help</p>
                <li className='text-[#979797] text-[16px] font-normal'>help@babil.com</li>
                <li className='text-[#979797] text-[16px] font-normal'>WhatsApp Support Line</li>
                <li className='text-[22px] text-[#2f2f2f] font-medium'>0545 719 10 08</li>
                <li className='text-[#979797] text-[16px] font-normal'>You can reach us on our WhatsApp Support line between 09:00 - 19:00 on weekdays.</li>
                    
                </ul>
                </div>

                <div className='hidden md:block'>
                <img src="/src/assets/images/babil-logo.svg" alt="" className=''/>
                </div>
            </Container>
            </div>


            <div className='bg-[#2f2f2f] py-[30px]'>
                <Container>
                    <div>
                        <p className='text-[14px] text-[#979797] font-medium text-center mb-[20px]'>Copyright 2013 - 2021 - The content produced by babil.com cannot be used without written permission.</p>
                        <p className='text-[12px] text-[#979797] font-normal text-center mb-[5px]'>Libronet Bilgi Hizmetleri ve Yazılım SAN. LTD. ŞTİ.</p>
                        <p className='text-[12px] text-[#979797] font-normal text-center'>Altunizade Mahallesi Haluk Türksoy Sok. No:2/12 Beya Plaza Üsküdar/Istanbul - E-Posta: destek@babil.com - Mersis No.: 608056877000018</p>
                    </div>
                </Container>
            </div>
        </div>
    
  )
}

export default Footer
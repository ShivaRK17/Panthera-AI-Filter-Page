"use client";
import React from 'react'
import Image from 'next/image'
const Navbar = () => {
    return <>
        <div className="w-full h-[86px] flex items-center bg-gradient-to-b from-[#210868] to-[#4110ce]">
            <Image className='h-[80%] mx-10 lg:mx-20' src={'/logo.svg'} height={86} width={86} />
        </div >
    </>
}

export default Navbar
"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {

    const path=usePathname();
    useEffect(()=>{
        console.log(path)
    },[])

  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm' >
        <Image src={'/logo-1.svg'} width={160} height={100} alt='logo'/>
        <ul className='hidden md:flex gap-6'>
            <li className={`hover:text-black hover:font-bold transition-all cursor-pointer
            ${path=='/dashboard'&&'text-black font-bold'}
            `}
            ><Link href={'/dashboard'}>Dashboard</Link></li>
            <li className={`hover:text-black hover:font-bold transition-all cursor-pointer
            ${path=='/dashboard/questions'&&'text-black font-bold'}
            `}>Questions</li>
            <li className={`hover:text-black hover:font-bold transition-all cursor-pointer
            ${path=='/dashboard/upgrade'&&'text-black font-bold'}
            `}>Upgrade</li>
            <li className={`hover:text-black hover:font-bold transition-all cursor-pointer
            ${path=='/dashboard/how'&&'text-black font-bold'}
            `}>How it works?</li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header
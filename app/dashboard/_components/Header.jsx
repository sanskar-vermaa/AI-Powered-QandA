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
    <div className='glass-panel sticky top-0 z-50 flex p-4 items-center justify-between rounded-b-2xl' >
        <Image src={'/logo-1.svg'} width={160} height={100} alt='logo'/>
        <ul className='hidden md:flex gap-6'>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
            ${path=='/dashboard'&&'text-primary font-bold glow-text'}
            `}
            ><Link href={'/dashboard'}>Dashboard</Link></li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
            ${path=='/dashboard/questions'&&'text-primary font-bold glow-text'}
            `}>Questions</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
            ${path=='/dashboard/upgrade'&&'text-primary font-bold glow-text'}
            `}>Upgrade</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
            ${path=='/dashboard/how'&&'text-primary font-bold glow-text'}
            `}>How it works?</li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header
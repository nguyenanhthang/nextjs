import React from 'react'
import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import Menu from './Menu'
import { User } from '@prisma/client'
import { SafeUser } from '@/app/types'
import CateGories from './CateGories'

interface NavbarProps {
    currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({currentUser}) => {
    
    return (
        <div className='fixed w-full bg-white z-10 shadow-sm'>
            <div className='py-4 border-b-[1px]'>
                <Container>
                    <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                        <Logo />
                        <Search />
                        <Menu currentUser={currentUser} />
                    </div>
                </Container>
            </div>
            <CateGories />
        </div>
    )
}

export default Navbar

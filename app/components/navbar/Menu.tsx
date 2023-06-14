'use client'
import React from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import { useState, useCallback } from 'react'
import MenuItems from './MenuItems'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import useRentModal from '@/app/hooks/useRentModal'
import { signOut } from 'next-auth/react'
import { SafeUser } from '@/app/types'
interface MenuIf{
    currentUser?:SafeUser | null
}
const Menu: React.FC<MenuIf> = ({currentUser}) => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const rentModal = useRentModal()
    console.log(rentModal.isOpen);
    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value)
    }, [])
    const onRent = useCallback(()=>{
        if(!currentUser){
            return loginModal.onOpen();
        }
        rentModal.onOpen();
    },[loginModal, rentModal, currentUser])
    return (
        <div className='relative'>
            <div className='flex flex-row items-center gap-3'>
                <div
                    onClick={toggleOpen}
                    className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'
                >
                    your home
                </div>
                <div
                    onClick={toggleOpen}
                    className='py-4 md:py-1 md:px-2 border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                >
                    <AiOutlineMenu />
                    <div className='hidden md:block'>
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
                    <div className='flex flex-col cursor-pointer'>
                        {currentUser ? (
                            <>
                                <MenuItems onClick={loginModal.onOpen} label='My trips' />
                                <MenuItems onClick={registerModal.onOpen} label='My favorites' />
                                <MenuItems onClick={registerModal.onOpen} label='My reservations' />
                                <MenuItems onClick={rentModal.onOpen} label='My properties' />
                                <MenuItems onClick={rentModal.onOpen} label='My home' />
                                <hr />
                                <MenuItems onClick={()=>signOut()} label='Logout' />
                            </>
                        ):(
                            <>
                                <MenuItems onClick={loginModal.onOpen} label='Login' />
                                <MenuItems onClick={registerModal.onOpen} label='Sign up' />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Menu

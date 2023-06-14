'use client'

import useLoginModal from '@/app/hooks/useLoginModal'
import { signIn } from 'next-auth/react'
import React, { useCallback, useState } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../input/Input'
import { toast } from 'react-hot-toast'
import Button from '../Button'
import { AiFillGithub, AiFillGoogleCircle } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import useRegisterModal from '@/app/hooks/useRegisterModal'

const LoginModal = () => {
    const router = useRouter()
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })
    const toggle = useCallback(() => {
        loginModal.onClose()
        registerModal.onOpen()
    }, [registerModal, loginModal])
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        signIn('credentials', {
            ...data,
            redirect: false
        }).then((callback) => {
            setIsLoading(false)
            if (callback?.ok) {
                toast.success('logged in')
                router.refresh()
                loginModal.onClose()
            }
            if (callback?.error) {
                toast.error(callback.error)
            }
        })
    }
    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='welcome' subtitle='login account' />
            <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required />
            <Input
                id='password'
                label='Password'
                type='password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )
    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button outline label='Continue with Google' Icon={AiFillGoogleCircle} onClick={() => signIn('google')} />
            <Button outline label='Continue with Github' Icon={AiFillGithub} onClick={() => signIn('github')} />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='flex flex-row items-center gap-2'>
                    <div>Have not an account?</div>
                    <div onClick={toggle} className='text-neutral-800 cursor-pointer hover:underline'>
                        register
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <Modal
        
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title='Login'
            actionLabel='Continue'
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal

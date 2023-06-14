'use client'

import useRegisterModal from '@/app/hooks/useRegisterModal'
import axios from 'axios'
import React, { useCallback, useState } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../input/Input'
import { toast } from 'react-hot-toast'
import Button from '../Button'
import { AiFillGithub, AiFillGoogleCircle } from 'react-icons/ai'
import { signIn } from 'next-auth/react'
import useLoginModal from '@/app/hooks/useLoginModal'

const RegisterModal = () => {
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
        loginModal.onOpen()
        registerModal.onClose()
    }, [registerModal, loginModal])
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios
            .post('/api/register', data)
            .then(() => {
                toast.success('register success!')
                registerModal.onClose()
            })
            .catch((error) => {
                toast.error('something went wrong')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }
    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='welcome' subtitle='create an account' />
            <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required />
            <Input id='name' label='Name' disabled={isLoading} register={register} errors={errors} required />
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
                    <div>Already have an account?</div>
                    <div onClick={toggle} className='text-neutral-800 cursor-pointer hover:underline'>
                        Login
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title='Register'
            actionLabel='Continue'
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal

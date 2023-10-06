'use client'
import React, { useState } from 'react'
import c from './Login.module.scss'
import classNames from 'classnames'
import Input from '../../../src/components/Input/Input'
import { useFormik } from 'formik'
import Link from 'next/link'
import Button from '../../../src/components/Button/Button'
import { useRouter } from 'next/navigation'
import * as Yup from 'yup'
import useAuthStore from '../../../src/stores/useAuthStore'
import { useMutation } from '@apollo/client'
import { LOGIN, LoginInput, LoginResponse } from '../../../src/graphql/login'
import { errorAlert, successAlert } from '../../../src/utils/alerts'
import { RootURLsEnum } from '../../../src/config/constants'
import Cookies from 'js-cookie'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

const page: React.FC = () => {
    const setUserData = useAuthStore((state) => state.setUserData)
    const router = useRouter()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [login] = useMutation<LoginResponse, LoginInput>(LOGIN)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Email is required').email(),
            password: Yup.string()
                .required('Password is required')
                .min(8, 'Password must be at least 8 characters'),
        }),
        onSubmit: async ({ email, password }) => {
            try {
                const { data, errors } = await login({
                    variables: {
                        email,
                        password,
                    },
                })

                if (!data || errors) return errorAlert()
                setUserData(data.login.user)
                Cookies.set('token', data.login.token, {
                    expires: 14,
                })
                successAlert('Login success!')
                router.push(data.login.user.role === 'SUPPLIER' ? RootURLsEnum.homepage : RootURLsEnum.search)
            } catch (err) {
                errorAlert(err)
            }
        },
    })

    return (
        <main className={classNames(c.main, 'filtered_image_container')}>
            <Image
                className={c.bg}
                src='/assets/login-yacht.png'
                alt='Yacht background'
                height={2000} width={4000}
            />
            <form onSubmit={formik.handleSubmit} className={c.block}>
                <h1>Log In</h1>
                <div className={c.container}>
                    <Input
                        type='email'
                        name='email'
                        placehodler='hello@yachtease.co'
                        labelText='Email Address'
                        formik={formik}
                    />
                    <Input
                        type={isPasswordVisible ? 'string' : 'password'}
                        name='password'
                        placehodler='Password'
                        labelText='Your password'
                        formik={formik}
                    >
                        <Image width={24} height={24}
                            onClick={() => setIsPasswordVisible((p) => !p)}
                            src={
                                !isPasswordVisible
                                    ? '/assets/eye-off.svg'
                                    : '/assets/eye-opened.svg'
                            }
                            alt='eye-off.svg'
                            className={c.eye}
                        />
                    </Input>
                </div>
                <Button text='Log In' className={c.btn} type='submit' />
                <Link href={RootURLsEnum.forgot} className={c.message}>
                    Forgot Password?
                </Link>
                <div className={c.border}>
                    <div className={c.with}>Sign in with:</div>
                    <div className={c.icons}>
                        <Image width={35} height={35}
                            src='/assets/facebook.png'
                            alt='Facebook'
                            onClick={() =>
                                signIn('facebook', {
                                    redirect: false,
                                })
                            }
                        />
                        <Image width={35} height={35}
                            src='/assets/google.png'
                            alt='Google'
                            onClick={() =>
                                signIn('google', {
                                    redirect: false,
                                })
                            }
                        />
                        <Image width={35} height={35}
                            src='/assets/apple.svg'
                            alt='Apple'
                            onClick={() =>
                                signIn('apple', {
                                    redirect: false,
                                })
                            }
                        />
                    </div>
                </div>
                <Link href={RootURLsEnum.registerChoose} className={c.new}>
                    Create New Account
                </Link>
            </form>
        </main>
    )
}

export default page

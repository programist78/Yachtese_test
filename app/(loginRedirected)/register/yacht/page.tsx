'use client'
import { Metadata } from 'next'
import React, { useState } from 'react'
import c from './Yacht.module.scss'
import classNames from 'classnames'
import Input, { Select } from '../../../../src/components/Input/Input'
import { useFormik } from 'formik'
import Link from 'next/link'
import Button from '../../../../src/components/Button/Button'
import { useMutation } from '@apollo/client'
import {
    REGISTER_USER_MUTATION,
    registerUserMutationInput,
    registerUserMutationResponse,
} from '../../../../src/graphql/signUp'
import {
    RootURLsEnum,
    UserRoles,
    UserRolesType,
} from '../../../../src/config/constants'
import { useRouter } from 'next/navigation'
import * as Yup from 'yup'
import { errorAlert, successAlert } from '../../../../src/utils/alerts'
import useAuthStore from '../../../../src/stores/useAuthStore'
import Cookies from 'js-cookie'
import Image from 'next/image'


const page: React.FC = () => {
    const [singUp] = useMutation<registerUserMutationResponse, registerUserMutationInput>(REGISTER_USER_MUTATION)

    const setUserData = useAuthStore((state) => state.setUserData)
    const router = useRouter()
    const [role, setRole] = useState<UserRolesType>('YACHT')

    const formik = useFormik({
        initialValues: {
            fleet: '',
            member: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            fleet: Yup.string()
                .min(3, 'Yacht fleet must be at least 3 characters')
                .required('Yacht fleet is required'),
            member: Yup.string()
                .required('Crew member mame is required')
                .min(3, 'Crew member name must be at least 3 characters'),
            email: Yup.string().required('Email is required').email(),
            password: Yup.string()
                .required('Password is required')
                .min(8, 'Password must be at least 8 characters'),
        }),
        onSubmit: async (values) => {
            singUp({
                variables: {
                    registerUserInput: {
                        email: values.email,
                        role: role,
                        companyName: values.fleet,
                        userName: values.member,
                        password: values.password,
                    },
                },
            })
                .then(({ data }) => {
                    setUserData(data.registerUser.user)
                    Cookies.set('token', data.registerUser.token, {
                        expires: 14,
                    })
                    successAlert('Registration succes')
                    router.push(RootURLsEnum.subscription)
                })
                .catch((err) => {
                    errorAlert(err)
                })
        },
    })

    return (
        <main className={classNames(c.main, 'filtered_image_container')}>
            <Image src='/assets/register-yacht.png' alt='Yacht background' width={4000} height={2000} />
            <form onSubmit={formik.handleSubmit} className={c.block}>
                <h1>Yachts Registration</h1>
                <div className={c.container}>
                    <Input
                        type='string'
                        name='fleet'
                        placehodler='Yachtease'
                        labelText='Yacht'
                        formik={formik}
                    />
                    <Input
                        type='string'
                        name='member'
                        placehodler='John Doe'
                        labelText='Crew Member Name'
                        formik={formik}
                    />
                    <Select
                        labelText='Yacht Structure'
                        setValue={setRole}
                        value={role}
                    >
                        <option key={UserRoles.YACHT} value={UserRoles.YACHT}>
                            Yacht
                        </option>
                        <option key={UserRoles.YACHT_BUSINESS} value={UserRoles.YACHT_BUSINESS}>
                            Yacht Fleet
                        </option>
                        <option key={UserRoles.YACHT_TEAMMATE} value={UserRoles.YACHT_TEAMMATE}>
                            Yacht Teammate
                        </option>
                    </Select>
                    <Input
                        type='email'
                        name='email'
                        placehodler='hello@yachtease.co'
                        labelText='Address'
                        formik={formik}
                    />
                    <Input
                        type='password'
                        name='password'
                        placehodler='Password'
                        labelText='Your password'
                        formik={formik}
                    />
                </div>
                <div className={c.description}>
                    By creating an account, you agree with Conditions of Use and
                    Privacy Policy
                </div>
                <Link href={process.env.NEXT_PUBLIC_MESSAGE_US} className={c.message}>
                    Message Us!
                </Link>
                <Button text='Sign Up' className={c.btn} type='submit' />
            </form>
        </main>
    )
}

export default page

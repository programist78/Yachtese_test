'use client'
import React, { useState } from 'react'
import c from './Forgot.module.scss'
import { useFormik } from 'formik'
import Input from '../../../src/components/Input/Input'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import {
    SEND_LINK,
    sendPasswordLinkInput,
    sendPasswordLinkResponse,
} from '../../../src/graphql/sendLinkToRestorePassword'
import { errorAlert, successAlert } from '../../../src/utils/alerts'
import { useRouter } from 'next/navigation'
import { RootURLsEnum } from '../../../src/config/constants'
import Image from 'next/image'

const page: React.FC = () => {
    const [sendLink] = useMutation<
        sendPasswordLinkResponse,
        sendPasswordLinkInput
    >(SEND_LINK)

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("It's not like email")
                .required('Email is required'),
        }),
        onSubmit: ({ email }) => {
            setIsLoading(true)
            sendLink({
                variables: {
                    email,
                },
            })
                .then(({ data }) => {
                    successAlert(data.resetPassword.message)
                    setIsLoading(false)
                    router.push(RootURLsEnum.homepage)
                })
                .catch(() => {
                    errorAlert()
                    setIsLoading(false)
                })
        },
    })

    return (
        <main
            style={{ position: 'relative' }}
            className={`${c.main} filtered_image_container`}
        >
            <Image src='/assets/forgot.webp' alt='Background' width={3680} height={2456} />
            <article className={c.block}>
                <h1 className={c.title}>Forgot Password</h1>
                <form
                    onSubmit={formik.handleSubmit}
                    className={c.form}
                    style={isLoading ? { opacity: 0.5 } : {}}
                >
                    <Input
                        formik={formik}
                        name='email'
                        labelText='Email Adress'
                        placehodler='hello@yachtease.co'
                        type='email'
                    />
                    <p>We have sent you the code to your Email.</p>
                    <button
                        type='submit'
                        className={c.btn}
                        disabled={isLoading}
                    >
                        Send
                    </button>
                </form>
            </article>
        </main>
    )
}

export default page

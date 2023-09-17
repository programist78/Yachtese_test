'use client'
import { useParams, useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import c from './Reset.module.scss'
import { useFormik } from 'formik'
import Input from '../../../../src/components/Input/Input'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { RESET_PASSWORD, resetPasswordInput, resetPasswordResponse } from '../../../../src/graphql/resetPassword'
import { errorAlert, successAlert } from '../../../../src/utils/alerts'
import { RootURLsEnum } from '../../../../src/config/constants'
import Image from 'next/image'

const page: FC = () => {
    const { token } = useParams()
    const router = useRouter()
    const [resetPassword] = useMutation<resetPasswordResponse, resetPasswordInput>(RESET_PASSWORD)

    const [isLoading, setIsLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            password: '',
            password2: ''
        },
        validationSchema: Yup.object({
            password: Yup.string().required('Required').min(8, 'Minimum 8 characters'),
            password2: Yup.string().required('Required').min(8, 'Minimum 8 characters').oneOf([Yup.ref('password'), null], 'Passwod must match')
        }),
        onSubmit: (values) => {
            setIsLoading(true)
            resetPassword({
                variables: {
                    setPasswordInput: {
                        password:values.password,
                        token: Array.isArray(token) ? token[0] : token
                    }
                }
            }).then(({data}) => {
                successAlert(data.setNewPassword.message)
                setIsLoading(false)
                router.push(RootURLsEnum.login)
            }).catch(() => {
                errorAlert()
                setIsLoading(false)
            })
        }
    })

    return (
        <main
            style={{ position: 'relative' }}
            className={`${c.main} filtered_image_container`}
        >
            <Image src='/assets/forgot.webp' alt='Background' width={4000} height={2000} />
            <article className={c.block}>
                <h1 className={c.title}>Forgot Password</h1>
                <p className={c.descr}>Come up with a new password</p>
                <form
                    onSubmit={formik.handleSubmit}
                    className={c.form}
                    style={isLoading ? { opacity: 0.5 } : {}}
                >
                    <Input
                        formik={formik}
                        name='password'
                        labelText='New Password'
                        placehodler='********'
                        type='password'
                    />
                    <Input
                        formik={formik}
                        name='password2'
                        labelText='Repeat Password'
                        placehodler='********'
                        type='password'
                    />
                    <p>We have sent you the code to your Email.</p>
                    <button
                        type='submit'
                        className={c.btn}
                        disabled={isLoading}
                    >
                        Reset
                    </button>
                </form>
            </article>
        </main>
    )
}

export default page

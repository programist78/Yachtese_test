'use client'
import React from 'react'
import c from './Supplier.module.scss'
import classNames from 'classnames'
import Input from '../../../../src/components/Input/Input'
import { useFormik } from 'formik'
import Link from 'next/link'
import Button from '../../../../src/components/Button/Button'
import { useMutation } from '@apollo/client'
import { REGISTER_USER_MUTATION, registerUserMutationInput, registerUserMutationResponse } from '../../../../src/graphql/signUp'
import { RootURLsEnum, UserRoles } from '../../../../src/config/constants'
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

  const formik = useFormik({
    initialValues: {
      company: '',
      name: '',
      number: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      company: Yup.string().min(3, 'Company name must be at least 3 characters').required('Company name is required'),
      name: Yup.string().required('Contact name is required').min(3, 'Contact name must be at least 3 characters'),
      number: Yup.string().required('Phone number is required').matches(/^\+\d{1,}(\d{10})$/, 'The phone number must be in the format +XXXXXXXXXXXX').max(13, 'Too long'),
      email: Yup.string().required('Email is required').email(),
      password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters')
    }),
    onSubmit: async (values) => {
      singUp({
        variables: {
          registerUserInput: {
            email: values.email,
            role: UserRoles.SUPPLIER,
            companyName: values.company,
            userName: values.name,
            password: values.password,
            contactInfo: {
              name: 'Phone number',
              link: values.number
            }
          }
        }
      }).then(({data}) => {
        setUserData(data.registerUser.user)
        Cookies.set('token', data.registerUser.token,{ expires: 14 })
        successAlert('Registration succes')
        router.push(RootURLsEnum.homepage)
      }).catch((err) => {
        errorAlert(err)
      })
    }
  })

  return <main className={classNames(c.main, 'filtered_image_container')}>
    <Image src='/assets/register-supplier.png' alt='Supplier background' width={4000} height={2000} />
    <form onSubmit={formik.handleSubmit} className={c.block}>
      <h1>Suppliers Registration</h1>
      <div className={c.container}>
        <Input type='string' name='company' placehodler='Happy Yacht Co.' labelText='Suppliers Company Name' formik={formik} />
        <Input type='string' name='name' placehodler='John Doe' labelText='Company Contact Person' formik={formik} />
        <Input type='string' name='number' placehodler='+1234567890' labelText='Contact Number' formik={formik} />
        <Input type='email' name='email' placehodler='hello@yachtease.co' labelText='Address' formik={formik} />
        <Input type='password' name='password' placehodler='Password' labelText='Your password' formik={formik} />
      </div>
      <div className={c.description}>By creating an account, you agree with Conditions of Use and Privacy Policy</div>
      <Link href={process.env.NEXT_PUBLIC_MESSAGE_US} className={c.message}>Message Us!</Link>
      <Button text='Sign Up' className={c.btn} type='submit' />
    </form>
  </main>
}

export default page
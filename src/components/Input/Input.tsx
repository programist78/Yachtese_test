import React, { Dispatch, SetStateAction } from 'react'
import c from './Input.module.scss'
import Image from 'next/image'

export interface Props {
    formik: any
    name: string
    placehodler: string
    labelText: string
    type: 'string' | 'password' | 'email'
    children?: React.ReactNode
}

const Input: React.FC<Props> = ({
    formik,
    name,
    placehodler,
    labelText,
    type,
    children,
}) => {
    return (
        <div className={c.main}>
            <label htmlFor={name}>{labelText}</label>
            <input
                className={
                    formik.errors[name] && formik.touched[name]
                        ? c.err_input
                        : c.input
                }
                type={type}
                id={name}
                name={name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values[name]}
                placeholder={
                    formik.errors[name] && formik.touched[name]
                        ? formik.errors[name]
                        : placehodler
                }
            />
            {children}
        </div>
    )
}

interface SelectProps {
    children: React.ReactNode
    setValue: Dispatch<SetStateAction<any>>
    value: string
    labelText: string
}

export const Select: React.FC<SelectProps> = ({
    children,
    setValue,
    value,
    labelText,
}) => {
    return (
        <div className={c.main}>
            <label>{labelText}</label>
            <select onChange={(e) => setValue(e.target.value)} value={value}>
                {children}
            </select>
            <Image src='/assets/arrow-select.svg' alt='Arrow down' height={24} width={24} className={c.arrow} />
        </div>
    )
}

export default Input

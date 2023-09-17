import React from 'react'
import c from './EditIcon.module.scss'
import Image from 'next/image'

export interface Props {
    onClick:(e:React.MouseEvent<HTMLImageElement, MouseEvent>) => any
    isOn: boolean
    className?: string
}

const EditIcon: React.FC<Props> = ({onClick, isOn, className}) => {
    return <Image width={30} height={30} className={`${c.icon} ${className}`} src={isOn ? '/assets/checkmark.svg' : '/assets/edit-icon.svg'} alt='Edit icon' title={isOn ? 'Completed' : 'Edit'} onClick={onClick} />
}

export default EditIcon
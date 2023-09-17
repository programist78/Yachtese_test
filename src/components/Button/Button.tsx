import React from 'react'
import c from './Button.module.scss'
import classNames from 'classnames'
import Link from 'next/link'

interface Props {
    text: string
    className?: string
    onClick?: () => void
    href?: string
    type?: 'submit' | 'button' | 'reset'
}

const Button: React.FC<Props> = ({ text, className, onClick, href, type }) => {

    if (href) return <Link href={href} className={className ? classNames(c.main, className) : classNames(c.main)} onClick={onClick}>
        {text}
    </Link>

    return <button type={type} className={className ? classNames(c.main, className) : classNames(c.main)} onClick={onClick}>
        {text}
    </button>
}

export default Button

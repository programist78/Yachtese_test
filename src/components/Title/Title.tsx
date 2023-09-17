import React, { ReactNode } from 'react'
import localFont from 'next/font/local'
import classNames from 'classnames'
import c from './Title.module.scss'


const font = localFont({src: '../../../public/fonts/SignaturexDemoRegular.ttf'})

export interface Props {
    text?:string
    className?: string
    children?: ReactNode
}

const Title: React.FC<Props> = ({text, className, children}) => {
        return <h1 className={className ? classNames(className, c.main) : c.main} style={font.style}>{children ? children :text}</h1>
    }

export default Title

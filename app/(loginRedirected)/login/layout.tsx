import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
    title: 'Login'
}

const layout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return children
}

export default layout

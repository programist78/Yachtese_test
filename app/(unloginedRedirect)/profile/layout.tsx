import { Metadata } from 'next'
import { PropsWithChildren, FC } from 'react'

export const metadata:Metadata = {
    title: 'Your profile'
}

const layout: FC<PropsWithChildren> = ({children}) => {
    return children
  }

export default layout

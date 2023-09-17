import { FC, PropsWithChildren } from 'react'
import c from './Messages.module.scss'

const layout: FC<PropsWithChildren> = ({ children }) => {
    return <main className={`${c.main} container`}>
        {children}
    </main>
}

export default layout

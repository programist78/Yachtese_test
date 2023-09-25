import { FC, PropsWithChildren } from 'react'
import Footer from '../../src/components/Footer/Footer'

const layout: FC<PropsWithChildren> = ({ children }) => {
    return <div className='main'>
        {children}
        <Footer />
    </div>
}

export default layout
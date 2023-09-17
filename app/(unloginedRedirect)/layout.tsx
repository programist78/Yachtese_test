import React, { PropsWithChildren } from 'react'
import { UnloginRedirect } from '../../src/utils/authRedirect'
import Footer from '../../src/components/Footer/Footer'


const layout: React.FC<PropsWithChildren> = ({ children }) => {
    return <div className='main'>
        <UnloginRedirect>
            {children}
            <Footer />
        </UnloginRedirect>
    </div>
}

export default layout

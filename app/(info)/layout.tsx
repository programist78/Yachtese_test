import React from 'react'
import Footer from '../../src/components/Footer/Footer'


const layout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <div className='main'>
        {children}
        <Footer />
    </div>
}

export default layout
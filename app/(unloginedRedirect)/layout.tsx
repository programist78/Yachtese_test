import React, { PropsWithChildren } from 'react'
import { UnloginRedirect } from '../../src/utils/authRedirect'
import Footer from '../../src/components/Footer/Footer'
import Script from 'next/script'


const layout: React.FC<PropsWithChildren> = ({ children}) => {
    return <div className='main'>
        <UnloginRedirect>
        <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`}
        type='text/javascript'
      />
            {children}
            <Footer />
        </UnloginRedirect>
    </div>
}

export default layout

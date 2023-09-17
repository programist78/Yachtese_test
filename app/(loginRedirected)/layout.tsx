import React from 'react'
import AuthRedirect from '../../src/utils/authRedirect'

const layout: React.FC<React.PropsWithChildren> = ({ children }) => {

    return <AuthRedirect>{children}</AuthRedirect>

}

export default layout
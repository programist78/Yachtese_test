'use client'
import { useLayoutEffect } from 'react'
import useAuthStore from '../stores/useAuthStore'
import { useRouter } from 'next/navigation'
import { RootURLsEnum } from '../config/constants'

const LoginedRedirect:React.FC<React.PropsWithChildren> = ({children}) => {

    const isLogined = useAuthStore((state) => state.isLogined)
    const router = useRouter()

    useLayoutEffect(() => {
        if(isLogined) return router.replace(RootURLsEnum.homepage)
    }, [isLogined, router])

    return children
}

export const UnloginRedirect:React.FC<React.PropsWithChildren> = ({children}) => {

    const isLogined = useAuthStore((state) => state.isLogined)
    const router = useRouter()

    useLayoutEffect(() => {
        if(!isLogined) return router.replace(RootURLsEnum.homepage)
    }, [isLogined, router])

    if(!isLogined) return null

    return children
}

export const SubscriptionRedirect:React.FC<React.PropsWithChildren> = ({children}) => {

    const userData = useAuthStore((state) => state.userData)
    const router = useRouter()

    useLayoutEffect(() => {
        if(!userData.subscription.status && userData.role !== 'YACHT_TEAMMATE' && userData.role !== 'ADMIN') return router.replace(RootURLsEnum.subscription)
    }, [userData, router])

    if(!userData.subscription && userData.role !== 'YACHT_TEAMMATE' && userData.role !== 'ADMIN') return null

    return children
}

export default LoginedRedirect
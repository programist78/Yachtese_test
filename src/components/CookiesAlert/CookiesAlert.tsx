'use client'
import React, { useEffect, useState } from 'react'
import c from './Alert.module.scss'
import classNames from 'classnames'

const CookiesAlert: React.FC = () => {

    const [isShowed, setIsShowed] = useState<null | string>()
    const [isLoading, setIsLoading] = useState(true)
    

    useEffect(() => {
        if(!window) {
            setIsLoading(true)
            
            return
        }
        setIsShowed(window.localStorage.getItem('isShowedCookies'))
        setIsLoading(false)
    }, [])
    
    if(isShowed || isLoading) return null

    return <div className={c.main}>
        <div className={c.alert}>
            <div className={classNames('container', c.con)}>
                <div className={c.texts}>
                    <h4>We Use Coockies!</h4>
                    <span>
                        Yachtease uses cookies to enhance your browsing experience and provide personalized content.
                    </span>
                </div>
                <div className={c.btns}>
                    <button onClick={() => {
                        window.localStorage.setItem('isShowedCookies', 'showed')
                        setIsShowed('showed')
                    }}>Accept</button>
                </div>
            </div>
        </div>
    </div>
}

export default CookiesAlert

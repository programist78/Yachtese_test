'use client'
import { FC } from 'react'
import c from './Messages.module.scss'
import Image from 'next/image'
import ChatList from '../../../src/components/ChatList/ChatList'


const page: FC = () => {

    return <>
        <article className={`${c.left} block`}>
            <ChatList />
        </article>
        <article className={`${c.right} block ${c.empty_con} ${c.mobile_hidden}`}>
            <Image src='/assets/select-chat.svg' alt='Select Chat' width={175} height={200} />
            <h2 className={c.empty_title}>Select a chat for correspondence</h2>
            <span className={c.empty_description}>Please, select chat</span>
        </article>
    </>
}

export default page
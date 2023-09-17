'use client'
import { FC, FormEvent, useEffect, useRef, useState } from 'react'
import styles from '../Messages.module.scss'
import c from './MessagesList.module.scss'
import useMessagesStore from '../../../../src/stores/useMessagesStore'
import ImageError from '../../../../src/utils/ImageError'
import { useMutation } from '@apollo/client'
import {
    SEND_MESSAGE,
    sendMessageInput,
    sendMessageResponse,
} from '../../../../src/graphql/sendMessage'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { RootURLsEnum } from '../../../../src/config/constants'
import useAuthStore from '../../../../src/stores/useAuthStore'
import { useRouter } from 'next/navigation'
import OfferPopup from '../../../../src/components/OfferPopup/OfferPopup'
import useOfferPopupStore from '../../../../src/stores/useOfferPopupStore'
import ChatList from '../../../../src/components/ChatList/ChatList'
import { errorAlert } from '../../../../src/utils/alerts'

const formatDate = (dateString: string): string => {
    const date = new Date(dateString)

    const hours = date.getHours()
    const minutes = date.getMinutes()

    const amOrPm = hours >= 12 ? 'pm' : 'am'

    let formattedHours = hours % 12

    if (formattedHours === 0) {
        formattedHours = 12
    }

    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes

    const formattedTime = formattedHours + ':' + formattedMinutes + ' ' + amOrPm

    return formattedTime
}

const page: FC = () => {
    const [sendMessage] = useMutation<sendMessageResponse, sendMessageInput>(
        SEND_MESSAGE,
    )
    const params = useParams()
    const router = useRouter()
    const messagesContainerRef = useRef(null)

    const messages = useMessagesStore((state) => state.messagesList)
    const addMessage = useMessagesStore((state) => state.addMessage)
    const removeLastMessage = useMessagesStore((state) => state.removeLastMessage)
    const setSelectedChatId = useMessagesStore((state) => state.setSelectedChatId)
    const selectedUser = useMessagesStore((state) => state.selectedUser)
    const userData = useAuthStore((state) => state.userData)
    const setUserData = useAuthStore((state) => state.setUserData)
    const setOfferMenuIsOpen = useOfferPopupStore((state) => state.setIsOpened)

    const [input, setInput] = useState('')

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!input) return

        addMessage({
            createdAt: new Date().toString(),
            message: input,
            user: {
                _id: userData._id,
                avatarURL: userData.avatarURL,
                userName: userData.userName,
                createdAt: userData.createdAt,
                role: userData.role
            },
        })
        setInput('')

        if (params.id.includes('new')) {
            //@ts-ignore
            const userId = params.id.replace('new', '')

            const existingChat = userData.chats.find((userObject) => {
                return Object.values(userObject).some(
                    (user) => user._id === userId,
                )
            })

            if (existingChat) {
                sendMessage({
                    variables: {
                        postMessageInput: {
                            message: input,
                            chatId: existingChat._id,
                        },
                    },
                }).then(({ data }) => {
                    if (!data) {
                        removeLastMessage()
                        errorAlert()
                    }
                }).catch(() => {
                    removeLastMessage()
                    errorAlert()
                })

                return
            }

            sendMessage({
                variables: {
                    postMessageInput: {
                        message: input,
                        userId: userId,
                    },
                },
            }).then(({ data }) => {
                if (!data) {
                    removeLastMessage()

                    return errorAlert()
                }
                setUserData({
                    ...userData,
                    chats: [...userData.chats, data.postMessage],
                })
            }).catch(() => {
                removeLastMessage()
                errorAlert()
            })

            return
        }

        sendMessage({
            variables: {
                postMessageInput: {
                    chatId: `${params.id}`,
                    message: input,
                    userId: selectedUser._id,
                },
            },
        }).then(({ data }) => {
            if (!data) {
                removeLastMessage()
                errorAlert()
            }
        }).catch(() => {
            removeLastMessage()
            errorAlert()
        })
    }

    useEffect(() => {
        messagesContainerRef.current.scrollTop =
            messagesContainerRef.current.scrollHeight
    }, [messages])

    useEffect(() => {
        //@ts-ignore
        const userId = params.id.replace('new', '')

        const existingChat = userData.chats.find((userObject) => {
            return Object.values(userObject).some((user) => user._id === userId)
        })

        const existingFavChat = userData.favoriteChats.find((userObject) => {
            return Object.values(userObject).some((user) => user._id === userId)
        })

        if (existingChat) router.replace(`${RootURLsEnum.messages}/${existingChat._id}`)
        if (existingFavChat) router.replace(`${RootURLsEnum.messages}/${existingFavChat._id}`)

        return () => setSelectedChatId(null)
    }, [])

    return (<>
        <article className={`${c.left} block ${c.mobile_hidden}`}>
            <ChatList />
        </article>
        <article className={`${c.right} block ${c.main}`}>
            <div className={c.top}>
                <ImageError
                    src={selectedUser.avatarURL}
                    alt={selectedUser.userName}
                />
                <div>
                    <h3 className={c.top_username}>{selectedUser.userName}</h3>
                    <span>Online</span>
                </div>
            </div>
            <div className={c.main_messages}>
                <div className={c.meessages_container}>
                    <div className={c.messages} ref={messagesContainerRef}>
                        {messages.map((item) => (
                            <div
                                key={item.createdAt}
                                className={
                                    item.user._id === userData._id
                                        ? c.your_message
                                        : c.message
                                }>
                                <div className={c.left_message}>
                                    <ImageError
                                        src={item.user.avatarURL}
                                        alt={item.user.userName}
                                        className={c.message_image}
                                    />
                                </div>
                                <div className={c.message_right}>
                                    <div className={c.message_top}>
                                        <h5>{item.user.userName}</h5>
                                        <h6>{formatDate(item.createdAt)}</h6>
                                    </div>
                                    <div className={c.message_content}>
                                        {item.message}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <form className={c.input} onSubmit={handleSubmit}>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type='submit'>Send</button>
                    </form>
                </div>
                <aside className={c.sidebar}>
                    <div className={c.side_image}>
                        <ImageError
                            src={selectedUser.avatarURL}
                            alt={selectedUser.userName}
                        />
                    </div>
                    <h2 className={c.side_username}>{selectedUser.userName}</h2>
                    <div className={c.side_btns}>
                        <button
                            className={c.offer}
                            onClick={() => setOfferMenuIsOpen(true)}>
                            Create an Offer
                        </button>
                        <Link
                            href={selectedUser.role === 'SUPPLIER' ? `${RootURLsEnum.supplier}/${selectedUser._id}` : `${RootURLsEnum.yacht}/${selectedUser._id}`}
                            className={c.profile}>
                            See profile instead of:
                        </Link>
                    </div>
                </aside>
            </div>
            <OfferPopup />
        </article>
    </>
    )
}

export default page

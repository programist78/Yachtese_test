'use client'
import { FC, FormEvent, useEffect, useRef, useState } from 'react'
import c from './MessagesList.module.scss'
import useMessagesStore from '../../../../src/stores/useMessagesStore'
import ImageError from '../../../../src/utils/ImageError'
import { gql, useMutation } from '@apollo/client'
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
import { errorAlert, successAlert } from '../../../../src/utils/alerts'

const page: FC = () => {
    const params = useParams()
    const router = useRouter()
    const setSelectedChatId = useMessagesStore((state) => state.setSelectedChatId)
    const selectedUser = useMessagesStore((state) => state.selectedUser)
    const userData = useAuthStore((state) => state.userData)
    const setOfferMenuIsOpen = useOfferPopupStore((state) => state.setIsOpened)
    const offers = useMessagesStore((state) => state.offerData)
    const [isOfferViewOpened, setIsOfferViewOpened] = useState(false)

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
    }, [params.id, router, userData.chats, setSelectedChatId, userData.favoriteChats])

    return (<>
        <article className={`${c.left} block ${c.mobile_hidden}`}>
            <ChatList />
        </article>
        <article className={`${c.right} block ${c.main}`}>
            <div className={c.top}>
                <ImageError onClick={() => router.push(selectedUser.role === 'SUPPLIER' ? `${RootURLsEnum.supplier}/${selectedUser._id}` : `${RootURLsEnum.yacht}/${selectedUser._id}`)}
                    src={selectedUser.avatarURL}
                    alt={selectedUser.userName}
                />
                <div>
                    <h3 className={c.top_username} onClick={() => router.push(selectedUser.role === 'SUPPLIER' ? `${RootURLsEnum.supplier}/${selectedUser._id}` : `${RootURLsEnum.yacht}/${selectedUser._id}`)}>{selectedUser.userName}</h3>
                </div>
            </div>
            <div className={c.main_messages}>
                <div className={c.meessages_container}>
                    <MessagesList />
                    <Form />
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
            {offers && offers[0] && <div className={c.offer_pop} onClick={() => setIsOfferViewOpened(true)}>
                New Offer!
            </div>}
            <OfferView setIsOfferViewOpened={setIsOfferViewOpened} isOfferViewOpened={isOfferViewOpened} />
            <OfferPopup />
            <div className={c.add_offer_mobile} onClick={() => setOfferMenuIsOpen(true)}>+</div>
        </article>
    </>
    )
}

const MessagesList: FC = () => {

    const messagesContainerRef = useRef(null)
    const userData = useAuthStore((state) => state.userData)
    const messages = useMessagesStore((state) => state.messagesList)

    const List = messages.map((item) => (
        <div key={item.createdAt} className={item.user._id === userData._id ? c.your_message : c.message}>
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
                </div>
                <div className={c.message_content}>
                    {item.message}
                </div>
            </div>
        </div>
    ))

    useEffect(() => {
        messagesContainerRef.current.scrollTop =
            messagesContainerRef.current.scrollHeight
    }, [messages])

    return <div className={c.messages} ref={messagesContainerRef}>
        {List}
    </div>
}

const Form: FC = () => {
    const [sendMessage] = useMutation<sendMessageResponse, sendMessageInput>(SEND_MESSAGE)

    const [input, setInput] = useState('')
    const addMessage = useMessagesStore((state) => state.addMessage)
    const removeLastMessage = useMessagesStore((state) => state.removeLastMessage)
    const selectedUser = useMessagesStore((state) => state.selectedUser)
    const userData = useAuthStore((state) => state.userData)
    const setUserData = useAuthStore((state) => state.setUserData)
    const params = useParams()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!input) return

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

    return <form className={c.input} onSubmit={handleSubmit}>
        <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
        />
        <button type='submit'>Send</button>
    </form>
}

const OfferView: FC<{setIsOfferViewOpened:any, isOfferViewOpened:boolean}> = ({setIsOfferViewOpened, isOfferViewOpened}) => {

    const offers = useMessagesStore((state) => state.offerData)
    const deleteFirstOffer = useMessagesStore((state) => state.deleteFirstOffer)
    const [submitOffer] = useMutation(gql`
    mutation AnswerOffer($answerOfferInput: AnswerOfferInput) {
        answerOffer(answerOfferInput: $answerOfferInput) {
            link
        }
    }
    `)

    return isOfferViewOpened && offers.length > 0 && <div onClick={() => setIsOfferViewOpened(false)} className={c.backdrop}>
        <div className={c.block} onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
        }}>
            <h2>{offers[0].title}</h2>
            <p className={c.offer_descr}>{offers[0].description}</p>
            {offers[0].services.map((item) =><p className={c.offer_services} key={item}>{item}</p>)}
            {offers[0].fileUrl && <div className={c.file_svg}><svg onClick={() => window.open(offers[0].fileUrl[0], '_blank')} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                <path d="M 7 2 L 7 48 L 43 48 L 43 14.59375 L 42.71875 14.28125 L 30.71875 2.28125 L 30.40625 2 Z M 9 4 L 29 4 L 29 16 L 41 16 L 41 46 L 9 46 Z M 31 5.4375 L 39.5625 14 L 31 14 Z"></path>
            </svg>
            <span onClick={() => window.open(offers[0].fileUrl[0], '_blank')}>Click to download</span>
            </div>}
            <button className={c.offer_accept} onClick={() => {
                submitOffer({
                    variables: {
                        answerOfferInput: {
                            offerId: offers[0]._id,
                            answer: true
                          }
                    }
                }).then(() => {
                    successAlert('Offer submitted!')
                    setIsOfferViewOpened(false)
                    deleteFirstOffer()
                }).catch(() => {
                    errorAlert()
                })
            }}>Accept</button>
        </div>
    </div>
}

export default page

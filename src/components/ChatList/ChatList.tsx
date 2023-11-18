'use client'
import React, { useState } from 'react'
import c from './ChatList.module.scss'
import useAuthStore from '../../stores/useAuthStore'
import { RootURLsEnum } from '../../config/constants'
import Link from 'next/link'
import ImageError from '../../utils/ImageError'
import { useMutation } from '@apollo/client'
import {
    ADD_CHAT_TO_FAVORITE,
    addToFavoriteChatsInput,
    addToFavoriteChatsResponse,
} from '../../graphql/addToFavoriteChats'
import {
    REMOVE_FROM_FAVORITE_CHATS,
    removeFromFavoriteChatsInput,
    removeFromFavoriteChatsResponse,
} from '../../graphql/removeFromFavoriteChats'

const ChatList: React.FC = () => {
    const [addToFavorite] = useMutation<
        addToFavoriteChatsResponse,
        addToFavoriteChatsInput
    >(ADD_CHAT_TO_FAVORITE)
    const [removeFromFavorite] = useMutation<
        removeFromFavoriteChatsResponse,
        removeFromFavoriteChatsInput
    >(REMOVE_FROM_FAVORITE_CHATS)

    const userData = useAuthStore((state) => state.userData)
    const setUserData = useAuthStore((state) => state.setUserData)

    const [filter, setFilter] = useState('')
    const [search, setSearch] = useState('')
    const [isSearchable, setIsSearchable] = useState(false)

    const filteredNew = [...userData.chats].sort(
        (a, b) =>
            new Date(b.lastMessage.created).getTime() -
            new Date(a.lastMessage.created).getTime(),
    )
    const filteredOld = [...userData.chats].sort(
        (a, b) =>
            new Date(a.lastMessage.created).getTime() -
            new Date(b.lastMessage.created).getTime(),
    )

    const filteredBySearch = userData.chats.filter((chat) => {
        if (chat.user_1._id === userData._id)
            return chat.user_2.userName
                .toLowerCase()
                .includes(search.toLowerCase())

        return chat.user_1.userName.toLowerCase().includes(search.toLowerCase())
    })

    const chats =
        filter === ''
            ? userData.chats
            : filter === 'new'
                ? filteredNew
                : filteredOld

    return (
        <div className={c.main}>
            {userData.chats.length > 0 || userData.favoriteChats.length > 0 ? <>
                {!isSearchable ? <div className={c.top}>
                    <div>
                        <select name='filter' value={filter} className={c.filter} onChange={(e) => setFilter(e.target.value)}>
                            <option value={'older'}>Older</option>
                            <option value={'new'}>New</option>
                            <option value={''}>
                                All Conversations
                            </option>
                        </select>
                    </div>
                    <svg className={c.search_icon} onClick={() => setIsSearchable(true)} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                        <path d='M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z' stroke='#737373' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                        <path d='M21.0004 21L16.6504 16.65' stroke='#737373' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                    </svg>
                </div> : <div className={c.top}>
                    <div className={c.search_con}>
                        <input className={c.search_input} value={search} onChange={(e) => setSearch(e.target.value)} placeholder='John Doe' />
                        <div className={c.close_search} onClick={() => setIsSearchable(false)}>
                            +
                        </div>
                    </div>
                </div>}
                {!isSearchable ? <>
                    {userData.favoriteChats.length > 0 && (
                        <div className={c.favorite_chats}>
                            {userData.favoriteChats.map((item) => <Link key={item._id} href={`${RootURLsEnum.messages}/${item._id}`} className={`${c.chat} ${!item.readStatus && c.unreaded}`}>
                                {item.user_1._id === userData._id ? <>
                                    <ImageError src={item.user_2.avatarURL} alt={item.user_2.userName} className={c.photo} />
                                    <div className={c.texts}>
                                        <div style={{ position: 'relative' }}>
                                            <h5 className={c.username}>{item.user_2.userName}</h5>
                                            <svg className={c.paperclip} onClick={(e) => {
                                                e.stopPropagation()
                                                e.preventDefault()
                                                removeFromFavorite({ variables: { id: item._id } }).then(() => {
                                                    setUserData({ ...userData, chats: [...userData.chats, item], favoriteChats: userData.favoriteChats.filter((chat) => chat._id !== item._id) })
                                                })
                                            }} width='19' height='19' viewBox='0 0 19 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                <g id='paperclip'>
                                                    <path id='Vector (Stroke)' fillRule='evenodd' clipRule='evenodd' d='M12.4925 1.89034C11.8621 1.89034 11.2576 2.14075 10.8119 2.58648L3.53644 9.86189C2.79362 10.6047 2.3763 11.6122 2.3763 12.6627C2.3763 13.7132 2.79362 14.7207 3.53644 15.4636C4.27927 16.2064 5.28676 16.6237 6.33728 16.6237C7.38779 16.6237 8.39528 16.2064 9.13811 15.4636L16.4135 8.18814C16.7227 7.87898 17.2239 7.87898 17.5331 8.18814C17.8423 8.49731 17.8423 8.99856 17.5331 9.30773L10.2577 16.5831C9.21794 17.6229 7.80772 18.207 6.33728 18.207C4.86684 18.207 3.45662 17.6229 2.41686 16.5831C1.3771 15.5434 0.792969 14.1332 0.792969 12.6627C0.792969 11.1923 1.3771 9.78207 2.41686 8.74231L9.69228 1.46689C10.4349 0.72423 11.4422 0.307007 12.4925 0.307007C13.5428 0.307007 14.55 0.72423 15.2927 1.46689C16.0354 2.20955 16.4526 3.21682 16.4526 4.2671C16.4526 5.31738 16.0354 6.32465 15.2927 7.06731L8.00936 14.3427C7.5638 14.7883 6.95948 15.0386 6.32936 15.0386C5.69924 15.0386 5.09492 14.7883 4.64936 14.3427C4.2038 13.8972 3.95348 13.2928 3.95348 12.6627C3.95348 12.0326 4.2038 11.4283 4.64936 10.9827L11.3709 4.26906C11.6803 3.96008 12.1815 3.96037 12.4905 4.26972C12.7995 4.57907 12.7992 5.08032 12.4899 5.38931L5.76894 12.1023C5.62052 12.2509 5.53681 12.4527 5.53681 12.6627C5.53681 12.8729 5.62031 13.0745 5.76894 13.2231C5.91758 13.3718 6.11916 13.4553 6.32936 13.4553C6.53956 13.4553 6.74114 13.3718 6.88978 13.2231L14.1731 5.94773C14.6186 5.50203 14.8692 4.89731 14.8692 4.2671C14.8692 3.63674 14.6188 3.03221 14.1731 2.58648C13.7274 2.14075 13.1228 1.89034 12.4925 1.89034Z' fill='#737373' />
                                                </g>
                                            </svg>
                                        </div>
                                        <span className={c.msg}>
                                            {item.lastMessage.user === userData._id ? `Me: ${item.lastMessage.message}` : item.lastMessage.message}
                                        </span>
                                    </div>
                                </> : <>
                                    <ImageError src={item.user_1.avatarURL} alt={item.user_1.userName} className={c.photo} />
                                    <div className={c.texts}>
                                        <h5 className={c.username}>
                                            {item.user_1.userName}
                                        </h5>
                                        <span className={c.msg}>
                                            {item.lastMessage.user === userData._id ? `Me: ${item.lastMessage.message}` : item.lastMessage.message}
                                        </span>
                                    </div>
                                </>}
                            </Link>)}
                        </div>
                    )}
                    <div className={c.chats}>
                        {chats.map((item) => <Link key={item._id} href={`${RootURLsEnum.messages}/${item._id}`} className={`${c.chat} ${!item.readStatus && c.unreaded}`}>
                            {item.user_1._id === userData._id ? <>
                                <ImageError src={item.user_2.avatarURL} alt={item.user_2.userName} className={c.photo} />
                                <div className={c.texts}>
                                    <div style={{ position: 'relative' }}>
                                        <h5 className={c.username}>
                                            {item.user_2.userName}
                                            <svg className={c.paperclip}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    e.preventDefault()
                                                    addToFavorite({ variables: { id: item._id } }).then(() => {
                                                        setUserData({ ...userData, chats: userData.chats.filter((chat) => chat._id !== item._id), favoriteChats: [...userData.favoriteChats, item] })
                                                    })
                                                }} width='19' height='19' viewBox='0 0 19 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                <g id='paperclip'>
                                                    <path id='Vector (Stroke)' fillRule='evenodd' clipRule='evenodd' d='M12.4925 1.89034C11.8621 1.89034 11.2576 2.14075 10.8119 2.58648L3.53644 9.86189C2.79362 10.6047 2.3763 11.6122 2.3763 12.6627C2.3763 13.7132 2.79362 14.7207 3.53644 15.4636C4.27927 16.2064 5.28676 16.6237 6.33728 16.6237C7.38779 16.6237 8.39528 16.2064 9.13811 15.4636L16.4135 8.18814C16.7227 7.87898 17.2239 7.87898 17.5331 8.18814C17.8423 8.49731 17.8423 8.99856 17.5331 9.30773L10.2577 16.5831C9.21794 17.6229 7.80772 18.207 6.33728 18.207C4.86684 18.207 3.45662 17.6229 2.41686 16.5831C1.3771 15.5434 0.792969 14.1332 0.792969 12.6627C0.792969 11.1923 1.3771 9.78207 2.41686 8.74231L9.69228 1.46689C10.4349 0.72423 11.4422 0.307007 12.4925 0.307007C13.5428 0.307007 14.55 0.72423 15.2927 1.46689C16.0354 2.20955 16.4526 3.21682 16.4526 4.2671C16.4526 5.31738 16.0354 6.32465 15.2927 7.06731L8.00936 14.3427C7.5638 14.7883 6.95948 15.0386 6.32936 15.0386C5.69924 15.0386 5.09492 14.7883 4.64936 14.3427C4.2038 13.8972 3.95348 13.2928 3.95348 12.6627C3.95348 12.0326 4.2038 11.4283 4.64936 10.9827L11.3709 4.26906C11.6803 3.96008 12.1815 3.96037 12.4905 4.26972C12.7995 4.57907 12.7992 5.08032 12.4899 5.38931L5.76894 12.1023C5.62052 12.2509 5.53681 12.4527 5.53681 12.6627C5.53681 12.8729 5.62031 13.0745 5.76894 13.2231C5.91758 13.3718 6.11916 13.4553 6.32936 13.4553C6.53956 13.4553 6.74114 13.3718 6.88978 13.2231L14.1731 5.94773C14.6186 5.50203 14.8692 4.89731 14.8692 4.2671C14.8692 3.63674 14.6188 3.03221 14.1731 2.58648C13.7274 2.14075 13.1228 1.89034 12.4925 1.89034Z' fill='#737373' />
                                                </g>
                                            </svg>
                                        </h5>
                                    </div>
                                    <span className={c.msg}>
                                        {item.lastMessage
                                            .user ===
                                            userData._id
                                            ? `Me: ${item.lastMessage.message}`
                                            : item
                                                .lastMessage
                                                .message}
                                    </span>
                                </div>
                            </> : <>
                                <ImageError src={item.user_1.avatarURL} alt={item.user_1.userName} className={c.photo}
                                />
                                <div className={c.texts}>
                                    <div style={{ position: 'relative' }}>
                                        <h5 className={c.username}>
                                            {item.user_1.userName}
                                            <svg className={c.paperclip}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    e.preventDefault()
                                                    addToFavorite(
                                                        {
                                                            variables:
                                                            {
                                                                id: item._id,
                                                            },
                                                        },
                                                    ).then(
                                                        ({
                                                            data,
                                                        }) => {
                                                            setUserData(
                                                                {
                                                                    ...userData,
                                                                    chats: userData.chats.filter(
                                                                        (
                                                                            chat,
                                                                        ) =>
                                                                            chat._id !==
                                                                            item._id,
                                                                    ),
                                                                    favoriteChats:
                                                                        [
                                                                            ...userData.favoriteChats,
                                                                            item,
                                                                        ],
                                                                },
                                                            )
                                                        },
                                                    )
                                                }} width='19' height='19' viewBox='0 0 19 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                <g id='paperclip'>
                                                    <path id='Vector (Stroke)' fillRule='evenodd' clipRule='evenodd' d='M12.4925 1.89034C11.8621 1.89034 11.2576 2.14075 10.8119 2.58648L3.53644 9.86189C2.79362 10.6047 2.3763 11.6122 2.3763 12.6627C2.3763 13.7132 2.79362 14.7207 3.53644 15.4636C4.27927 16.2064 5.28676 16.6237 6.33728 16.6237C7.38779 16.6237 8.39528 16.2064 9.13811 15.4636L16.4135 8.18814C16.7227 7.87898 17.2239 7.87898 17.5331 8.18814C17.8423 8.49731 17.8423 8.99856 17.5331 9.30773L10.2577 16.5831C9.21794 17.6229 7.80772 18.207 6.33728 18.207C4.86684 18.207 3.45662 17.6229 2.41686 16.5831C1.3771 15.5434 0.792969 14.1332 0.792969 12.6627C0.792969 11.1923 1.3771 9.78207 2.41686 8.74231L9.69228 1.46689C10.4349 0.72423 11.4422 0.307007 12.4925 0.307007C13.5428 0.307007 14.55 0.72423 15.2927 1.46689C16.0354 2.20955 16.4526 3.21682 16.4526 4.2671C16.4526 5.31738 16.0354 6.32465 15.2927 7.06731L8.00936 14.3427C7.5638 14.7883 6.95948 15.0386 6.32936 15.0386C5.69924 15.0386 5.09492 14.7883 4.64936 14.3427C4.2038 13.8972 3.95348 13.2928 3.95348 12.6627C3.95348 12.0326 4.2038 11.4283 4.64936 10.9827L11.3709 4.26906C11.6803 3.96008 12.1815 3.96037 12.4905 4.26972C12.7995 4.57907 12.7992 5.08032 12.4899 5.38931L5.76894 12.1023C5.62052 12.2509 5.53681 12.4527 5.53681 12.6627C5.53681 12.8729 5.62031 13.0745 5.76894 13.2231C5.91758 13.3718 6.11916 13.4553 6.32936 13.4553C6.53956 13.4553 6.74114 13.3718 6.88978 13.2231L14.1731 5.94773C14.6186 5.50203 14.8692 4.89731 14.8692 4.2671C14.8692 3.63674 14.6188 3.03221 14.1731 2.58648C13.7274 2.14075 13.1228 1.89034 12.4925 1.89034Z' fill='#737373' />
                                                </g>
                                            </svg>
                                        </h5>
                                        <span className={c.msg}>
                                            {item.lastMessage.user === userData._id
                                                ? `Me: ${item.lastMessage.message}`
                                                : item.lastMessage.message}
                                        </span>
                                    </div>
                                </div>
                            </>}
                        </Link>
                        )}
                    </div>
                </> : <div className={c.chats}>
                    {filteredBySearch.map((item) => <Link onClick={() => {
                        setIsSearchable(false)
                        setSearch('')
                    }} key={item._id} href={`${RootURLsEnum.messages}/${item._id}`} className={`${c.chat} ${!item.readStatus && c.unreaded}`}>
                        {item.user_1._id === userData._id ? <>
                            <ImageError src={item.user_2.avatarURL} alt={item.user_2.userName} className={c.photo} />
                            <div className={c.texts}>
                                <h5 className={c.username}>
                                    {item.user_2.userName}
                                </h5>
                                <span className={c.msg}>
                                    {item.lastMessage.user === userData._id ? `Me: ${item.lastMessage.message}` : item.lastMessage.message}
                                </span>
                            </div>
                        </> : <>
                            <ImageError src={item.user_1.avatarURL} alt={item.user_1.userName} className={c.photo} />
                            <div className={c.texts}>
                                <h5 className={c.username}>
                                    {item.user_1.userName}
                                </h5>
                                <span className={c.msg}>
                                    {item.lastMessage.user === userData._id ? `Me: ${item.lastMessage.message}` : item.lastMessage.message}
                                </span>
                            </div>
                        </>}
                    </Link>)
                    }
                </div>}
            </> : <div className={c.empty}>
                <b>Oops..</b>
                <br />
                There are no chats yet...
            </div>}
        </div>
    )
}

export default ChatList

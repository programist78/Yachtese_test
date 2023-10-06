import { useMutation } from '@apollo/client'
import useAuthStore from '../../stores/useAuthStore'
import ImageError from '../../utils/ImageError'
import c from './YachtRequest.module.scss'

import type { FC } from 'react'
import { ANSWER_YACHT } from '../../graphql/answerYacht'
import { errorAlert, successAlert } from '../../utils/alerts'


const YachtRequest: FC = () => {
    const [answer] = useMutation(ANSWER_YACHT)
    const requestedYachtCompany = useAuthStore((state) => state.userData.requestedYachtCompany[0])
    const setUserData = useAuthStore((state) => state.setUserData)
    const userData = useAuthStore((state) => state.userData)
    
    if (!requestedYachtCompany) return null

    return <article className={c.main}>
        <h5>A new company in the yacht business wants to join your team!</h5>

        <div className={c.info}>
            <ImageError src={requestedYachtCompany.avatarURL} alt={requestedYachtCompany.userName} className={c.img} />
            <span>{requestedYachtCompany.userName}</span>
        </div>

        <div className={c.btns}>
            <button className={c.accept} onClick={() => {
                answer({
                    variables: {
                        answerYachtRequestInput: {
                            id:requestedYachtCompany._id,
                            answer: true
                        }
                    }
                }).then(({ data, errors }) => {
                    if(errors) return errorAlert()
                    successAlert('Request accepted!')
                    setUserData({ ...userData, requestedYachtCompany: userData.requestedYachtCompany.filter((it) => it._id !== requestedYachtCompany._id) })
                }).catch(errorAlert)
            }}>
                Accept
            </button>
            <button className={c.decline} onClick={() => {
                answer({
                    variables: {
                        answerYachtRequestInput: {
                            id:requestedYachtCompany._id,
                            answer: false
                        }
                    }
                }).then(({ data, errors }) => {
                    if(errors) return errorAlert()
                    successAlert('Request declined!')
                    setUserData({ ...userData, requestedYachtCompany: userData.requestedYachtCompany.filter((it) => it._id !== requestedYachtCompany._id) })
                }).catch(errorAlert)
            }}>
                Decline
            </button>
        </div>
    </article>
}

export default YachtRequest
import { FC, useState } from 'react'
import c from './TeamMatesPopup.module.scss'
import useTeamMatesPopupStore from '../../stores/useTeamMatesPopupStore'
import useAuthStore from '../../stores/useAuthStore'
import Link from 'next/link'
import { RootURLsEnum } from '../../config/constants'
import { useMutation } from '@apollo/client'
import { DELETE_TEAM_MATE, deleteTeamMateInput, deleteTeamMateResponse } from '../../graphql/deleteTeamMate'
import { errorAlert } from '../../utils/alerts'
import { useRouter } from 'next/navigation'

const TeamMatesPopup: FC = () => {

    const [deleteTeamMate] = useMutation<deleteTeamMateResponse, deleteTeamMateInput>(DELETE_TEAM_MATE)

    const [isPending, setIsPending] = useState(false)
    const router = useRouter()

    const setUserData = useAuthStore((state) => state.setUserData)
    const userData = useAuthStore((state) => state.userData)

    const popup = useTeamMatesPopupStore()
    const teamMates = useAuthStore((state) => state.userData.teamMates)

    return popup.isOpened && <div className={c.main} onClick={() => popup.setIsOpened(false)}>
        <div className={c.menu} onClick={(e) => e.stopPropagation()}>
            <h2 className={c.title}>All Teammates</h2>
            {teamMates.map((item) => <div key={item.userName} className={c.teammate} style={isPending ? { opacity: 0.5, pointerEvents: 'none' } : {}}>
                <img title={item._id} alt={item._id} onClick={() => router.push(`${RootURLsEnum.yacht}/${item._id}`)} src={item.avatarURL ? item.avatarURL : process.env.NEXT_PUBLIC_AVATAR_ERROR} />
                <div className={c.btns}>
                    <Link href={`${RootURLsEnum.messages}/${item._id}`} className={c.messages}>Messages</Link>
                    <button className={c.delete} onClick={() => {
                        setIsPending(true)
                        deleteTeamMate({
                            variables: {
                                deleteTeamMateInput: {
                                    teamMates: item._id
                                }
                            }
                        }).then(() => {
                            setUserData({ ...userData, teamMates: userData.teamMates.filter((t) => t._id !== item._id) })
                            setIsPending(false)
                        }).catch(() => {
                            errorAlert()
                            setIsPending(false)
                        })
                    }}>Delete</button>
                </div>
            </div>)}
        </div>
    </div>
}

export default TeamMatesPopup
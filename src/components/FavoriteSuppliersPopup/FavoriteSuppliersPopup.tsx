import { FC, useState } from 'react'
import c from './FavoriteSuppliersPopup.module.scss'
import useAuthStore from '../../stores/useAuthStore'
import Link from 'next/link'
import { RootURLsEnum } from '../../config/constants'
import { useRouter } from 'next/navigation'
import useFavoriteSuppliersPopupStore from '../../stores/useFavoriteSuppliersPopupStore'
import { useMutation } from '@apollo/client'

const FavoriteSuppliersPopup: FC = () => {

    const [isPending, setIsPending] = useState(false)
    const router = useRouter()

    const setUserData = useAuthStore((state) => state.setUserData)
    const userData = useAuthStore((state) => state.userData)

    const popup = useFavoriteSuppliersPopupStore()
    const favoriteSuppliers = useAuthStore(
        (state) => state.userData.favoriteSuppliers,
    )

    return (
        popup.isOpened && (
            <div className={c.main} onClick={() => popup.setIsOpened(false)}>
                <div className={c.menu} onClick={(e) => e.stopPropagation()}>
                    <h2 className={c.title}>All Favourite Suppliers</h2>
                    {favoriteSuppliers.map((item) => (
                        <div key={`group ${item.name}`}>
                            <h3 className={c.title_mini}>{item.name}:</h3>
                            <div>
                                {item.id.map((supplier) => (
                                    <div
                                        key={supplier._id}
                                        className={c.supplier}
                                        style={
                                            isPending
                                                ? {
                                                      opacity: 0.5,
                                                      pointerEvents: 'none',
                                                  }
                                                : {}
                                        }>
                                        <img
                                            title={supplier._id}
                                            alt={supplier._id}
                                            onClick={() =>
                                                router.push(
                                                    `${RootURLsEnum.supplier}/${supplier._id}`,
                                                )
                                            }
                                            src={
                                                supplier.avatarURL
                                                    ? supplier.avatarURL
                                                    : process.env
                                                          .NEXT_PUBLIC_AVATAR_ERROR
                                            }
                                        />
                                        <div className={c.btns}>
                                            <Link
                                                href={`${RootURLsEnum.messages}/${supplier._id}new`}
                                                className={c.messages}>
                                                Messages
                                            </Link>
                                            <button className={c.delete}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    )
}

export default FavoriteSuppliersPopup

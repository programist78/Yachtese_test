'use client'
import { useEffect, useState } from 'react'
import styles from './Admin.module.scss'
import { useQuery } from '@apollo/client'
import { IoIosArrowDown, IoIosArrowBack, IoIosArrowForward, IoIosArrowUp } from 'react-icons/io'
import { useMutation } from '@apollo/client'
import Swal from 'sweetalert2'
import { GETUSERS_BYROLE, SEND_EMAIL_INVITES } from '../../graphql/admin'


const Admin = () => {
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        // Очистка слушателя события при размонтировании компонента
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    if (screenWidth <= 1024) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100vw',
                    height: '100vh',
                }}
                className='title'
            >
                Please use computer to access admin panel
            </div>
        )
    }

    return (
        <div className={styles.back}>
            <SendIvitesComponent />
            <SupliersRegistration />
            <PosterRegistration />
        </div>
    )
}
//done
const SupliersRegistration = () => {
    const [page1, setPage1] = useState(1)
    const [argument1, setArgument1] = useState('createdAt')

    const { data, loading, error } = useQuery(GETUSERS_BYROLE, {
        variables: { role: 'SUPPLIER' }
    })

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp)
        const day = date.getDate()
        const month = date.getMonth() + 1
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const formattedDate = `${month}/${day} ${hours}:${minutes < 10 ? '0' + minutes : minutes}${hours >= 12 ? 'pm' : 'am'}`

        return formattedDate
    }

    const filterData = () => {

        return data?.getUsersByRole
    }

    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className={styles.part}>
            <p className='title'>Supplier Registration</p>
            <div className={styles.filters}>
                {/* <div
          onClick={() => setLeftFilter1("All Posters")}
          className={`text ${leftFilter1 == "All Posters" ? styles.this : ""}`}
        >
          All Posters
        </div> */}
                {/* <div
          onClick={() => setLeftFilter1("Completed Sign Up Page")}
          className={`text ${
            leftFilter1 == "Completed Sign Up Page" ? styles.this : ""
          }`}
        >
          Completed Sign Up Page
        </div>
        <div
          onClick={() => setLeftFilter1("Completed Details Page")}
          className={`text ${
            leftFilter1 == "Completed Details Page" ? styles.this : ""
          }`}
        >
          Completed Details Page
        </div> */}
                <div className={styles.sortby}>
                    <div className={`text ${styles.button}`} onClick={toggleMenu}>
                        <p>Sort by columns</p>
                        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </div>
                    {isOpen && (
                        <div className={styles.menu}>
                            <div onClick={() => setArgument1('createdAt')} className='text'>
                                Date
                            </div>
                            <div onClick={() => setArgument1('fullname')} className='text'>
                                Username
                            </div>
                            <div onClick={() => setArgument1('brandname')} className='text'>
                                Login
                            </div>
                            <div
                                onClick={() => setArgument1('brandDescription')}
                                className='text'
                            >
                                Action
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {loading ? (
                <table className={styles.custom_table}>
                    <thead>
                        <tr>
                            <th className='text'>Date</th>
                            <th className='text'>Username</th>
                            <th className='text'>Login</th>
                            <th className='text'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                        </tr>
                        <tr>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                        </tr>
                        <tr>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                        </tr>
                        <tr>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                        </tr>
                        <tr>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                        </tr>
                        <tr>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <table className={styles.custom_table}>
                    <thead>
                        <tr>
                            <th className='text'>Date</th>
                            <th className='text'>Username</th>
                            <th className='text'>Login</th>
                            <th className='text'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterData()?.map((data, index) => (
                            <tr key={index}>
                                <td className='text'>{formatTimestamp(data.createdAt)}</td>
                                <td className='text'>{data.name}</td>
                                <td className='text'>
                                    {data.reviewMedia?.google ||
                                        data.reviewMedia?.yelp ||
                                        data.reviewMedia?.tripadvisor ? (
                                        <div>
                                            {data.reviewMedia?.google && <span>Google </span>}
                                            {data.reviewMedia?.yelp && <span>Yelp </span>}
                                            {data.reviewMedia?.tripadvisor && (
                                                <span>TripAdvisor</span>
                                            )}
                                        </div>
                                    ) : (
                                        <div>No reviews</div>
                                    )}
                                </td>
                                {data.reviewMedia ? (
                                    <td className='text'>
                                        <div className={styles.green}>Completed Details Page</div>
                                    </td>
                                ) : (
                                    <td className='text'>
                                        <div className={styles.yellow}>Completed Sign Up Page</div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div className={styles.foot}>
                <IoIosArrowBack
                    className={styles.arrow}
                    onClick={() => {
                        if (page1 > 1) {
                            setPage1(page1 - 1)
                        }
                    }}
                />
                <input
                    type='text'
                    className='text'
                    value={page1}
                    onChange={(e) => setPage1(+e.target.value)}
                    style={{color: '#000'}}
                />
                {/* <p className="text">Next page</p> */}
                <IoIosArrowForward
                    className={styles.arrow}
                    onClick={() => setPage1(page1 + 1)}
                />
            </div>
        </div>
    )
}
//done
const PosterRegistration = () => {
    const [page1, setPage1] = useState(1)
    const [argument1, setArgument1] = useState('createdAt')

    const {
        data,
        loading,
        error,
    } = useQuery(GETUSERS_BYROLE, {
        variables: { role: 'YACHT' },
    })

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp)
        const day = date.getDate()
        const month = date.getMonth() + 1
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const formattedDate = `${month}/${day} ${hours}:${minutes < 10 ? '0' + minutes : minutes}${hours >= 12 ? 'pm' : 'am'}`

        return formattedDate
    }

    const filterData = () => {
        return data?.getUsersByRole
    }

    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className={styles.part}>
            <p className='title'>Posters Registration</p>
            <div className={styles.filters}>
                {/* <div
          onClick={() => setLeftFilter1("All Posters")}
          className={`text ${leftFilter1 == "All Posters" ? styles.this : ""}`}
        >
          All Posters
        </div> */}
                {/* <div
          onClick={() => setLeftFilter1("Completed Sign Up Page")}
          className={`text ${
            leftFilter1 == "Completed Sign Up Page" ? styles.this : ""
          }`}
        >
          Completed Sign Up Page
        </div>
        <div
          onClick={() => setLeftFilter1("Completed Details Page")}
          className={`text ${
            leftFilter1 == "Completed Details Page" ? styles.this : ""
          }`}
        >
          Completed Details Page
        </div> */}
                <div className={styles.sortby}>
                    <div className={`text ${styles.button}`} onClick={toggleMenu}>
                        <p>Sort by columns</p>
                        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </div>
                    {isOpen && (
                        <div className={styles.menu}>
                            <div onClick={() => setArgument1('createdAt')} className='text'>
                                Date
                            </div>
                            <div onClick={() => setArgument1('fullname')} className='text'>
                                Username
                            </div>
                            <div onClick={() => setArgument1('brandname')} className='text'>
                                Login
                            </div>
                            <div
                                onClick={() => setArgument1('brandDescription')}
                                className='text'
                            >
                                Action
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {loading ? (
                <table className={styles.custom_table}>
                    <thead>
                        <tr>
                            <th className='text'>Date</th>
                            <th className='text'>Username</th>
                            <th className='text'>Login</th>
                            <th className='text'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                        </tr>
                        <tr>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                        </tr>
                        <tr>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                        </tr>
                        <tr>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                        </tr>
                        <tr>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                        </tr>
                        <tr>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                            <td className='text'>Loading...</td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <table className={styles.custom_table}>
                    <thead>
                        <tr>
                            <th className='text'>Date</th>
                            <th className='text'>Username</th>
                            <th className='text'>Login</th>
                            <th className='text'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterData()?.map((data, index) => (
                            <tr key={index}>
                                <td className='text'>{formatTimestamp(data.createdAt)}</td>
                                <td className='text'>{data.fullname}</td>
                                <td className='text'>
                                    {data.reviewMedia?.google ||
                                        data.reviewMedia?.yelp ||
                                        data.reviewMedia?.tripadvisor ? (
                                        <div>
                                            {data.reviewMedia?.google && <span>Google </span>}
                                            {data.reviewMedia?.yelp && <span>Yelp </span>}
                                            {data.reviewMedia?.tripadvisor && (
                                                <span>TripAdvisor</span>
                                            )}
                                        </div>
                                    ) : (
                                        <div>No reviews</div>
                                    )}
                                </td>
                                {data.reviewMedia ? (
                                    <td className='text'>
                                        <div className={styles.green}>Completed Details Page</div>
                                    </td>
                                ) : (
                                    <td className='text'>
                                        <div className={styles.yellow}>Completed Sign Up Page</div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div className={styles.foot}>
                <IoIosArrowBack
                    className={styles.arrow}
                    onClick={() => {
                        if (page1 > 1) {
                            setPage1(page1 - 1)
                        }
                    }}
                />
                <input
                    type='text'
                    className='text'
                    value={page1}
                    onChange={(e) => setPage1(+e.target.value)}
                />
                {/* <p className="text">Next page</p> */}
                <IoIosArrowForward
                    className={styles.arrow}
                    onClick={() => setPage1(page1 + 1)}
                />
            </div>
        </div>
    )
}
//done
const SendIvitesComponent = () => {
    const [subject, setSubject] = useState('')
    const [sendEmail] = useMutation(SEND_EMAIL_INVITES, {
        onError(error) {
            Swal.fire({
                icon: 'error',
                title: `${error}`,
            })
        },
        onCompleted: (data) => {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
            })
        },
        variables: {
            subject
        },
    })

    return (
        <div className={styles.inline_form}>
            <p className='pretitle'>Send Invites</p>
            <input className='a_input' onChange={(e) => setSubject(e.target.value)} value={subject} placeholder='Hello dear suppliers and yachts!' />
            <button className='b_button' onClick={() => sendEmail()}>
                Send now!
            </button>
        </div>
    )
}

export default Admin
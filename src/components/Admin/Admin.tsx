'use client'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import styles from './Admin.module.scss'
import { useQuery } from '@apollo/client'
import { IoIosArrowDown, IoIosArrowBack, IoIosArrowForward, IoIosArrowUp } from 'react-icons/io'
import { useMutation } from '@apollo/client'
import Swal from 'sweetalert2'
import { GETUSERS_BYROLE, SEND_EMAIL_INVITES } from '../../graphql/admin'


const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const formattedDate = `${month}/${day} ${hours}:${minutes < 10 ? '0' + minutes : minutes}${hours >= 12 ? 'pm' : 'am'}`

    return formattedDate
}


const SupliersRegistration: FC = () => {
    const [page, setPage] = useState(1)
    const [argument, setArgument] = useState('createdAt')
    const [isOpen, setIsOpen] = useState(false)

    const { data, loading, error } = useQuery(GETUSERS_BYROLE, {
        variables: { role: 'SUPPLIER', pageNumber: page }
    })


   if (loading || !data) return <div className={styles.part}>
        <p className='title'>Supplier Registration</p>
        <div className={styles.filters}>
            <div className={styles.sortby}>
                <div className={`text ${styles.button}`} onClick={() => setIsOpen((p) => !p)}>
                    <p>Sort by columns</p>
                    {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                <Menu isOpen={isOpen} setArgument={setArgument} />
            </div>
        </div>
        <LoadingTable />
        <TablePagination page={page} setPage={setPage} />
    </div>

    return <div className={styles.part}>
        <p className='title'>Supplier Registration</p>
        <div className={styles.filters}>
            <div className={styles.sortby}>
                <div className={`text ${styles.button}`} onClick={() => setIsOpen((p) => !p)}>
                    <p>Sort by columns</p>
                    {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                <Menu isOpen={isOpen} setArgument={setArgument} />
            </div>
        </div>
        <table className={styles.custom_table}>
            <TableHead />
            <TableBody users={data.getUsersByRole.users}/>
        </table>
        <TablePagination page={page} setPage={setPage} />
    </div>
}

const YachtRegistration: FC = () => {
    const [page, setPage] = useState(1)
    const [argument, setArgument] = useState('createdAt')
    const [isOpen, setIsOpen] = useState(false)

    const { data, loading, error } = useQuery(GETUSERS_BYROLE, {
        variables: { role: 'YACHT', pageNumber: page }
    })


   if (loading || !data) return <div className={styles.part}>
        <p className='title'>Yachts Registration</p>
        <div className={styles.filters}>
            <div className={styles.sortby}>
                <div className={`text ${styles.button}`} onClick={() => setIsOpen((p) => !p)}>
                    <p>Sort by columns</p>
                    {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                <Menu isOpen={isOpen} setArgument={setArgument} />
            </div>
        </div>
        <LoadingTable />
        <TablePagination page={page} setPage={setPage} />
    </div>

    return <div className={styles.part}>
        <p className='title'>Yachts Registration</p>
        <div className={styles.filters}>
            <div className={styles.sortby}>
                <div className={`text ${styles.button}`} onClick={() => setIsOpen((p) => !p)}>
                    <p>Sort by columns</p>
                    {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                <Menu isOpen={isOpen} setArgument={setArgument} />
            </div>
        </div>
        <table className={styles.custom_table}>
            <TableHead />
            <TableBody users={data.getUsersByRole.users}/>
        </table>
        <TablePagination page={page} setPage={setPage} />
    </div>
}

const TeammateRegistration: FC = () => {
    const [page, setPage] = useState(1)
    const [argument, setArgument] = useState('createdAt')
    const [isOpen, setIsOpen] = useState(false)

    const { data, loading, error } = useQuery(GETUSERS_BYROLE, {
        variables: { role: 'YACHT_TEAMMATE', pageNumber: page }
    })


   if (loading || !data) return <div className={styles.part}>
        <p className='title'>Teammates Registration</p>
        <div className={styles.filters}>
            <div className={styles.sortby}>
                <div className={`text ${styles.button}`} onClick={() => setIsOpen((p) => !p)}>
                    <p>Sort by columns</p>
                    {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                <Menu isOpen={isOpen} setArgument={setArgument} />
            </div>
        </div>
        <LoadingTable />
        <TablePagination page={page} setPage={setPage} />
    </div>

    return <div className={styles.part}>
        <p className='title'>Teammates Registration</p>
        <div className={styles.filters}>
            <div className={styles.sortby}>
                <div className={`text ${styles.button}`} onClick={() => setIsOpen((p) => !p)}>
                    <p>Sort by columns</p>
                    {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                <Menu isOpen={isOpen} setArgument={setArgument} />
            </div>
        </div>
        <table className={styles.custom_table}>
            <TableHead />
            <TableBody users={data.getUsersByRole.users}/>
        </table>
        <TablePagination page={page} setPage={setPage} />
    </div>
}

const BussinesRegistration: FC = () => {
    const [page, setPage] = useState(1)
    const [argument, setArgument] = useState('createdAt')
    const [isOpen, setIsOpen] = useState(false)

    const { data, loading, error } = useQuery(GETUSERS_BYROLE, {
        variables: { role: 'YACHT_BUSINESS', pageNumber: page }
    })


   if (loading || !data) return <div className={styles.part}>
        <p className='title'>Fleet Registration</p>
        <div className={styles.filters}>
            <div className={styles.sortby}>
                <div className={`text ${styles.button}`} onClick={() => setIsOpen((p) => !p)}>
                    <p>Sort by columns</p>
                    {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                <Menu isOpen={isOpen} setArgument={setArgument} />
            </div>
        </div>
        <LoadingTable />
        <TablePagination page={page} setPage={setPage} />
    </div>

    return <div className={styles.part}>
        <p className='title'>Fleet Registration</p>
        <div className={styles.filters}>
            <div className={styles.sortby}>
                <div className={`text ${styles.button}`} onClick={() => setIsOpen((p) => !p)}>
                    <p>Sort by columns</p>
                    {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                <Menu isOpen={isOpen} setArgument={setArgument} />
            </div>
        </div>
        <table className={styles.custom_table}>
            <TableHead />
            <TableBody users={data.getUsersByRole.users}/>
        </table>
        <TablePagination page={page} setPage={setPage} />
    </div>
}

const SendIvitesComponent: FC = () => {
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

//ELEMENTS

const LoadingTable: FC = () => {
    return <table className={styles.custom_table}>
        <TableHead />
        <tbody>
            {new Array(10).fill(null).map((_, index) => <tr key={`loadingsupplier${index}`}>
                <td className='text'>Loading...</td>
                <td className='text'>Loading...</td>
                <td className='text'>Loading...</td>
                <td className='text'>Loading...</td>
            </tr>)}
        </tbody>
    </table>
}

const TableHead: FC = () => {
    return <thead>
        <tr>
            <th className='text'>Date</th>
            <th className='text'>Username</th>
            <th className='text'>Email</th>
            <th className='text'>Action</th>
        </tr>
    </thead>
}

const TablePagination: FC<{ page: number, setPage: Dispatch<SetStateAction<number>> }> = ({ page, setPage }) => {
    return <div className={styles.foot}>
        <IoIosArrowBack
            className={styles.arrow}
            onClick={() => {
                if (page > 1) {
                    setPage(page - 1)
                }
            }}
        />
        <input
            type='text'
            className='text'
            value={page}
            onChange={(e) => setPage(+e.target.value)}
            style={{ color: '#000' }}
        />
        {/* <p className="text">Next page</p> */}
        <IoIosArrowForward
            className={styles.arrow}
            onClick={() => setPage(page + 1)}
        />
    </div>
}

const Menu: FC<{ isOpen: boolean, setArgument: Dispatch<SetStateAction<string>> }> = ({ isOpen, setArgument }) => isOpen && <div className={styles.menu}>
    <div onClick={() => setArgument('createdAt')} className='text'>Date</div>
    <div onClick={() => setArgument('fullname')} className='text'>Username</div>
    <div onClick={() => setArgument('brandname')} className='text'>Login</div>
    <div onClick={() => setArgument('brandDescription')} className='text'>Action</div>
</div>

const TableBody: FC<{ users: Array<{ _id:string, createdAt:string, userName:string, email:string, contactInfo?: Array<{ link }> }> }> = ({users}) => {
    return <tbody>
        {users.map((data, index) => (
            <tr key={index}>
                <td className='text'>{formatTimestamp(data.createdAt)}</td>
                <td className='text'>{data.userName}</td>
                <td className='text'>{data.email}</td>
                <td className='text'>{data.contactInfo && data.contactInfo.length > 0 && data.contactInfo[0].link ? data.contactInfo[0].link : 'No Phone'}</td>
            </tr>
        ))}
    </tbody>
}


const Admin: FC = () => {
    const [screenWidth, setScreenWidth] = useState<number>(10000)

    const handleResize = () => {
        setScreenWidth(window.innerWidth)
    }

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    if (screenWidth <= 1024) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh'}} className='title'>Please use computer to access admin panel</div>

    return (
        <div className={styles.back}>
            <SendIvitesComponent />
            <SupliersRegistration />
            <YachtRegistration />
            <TeammateRegistration/>
            <BussinesRegistration/>
        </div>
    )
}

export default Admin
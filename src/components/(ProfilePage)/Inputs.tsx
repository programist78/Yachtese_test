import classNames from 'classnames'
import { useState, FC, useEffect } from 'react'
import supplier from './styles/SupplierInput.module.scss'
import c from './styles/Inputs.module.scss'
import useAuthStore from '../../stores/useAuthStore'
import PhoneInput from 'react-phone-input-2'
import EditIcon from '../EditIcon/EditIcon'
import { useMutation } from '@apollo/client'
import {
    UPDATE_USER_NAME,
    updateUserMuatationInputType,
    updateUserMuatationResponseType,
} from '../../graphql/updataUserName'
import { errorAlert, successAlert } from '../../utils/alerts'
import TextareaAutosize from 'react-textarea-autosize'
import {
    UPDATE_DESCRIPTION,
    updateDescriptionMuatationInputType,
    updateDescriptionMuatationResponseType,
} from '../../graphql/updateDescription'
import { useFormik } from 'formik'
import {
    UPDATE_CONTACTS_INFO,
    updateContactsInfoInput,
    updateContactsInfoResponse,
} from '../../graphql/updateContactsInfo'
import useYachtPageStore from '../../stores/useYachtPageStore'
import useSupplierPageStore from '../../stores/useSupplierPageStore'
import instans from '../../config/axios'
import { ADD_TEAMMATE } from '../../graphql/addTeammate'
import { ADD_YACHT } from '../../graphql/addYacht'

export const SupplierInputs: FC = () => {

    return (
        <article className={classNames(supplier.inputs, 'block')}>
            <FullNameInput />
            <DescriptionInput />
            <ContactInfo />
            <Images />
        </article>
    )
}

export const YachtInputs: FC = () => {
    return (
        <article className={classNames(supplier.inputs, 'block')}>
            <FullNameInput />
            <ContactInfo />
            <AddTeammate/>
        </article>
    )
}

export const YachtTeammateInputs: FC = () => {
    return <article className={classNames(supplier.inputs, 'block')}>
        <FullNameInput />
        <ContactInfo />
        <DescriptionInput />
    </article>
}

export const YachtBussinesInputs: FC = () => {
    return <article className={classNames(supplier.inputs, 'block')}>
        <FullNameInput />
        <ContactInfo />
        <AddYacht/>
    </article>
}

export const YachtPageInputs: FC = () => {
    const yachtData = useYachtPageStore((state) => state.yachtData)

    return (
        <article className={`${supplier.inputs} block`}>
            <h4 className={supplier.title}>Brand Name</h4>
            <h3 className={c.fullname}>{yachtData.userName}</h3>
            {yachtData.email && <><h4 className={supplier.title}>Email</h4>
                <h4 className={c.email}>{yachtData.email}</h4></>}
            {yachtData.contactInfo && yachtData.contactInfo[0] && <><h4 className={supplier.title}>Contact Information</h4></>}
            {yachtData.contactInfo && yachtData.contactInfo[0] && yachtData.contactInfo.map((item, i) => (
                <div key={i}>
                    <h6
                        className={c.link_name}
                    >{`${item.name[0].toUpperCase()}${item.name.slice(1)}`}</h6>
                    <span className={c.link}>{item.link}</span>
                </div>
            ))}
        </article>
    )
}

export const SupplierViewInputs: FC = () => {

    const supplierData = useSupplierPageStore((state) => state.supplierData)

    return (
        <article className={`${supplier.inputs} block`}>
            <h4 className={supplier.title}>Brand Name</h4>
            <h3 className={c.fullname}>{supplierData.userName}</h3>
            {supplierData.email && <>
                <h4 className={supplier.title}>Email</h4>
                <h4 className={c.email}>{supplierData.email}</h4>
            </>}
            {supplierData.description && <>
                <h4 className={supplier.title}>Description</h4>
                <h4 className={c.email}>{supplierData.description}</h4>
            </>}
            {supplierData.contactInfo && supplierData.contactInfo[0] && <h4 className={supplier.title}>Contact Information</h4>}
            {supplierData.contactInfo && supplierData.contactInfo[0] && supplierData.contactInfo.map((item, i) => (
                <div key={i}>
                    <h6
                        className={c.link_name}
                    >{`${item.name[0].toUpperCase()}${item.name.slice(1)}`}</h6>
                    <span className={c.link}>{item.link}</span>
                </div>
            ))}
            {supplierData.imagesURL && supplierData.imagesURL[0] && <h4 className={supplier.title}>Images</h4>}
            {supplierData.imagesURL && <div className={supplier.images}>
                {supplierData.imagesURL.map((item, i) => (
                    <img key={`Image ${i + 1}`} className={supplier.image} src={item} alt={`Image ${i + 1}`} />
                ))}
            </div>}
        </article>
    )
}

const FullNameInput: FC = () => {
    const [updateUserName] = useMutation<
        updateUserMuatationResponseType,
        updateUserMuatationInputType
    >(UPDATE_USER_NAME)

    const userData = useAuthStore((state) => state.userData)
    const setUserData = useAuthStore((state) => state.setUserData)
    const [isEditable, setIsEditable] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [input, setInput] = useState(userData.userName)

    useEffect(() => {
        setInput(userData.userName)
    }, [userData.userName])

    const setUserName = async () => {
        try {
            setIsEditable(false)
            if (!input || input === userData.userName) return

            setIsDisabled(true)
            const { data } = await updateUserName({
                variables: {
                    changeUserInfoInput: {
                        userName: input,
                    },
                },
            })

            setUserData({ ...userData, userName: data.changeUserInfo.userName })
            setIsDisabled(false)
        } catch (e) {
            setIsDisabled(false)
            setIsEditable(false)
            errorAlert('Something went wrong!')
        }
    }

    return !isEditable ? (
        <>
            <h4 className={supplier.title}>
                {userData.role === 'SUPPLIER' ? 'Full Name' : 'Yacht Name'}
                <EditIcon
                    isOn={isEditable}
                    onClick={() => setIsEditable(true)}
                />
            </h4>
            <h3 className={c.fullname}>
                {isDisabled ? 'Loading...' : userData.userName}
            </h3>
        </>
    ) : (
        <>
            <h4 className={supplier.title}>
                Full Name <EditIcon isOn={isEditable} onClick={setUserName} />
            </h4>
            <h6>Add/Change</h6>
            <input
                className={c.input}
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder={userData.userName}
            />
        </>
    )
}

const DescriptionInput: FC = () => {
    const [updateDescription] = useMutation<
        updateDescriptionMuatationResponseType,
        updateDescriptionMuatationInputType
    >(UPDATE_DESCRIPTION)

    const userData = useAuthStore((state) => state.userData)
    const setUserData = useAuthStore((state) => state.setUserData)
    const [isEditable, setIsEditable] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [input, setInput] = useState(
        userData.description ? userData.description : '',
    )

    const setDescription = async () => {
        try {
            setIsEditable(false)
            if (!input || input === userData.description) return

            setIsDisabled(true)
            const { data } = await updateDescription({
                variables: {
                    changeUserInfoInput: {
                        description: input,
                    },
                },
            })

            setUserData({
                ...userData,
                description: data.changeUserInfo.description,
            })
            setIsDisabled(false)
        } catch (e) {
            setIsDisabled(false)
            setIsEditable(false)
            errorAlert('Something went wrong!')
        }
    }

    return (
        <>
            {!isEditable ? (
                <>
                    <h4 className={supplier.title}>
                        Description
                        <EditIcon
                            isOn={isEditable}
                            onClick={() => setIsEditable(true)}
                        />
                    </h4>
                    <span className={c.description}>
                        {!isDisabled
                            ? userData.description
                                ? userData.description
                                : 'You have no description...'
                            : 'Loading...'}
                    </span>
                </>
            ) : (
                <>
                    <h4 className={supplier.title}>
                        Description
                        <EditIcon isOn={isEditable} onClick={setDescription} />
                    </h4>
                    <TextareaAutosize
                        className={c.textarea}
                        minRows={5}
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        placeholder={
                            userData.description
                                ? userData.description
                                : 'Description'
                        }
                    />
                </>
            )}
        </>
    )
}

const ContactInfo: FC = () => {
    const [updateContactsData] = useMutation<
        updateContactsInfoResponse,
        updateContactsInfoInput
    >(UPDATE_CONTACTS_INFO)

    const userData = useAuthStore((state) => state.userData)

    const setUserData = useAuthStore((state) => state.setUserData)
    const [isEditable, setIsEditable] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)

    const { values, handleBlur, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            phone:
                userData.contactInfo.filter((item) => item.name === 'phone')[0]
                    ?.link || '',
            whatsapp:
                userData.contactInfo.filter(
                    (item) => item.name === 'whatsapp',
                )[0]?.link || '',
        },
        onSubmit: (values) => {
            setIsDisabled(true)

            const contactInfo = []

            for (const field in values) {
                if (values[field]) {
                    contactInfo.push({
                        name: field,
                        link: values[field],
                    })
                }
            }

            updateContactsData({
                variables: {
                    changeUserInfoInput: {
                        contactInfo,
                    },
                },
            })
                .then(({ data }) => {
                    setUserData({
                        ...userData,
                        contactInfo: data.changeUserInfo.contactInfo,
                    })
                    setIsEditable(false)
                    setIsDisabled(false)
                })
                .catch(() => {
                    errorAlert('Something went wrong!')
                    setIsEditable(false)
                    setIsDisabled(false)
                })
        },
    })

    return !isEditable ? (
        <div style={isDisabled ? { opacity: 0.5 } : {}}>
            <h4 className={c.contact}>
                Contact Information
                <EditIcon
                    isOn={isEditable}
                    onClick={() => setIsEditable(true)}
                />
            </h4>
            {userData.contactInfo.map((item, i) => (
                <div key={i}>
                    <h6
                        className={c.link_name}
                    >{`${item.name[0].toUpperCase()}${item.name.slice(1)}`}</h6>
                    <span className={c.link}>{item.link}</span>
                </div>
            ))}
        </div>
    ) : (
        <div style={isDisabled ? { opacity: 0.5 } : {}}>
            <h4 className={c.contact}>
                Contact Information
                <EditIcon
                    isOn={isEditable}
                    onClick={() => {
                        setIsEditable(false)
                        handleSubmit()
                    }}
                />
            </h4>
            <PhoneInput specialLabel='Phone number'
                inputClass={c.input}
                placeholder='Phone'
                value={values.phone}
                onChange={(e) => setFieldValue('phone', e)}
                onBlur={handleBlur}/>
            <PhoneInput specialLabel='Whatsapp'
                inputClass={c.input}
                placeholder={'Whatsapp'}
                value={values.whatsapp}
                onChange={(e) => setFieldValue('whatsapp', e)}
                onBlur={handleBlur}
            />
        </div>
    )
}

const Images: FC = () => {
    const userData = useAuthStore((state) => state.userData)
    const setUserData = useAuthStore((state) => state.setUserData)
    const [isEditable, setIsEditable] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    return (
        <>
            <h4 className={supplier.title}>
                Images
                <EditIcon isOn={isEditable} onClick={() => setIsEditable((p) => !p)} />
            </h4>
            <div className={supplier.images} style={isLoading ? { opacity: 0.5, pointerEvents: 'none' } : {}}>
                {userData.imagesURL.length > 0 ? <>
                    {userData.imagesURL.map((item, i) => (
                        <div key={`Image ${i + 1}`} style={{ position: 'relative' }}>
                            <img className={supplier.image} src={item} alt={`Image ${i + 1}`} />
                            {isEditable && <div className={supplier.delete_image} onClick={() => {
                                setIsLoading(true)
                                const items = item.split('/')
                                const filename = items[items.length - 1]

                                instans.delete(`images/${filename}`).then((res) => {
                                    setUserData({ ...userData, imagesURL: res.data.user.imagesURL })
                                    successAlert('Image deleted!')
                                    setIsLoading(false)
                                }).catch((err) => {
                                    errorAlert()
                                    setIsLoading(false)
                                })
                            }}>+</div>}
                        </div>
                    ))}
                    {isEditable && <label htmlFor='image_upload' onClick={() => {
                        setIsEditable(true)
                    }} className={supplier.add_image}>+<input id='image_upload' type='file' onChange={(e) => {
                        const formData = new FormData()

                        formData.append('images', e.target.files[0])

                        instans.post('images', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then((res) => {
                            setUserData({ ...userData, imagesURL: res.data.user.imagesURL })
                        }).catch((err) => {
                            errorAlert()
                        })
                    }} /></label>}
                </> : <><label htmlFor='image_upload' onClick={() => {
                    setIsEditable(true)
                }} className={supplier.add_image}>+<input id='image_upload' type='file' onChange={(e) => {
                    const formData = new FormData()

                    formData.append('images', e.target.files[0])

                    instans.post('images', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then((res) => {
                        setUserData({ ...userData, imagesURL: res.data.user.imagesURL })
                        successAlert('Image added!')
                    }).catch((err) => {
                        errorAlert()
                    })
                }} /></label>
                </>}
            </div>
        </>
    )
}

const AddTeammate: FC = () => {
    const [addTeammate] = useMutation(ADD_TEAMMATE)
    const [input, setInput] = useState('')

    return <form className={c.add_teammate} onSubmit={(e) => {
        e.preventDefault()

        addTeammate({
            variables: {
                email:input
            }
        }).then(({errors}) => {
            if(errors) return errorAlert(errors[0].message)
            successAlert('Teammate added!')
        }).catch(() => {
            errorAlert()
        })
    }}>
        <h4 className={c.contact}>Add to Team</h4>
        <input className={c.input} value={input} onChange={(e) => setInput(e.target.value)} placeholder='Email'/>
        <button>Send</button>
    </form>
}

const AddYacht: FC = () => {
    const [addYacht] = useMutation(ADD_YACHT)
    const [input, setInput] = useState('')

    return <form className={c.add_teammate} onSubmit={(e) => {
        e.preventDefault()

        addYacht({
            variables: {
                email:input
            }
        }).then(({errors}) => {
            if(errors) return errorAlert(errors[0].message)
            successAlert('Invite Sent!')
        }).catch(() => {
            errorAlert()
        })
    }}>
        <h4 className={c.contact}>Add Yacht</h4>
        <input className={c.input} value={input} onChange={(e) => setInput(e.target.value)} placeholder='Email'/>
        <button>Send</button>
    </form>
}
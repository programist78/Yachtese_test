import { FC, useState } from 'react'
import c from './OfferPopup.module.scss'
import useOfferPopupStore from '../../stores/useOfferPopupStore'
import { useFormik } from 'formik'
import TextareaAutosize from 'react-textarea-autosize'
import { useMutation } from '@apollo/client'
import { CREATE_OFFER, sendOfferInput, sendOfferResponse } from '../../graphql/createOffer'
import useMessagesStore from '../../stores/useMessagesStore'
import { useParams } from 'next/navigation'
import { errorAlert, successAlert } from '../../utils/alerts'
import Image from 'next/image'
import instans from '../../config/axios'
import * as Yup from 'yup'

const OfferPopup: FC = () => {
    const [createOffer] = useMutation<sendOfferResponse, sendOfferInput>(CREATE_OFFER)
    const params = useParams()

    const popup = useOfferPopupStore()
    const selectedUser = useMessagesStore((state) => state.selectedUser)
    const [file, setFile] = useState<null | File>(null)

    const { handleBlur, handleChange, handleSubmit, values } = useFormik({
        initialValues: {
            title: '',
            description: '',
            service: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required(),
            description: Yup.string().required(),
            service: Yup.string().required()
        }),
        onSubmit: (values, helpers) => {

            const formData = new FormData

            formData.append('messageFile', file)

            instans.post('/messageFile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(({ data }) => {
                createOffer({
                    variables: {
                        sendOfferInput: {
                            accepted: false,
                            //@ts-ignore
                            chatId: params.id,
                            createdFor: selectedUser._id,
                            description: values.description,
                            services: values.service,
                            title: values.title,
                            //@ts-ignore
                            fileUrl: [data.messageImageURL]
                        }
                    }
                }).then(() => {
                    successAlert('Offer sent!')
                    popup.setIsOpened(false)
                    helpers.resetForm()
                }).catch(() => {
                    errorAlert()
                    popup.setIsOpened(false)
                    helpers.resetForm()
                })
            }).catch((err) => {
                errorAlert(err.response.data.message)
                setFile(null)
            })
        },
    })

    return (
        popup.isOpened && (
            <div className={c.main} onClick={() => popup.setIsOpened(false)}>
                <div className={c.menu} onClick={(e) => e.stopPropagation()}>
                    <h2 className={c.title}>Create Offer</h2>
                    <form onSubmit={handleSubmit} className={c.form}>
                        <div className={c.inp_con}>
                            <input className={c.inp} placeholder='Title' type="text" name='title' value={values.title} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        <div className={c.inp_con}>
                            <TextareaAutosize placeholder='Text' style={{ width: '100%' }} className={c.inp} minRows={5} maxRows={15} name='description' value={values.description} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        <div className={c.inp_con}>
                            <input className={c.inp} placeholder='Service' type="text" name='service' value={values.service} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        <label className={c.file} htmlFor='file_offer'>{file ? <div onClick={(e) => {
                            e.preventDefault()
                            setFile(null)
                        }
                        }>{file.name}</div> : <Image src='/assets/paperclip.svg' alt='paperclip' width={20} height={20} />}</label>
                        <input id='file_offer' type='file' style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
                        <button className={c.btn} type='submit'>Send</button>
                    </form>
                </div>
            </div>
        )
    )
}

export default OfferPopup

import { FC } from 'react'
import c from './OfferPopup.module.scss'
import useOfferPopupStore from '../../stores/useOfferPopupStore'
import { useFormik } from 'formik'
import TextareaAutosize from 'react-textarea-autosize'
import { useMutation } from '@apollo/client'
import { CREATE_OFFER, sendOfferInput, sendOfferResponse } from '../../graphql/createOffer'
import useMessagesStore from '../../stores/useMessagesStore'
import { useParams } from 'next/navigation'
import { errorAlert, successAlert } from '../../utils/alerts'

const OfferPopup: FC = () => {
    const [createOffer] = useMutation<sendOfferResponse, sendOfferInput>(CREATE_OFFER)
    const params = useParams()

    const popup = useOfferPopupStore()
    const selectedUser = useMessagesStore((state) => state.selectedUser)

    const { handleBlur, handleChange, handleSubmit, values } = useFormik({
        initialValues: {
            title: '',
            description: '',
            service: '',
        },
        onSubmit: (values, helpers) => {
            createOffer({
                variables: {
                    sendOfferInput: {
                        accepted: false,
                        //@ts-ignore
                        chatId: params.id,
                        createdFor: selectedUser._id,
                        description: values.description,
                        services: values.service,
                        title: values.title
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
                            <TextareaAutosize placeholder='Text' style={{width: '100%'}} className={c.inp} minRows={5} maxRows={15} name='description' value={values.description} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        <div className={c.inp_con}>
                            <input className={c.inp} placeholder='Service' type="text" name='service' value={values.service} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        <button className={c.btn} type='submit'>Send</button>
                    </form>
                </div>
            </div>
        )
    )
}

export default OfferPopup

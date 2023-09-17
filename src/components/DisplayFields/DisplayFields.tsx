import { FC } from 'react'
import useDisplayFieldsStore from '../../stores/useDisplayFieldsStore'
import c from './DisplayFields.module.scss'
import useAuthStore from '../../stores/useAuthStore'
import { useFormik } from 'formik'
import { useMutation } from '@apollo/client'
import { UPDATE_DISPLAY_FIELDS, updateDisaplyFieldsInput, updateDisaplyFieldsResponse } from '../../graphql/updateDisplayFields'
import { successAlert } from '../../utils/alerts'


const DisplayFields: FC = (props) => {

    const isOpened = useDisplayFieldsStore((state) => state.isOpened)
    const setIsOpened = useDisplayFieldsStore((state) => state.setIsOpened)
    const userData = useAuthStore((state) => state.userData)
    const setUserData = useAuthStore((state) => state.setUserData)
    const fields = useAuthStore((state) => state.userData.displayFields)
    const [updateFields] = useMutation<updateDisaplyFieldsResponse, updateDisaplyFieldsInput>(UPDATE_DISPLAY_FIELDS)

    const { values, setFieldValue, handleSubmit } = useFormik({
        initialValues: {
            description: fields.includes('description'),
            location: fields.includes('location'),
            contactInfo: fields.includes('contactInfo'),
            email: fields.includes('email'),
            yachtRoute: fields.includes('yachtRoute'),
            services: fields.includes('services'),
            imagesURL: fields.includes('imagesURL'),
        },
        onSubmit: async (values) => {
            const displayFields = []

            for (const field in values) {
                if (values[field]) {
                    displayFields.push(field)
                }
            }
            displayFields.push('userName', 'avatarURL')

            updateFields({
                variables: {
                    updateDisplayFieldsInput: {
                        displayFields
                    }
                }
            }).then(({ data }) => {
                successAlert('Fields updated!')
                setIsOpened(false)
                setUserData({ ...userData, displayFields: data.updateDisplayFields.displayFields })
            })
        }
    })

    return isOpened && <div className={c.main} onClick={() => setIsOpened(false)}>
        <form onSubmit={handleSubmit} className={c.menu} onClick={(e) => e.stopPropagation()}>
            <span className={c.btn}>Display information</span>
            <div className={c.input_con}>
                <label htmlFor='description' className={c.label}>Description</label>
                <input id='description' name='description' type='checkbox' onChange={(e) => setFieldValue('description', e.target.checked)} checked={values.description} />
            </div>
            <div className={c.input_con}>
                <label htmlFor='location' className={c.label}>Location</label>
                <input id='location' name='location' type='checkbox' onChange={(e) => setFieldValue('location', e.target.checked)} checked={values.location} />
            </div>
            <div className={c.input_con}>
                <label htmlFor='contactInfo' className={c.label}>Contact Information</label>
                <input id='contactInfo' name='contactInfo' type='checkbox' onChange={(e) => setFieldValue('contactInfo', e.target.checked)} checked={values.contactInfo} />
            </div>
            <div className={c.input_con}>
                <label htmlFor='email' className={c.label}>Email</label>
                <input id='email' name='email' type='checkbox' onChange={(e) => setFieldValue('email', e.target.checked)} checked={values.email} />
            </div>
            <div className={c.input_con}>
                <label htmlFor='yachtRoute' className={c.label}>Yacht Route</label>
                <input id='yachtRoute' name='yachtRoute' type='checkbox' onChange={(e) => setFieldValue('yachtRoute', e.target.checked)} checked={values.yachtRoute} />
            </div>
            <div className={c.input_con}>
                <label htmlFor='services' className={c.label}>Services</label>
                <input id='services' name='services' type='checkbox' onChange={(e) => setFieldValue('services', e.target.checked)} checked={values.services} />
            </div>
            <div className={c.input_con}>
                <label htmlFor='imagesURL' className={c.label}>Images</label>
                <input id='imagesURL' name='imagesURL' type='checkbox' onChange={(e) => setFieldValue('imagesURL', e.target.checked)} checked={values.imagesURL} />
            </div>
            <button className={c.submit} type='submit'>Save</button>
        </form>
    </div>
}


export const DisplayFieldsButton: FC = () => {

    const setIsOpened = useDisplayFieldsStore((state) => state.setIsOpened)

    return <button className={c.btn} onClick={() => setIsOpened(true)}>
        Display information
    </button>
}

export default DisplayFields
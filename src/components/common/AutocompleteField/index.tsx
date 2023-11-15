'use client'
import { FC, ReactNode, ChangeEvent, useState, useRef } from 'react'

import { DropDown } from '../DropDown'
import usePlacesAutocomplete from 'use-places-autocomplete'

import { getGeocode, getLatLng } from 'use-places-autocomplete'

import s from './AutocompleteField.module.scss'

interface CitiesDropdownProps {
  name: string;
  label: string;
  placeholder: string;
  seacrhItem: string;
  onSelect: (value: string) => void;
  changeInput: any
  error: boolean;
  setError: (state: boolean) => void;
  icon: ReactNode;
  className?: string;
  searchKeys: string[]; // zip codes ['post_office', 'postal_code', 'post_box']
  type?: string;
}

export const AutocompleteField: FC<CitiesDropdownProps> = ({ changeInput, error, setError, className, seacrhItem, onSelect, name, label, placeholder, icon, searchKeys, type = 'text' }) => {
  const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
    // callbackName: "YOUR_CALLBACK_NAME",
    requestOptions: {
      types: searchKeys
    },
    debounce: 300
  })

  const parentRef = useRef<HTMLDivElement | null>(null)
  const [openDropdown, setOpenDropdown] = useState(false)

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    changeInput(e.target.value)
    setValue(e.target.value)
    setOpenDropdown(true)
    setError(false)

    console.log(data)
  }

  const handleChooseCity = (city: any) => {
    console.log(city)
    getGeocode({ address: city.description }).then((results) => {
      const { lat, lng } = getLatLng(results[0])


    })
    //@ts-ignore
    // eslint-disable-next-line
    const { structured_formatting: { main_text, secondary_text } } = city
    // eslint-disable-next-line
    onSelect(`${main_text}, ${secondary_text}`)
    setOpenDropdown(false)
    setError(false)
  }

  const classNames = `${s.autocompleteField} ${className ? className : ''} ${error ? s.autocompleteField_invalid : ''}`.trim()

  return (
    <div className={classNames} ref={parentRef}>
      <label className={s.autocompleteField_label} htmlFor={name}>
        {label}
      </label>
      <div className={s.autocompleteField_wrapper}>
        <i className={s.autocompleteField_icon}>{icon}</i>
        <input onChange={handleChangeInput} onClick={() => setOpenDropdown(!openDropdown)} className={s.autocompleteField_input} placeholder={placeholder} value={seacrhItem} name={name} type={type}/>
      </div>
      <DropDown parent={parentRef} isOpen={openDropdown} onClickOutside={setOpenDropdown} className={s.autocompleteField_dropdown} transition={0} >
        {status === 'OK' && (
          <ul className={s.autocompleteField_list}>
            {data.map((suggestion, index) => {
              // eslint-disable-next-line
              const { place_id, structured_formatting: { main_text, secondary_text } } = suggestion

              return (
                <li key={index}>
                  <button
                    className={s.autocompleteField_btn}
                    onClick={() =>
                      handleChooseCity(suggestion)
                    }
                    type='button'
                  >
                    {/* eslint-disable-next-line*/}
                    <span>{main_text},</span>
                    {/* eslint-disable-next-line*/}
                    <span>{secondary_text}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </DropDown>
    </div>
  )
}

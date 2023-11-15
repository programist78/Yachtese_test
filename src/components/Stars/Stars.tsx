import React, { Dispatch, SetStateAction, useState } from 'react'

export interface Props {
    filled:number
    setFilled?: Dispatch<SetStateAction<number>>
}

const Stars: React.FC<Props> = ({ filled, setFilled }) => {

    const [showed, setShowed] = useState(filled)

    return <div>
        <svg style={setFilled ? { cursor: 'pointer' } : {}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                onMouseEnter={() => setFilled && setShowed(1)}
                onMouseLeave={() => setFilled && setShowed(filled)}
                onClick={() => setFilled && setFilled(1)}>
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#FBE30A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={showed >= 1 ? (filled >= 1 ? '#d4c011' : '#c9b604') : 'none'}/>
        </svg>
        <svg style={setFilled ? { cursor: 'pointer' } : {}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                onMouseEnter={() => setFilled && setShowed(2)}
                onMouseLeave={() => setFilled && setShowed(filled)}
                onClick={() => setFilled && setFilled(2)}>
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#FBE30A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={showed >= 2 ? (filled >= 2 ? '#d4c011' : '#c9b604') : 'none'}/>
        </svg>
        <svg style={setFilled ? { cursor: 'pointer' } : {}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                onMouseEnter={() => setFilled && setShowed(3)}
                onMouseLeave={() => setFilled && setShowed(filled)}
                onClick={() => setFilled && setFilled(3)}>
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#FBE30A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={showed >= 3 ? (filled >= 3 ? '#d4c011' : '#c9b604') : 'none'}/>
        </svg>
        <svg style={setFilled ? { cursor: 'pointer' } : {}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                onMouseEnter={() => setFilled && setShowed(4)}
                onMouseLeave={() => setFilled && setShowed(filled)}
                onClick={() => setFilled && setFilled(4)}>
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#FBE30A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={showed >= 4 ? (filled >= 4 ? '#d4c011' : '#c9b604') : 'none'}/>
        </svg>
        <svg style={setFilled ? { cursor: 'pointer' } : {}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                onMouseEnter={() => setFilled && setShowed(5)}
                onMouseLeave={() => setFilled && setShowed(filled)}
                onClick={() => setFilled && setFilled(5)}>
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#FBE30A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={showed >= 5 ? (filled >= 5 ? '#d4c011' : '#c9b604') : 'none'}/>
        </svg>
    </div>
}


export default Stars

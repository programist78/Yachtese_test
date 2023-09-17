interface locationType {
    lat: string | number
    lon: string | number
}

const getLocalTime = async (location: locationType) => {
    const timestamp = Math.floor(Date.now() / 1000)

    const res = await fetch(
        `https://maps.googleapis.com/maps/api/timezone/json?location=${location.lat},${location.lon}&timestamp=${timestamp}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`,
    )

    const data = await res.json()

    if (data.status === 'OK') {
        const localTimeInMillis =
            (timestamp + data.rawOffset + data.dstOffset) * 1000

        return new Date(localTimeInMillis).toLocaleString('en-US', {
            timeZone: 'UTC',
        })
    }

    return null
}

export const formatLocalTime = (location: string, date: Date) => {

    const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    })

    return `${location} - ${formattedDate}`
}

export default getLocalTime

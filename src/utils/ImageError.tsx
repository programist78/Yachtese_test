import React from 'react'

interface Props {
  src: string
  alt: string
  className?: string
  onClick?: () => any
}

const ImageError: React.FC<Props> = ({ alt, src, className, onClick }) => {
  return <img onClick={onClick} style={{ objectFit: 'cover' }} className={className} title={alt} src={src ? src : process.env.NEXT_PUBLIC_AVATAR_ERROR} alt={alt} onError={(e) => e.currentTarget.src = process.env.NEXT_PUBLIC_AVATAR_ERROR} />
}

export default ImageError

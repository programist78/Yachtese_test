export const isImageFileName = (fileName: string) => {
    const imageExtensions = /\.(jpg|jpeg|png|gif|tiff|bmp|webp)$/i

    return imageExtensions.test(fileName)
}
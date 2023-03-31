import mime from 'mime-types'
export const isImg = (ext: string) => {
    const type = mime.lookup(ext)
    return type && /^audio\//.test(type);
}

export const isVideo = (ext: string) => {
    const type = mime.lookup(ext)
    return type && /^video\//.test(type);
}
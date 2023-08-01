import React, { ChangeEvent, useRef, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import { IoClose } from 'react-icons/io5'
import { FaCloudUploadAlt } from 'react-icons/fa'
import getCropImage from '../../utils/getCropImage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import authServices from '../../services/axiosBackend/auth/auth.services'
import { AuthState } from '../../context/auth/auth.context'
import { useRotatingLoader } from '../../context/RotatingLoader/RotatingLoader.context'
import blobToFile from '../../utils/blobToFile'
interface Props {
    onClose?: () => void,
    onSave?: () => void,
    auth: AuthState
}

const AvatarEdit = ({ onClose, onSave, auth }: Props) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [src, setSrc] = useState<string>()
    const [croppedBlob, setCroppedBlob] = useState<Blob>()
    const avatarInputRef = useRef<HTMLInputElement>(null)
    const queryClient = useQueryClient()
    const rotatingLoader = useRotatingLoader()
    const { mutate, isLoading } = useMutation({
        mutationFn: (form: FormData) => authServices.changeAvatar(form),
        onSuccess(data, variables, context) {
            queryClient.setQueryData(["profile"], data)
            auth.setProfile(data.data)
            rotatingLoader?.hiddenLoader()
            if (onClose) {
                onClose()
            }
        },
        onError(error, variables, context) {
            rotatingLoader?.hiddenLoader()
            console.log(error)
        },
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0]
        if (!file) return
        setSrc(URL.createObjectURL(file))
    }
    const handleCancel = () => {
        if (!src) return
        URL.revokeObjectURL(src)
        setSrc(undefined)
    }

    const handleClose = () => {
        handleCancel()
        if (onClose) {
            onClose()
        }
    }

    const onCropComplete = async (area: Area, areaPixel: Area) => {
        try {
            const blobImg: Blob = await getCropImage(src || '', areaPixel)
            setCroppedBlob(blobImg)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChangeAvatar = () => {
        if (!croppedBlob) return
        rotatingLoader?.showLoader()
        const file = blobToFile(croppedBlob, `avatar-${new Date().getTime()}.jpeg`)
        const form = new FormData()
        form.append("avatar", file)
        mutate(form)

    }
    return (
        <div className='rounded px-4 overflow-hidden fixed z-[3] bg-[#242526] top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'>
            <div className='py-2 border-b relative justify-center border-white/10 mb-4 text-center font-semibold text-xl text-[#e4e6eb]'>
                Update profile picture
                <button className='absolute top-2/4 right-0 -translate-y-2/4 text-2xl
                 text-white/50 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 transition-all'
                    onClick={handleClose}><IoClose /></button>
            </div>
            <div className='w-[290px] h-[260px] sm:w-[400px] relative cursor-pointer'>
                {
                    !src ? (
                        <form action='#'
                            className='w-full h-full bg-[#242526] flex items-center
                                     justify-center flex-col text-[#e4e6eb] border border-dashed border-[#e4e6eb]
                                     font-medium text-xl'
                            onClick={() => avatarInputRef.current?.click()}
                        >
                            <input ref={avatarInputRef} id='avatar-input' type="file" accept='/image/*' className='hidden' onChange={handleChange} />
                            <div className='text-[40px]'><FaCloudUploadAlt /></div>
                            <div>Choose a file</div>
                        </form>
                    ) : (
                        <Cropper
                            image={src}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                            cropShape='round'
                        />
                    )
                }

            </div>

            <div className='p-2 flex justify-end gap-2 border-white/10 mt-4 border-t'>
                <button className='transition-all duration-200 hover:bg-[#3a3b3c] px-2
                  text-sm font-medium py-1 text-[#4599ff] rounded'
                    onClick={handleCancel}>Cancel</button>
                <button
                    onClick={handleChangeAvatar}
                    className='transition-all duration-200 hover:bg-[#4599ff]
                 px-4 py-1 text-sm font-medium bg-[#3982e4] text-white rounded disabled:opacity-80'
                    disabled={isLoading}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default AvatarEdit


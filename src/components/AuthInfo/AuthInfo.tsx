import React, { useState } from 'react'
import { AuthState } from '../../context/auth/auth.context'
import { MdSwitchAccount } from 'react-icons/md'
import { BiEditAlt } from 'react-icons/bi'
import { IoIosCamera } from 'react-icons/io'
import EditName from '../EditName/EditName'
import ChangePassword from '../ChangePassword/ChangePassword'
import AvatarEdit from '../../pages/Profile/AvatarEdit'
import authServices from '../../services/axiosBackend/auth/auth.services'
import { useQuery } from '@tanstack/react-query'

interface Props {
    auth: AuthState
}

const AuthInfo = ({ auth }: Props) => {
    const [editName, setEditName] = useState(false)
    const [isChangePassword, setIsChangePassword] = useState(false)
    const [showEditAvatar, setShowEditAvatar] = useState(false)

    useQuery({
        queryKey: ["profile"],
        queryFn: () => authServices.getProfile(),
        enabled: auth !== null && auth.isLogged,
        onSuccess(data) {
            auth?.setProfile(data.data)
        },
    })

    const handleClickEditName = () => {
        setEditName(true)
        if (isChangePassword) {
            setIsChangePassword(false)
        }
    }

    const handleClickChangePassword = () => {
        setIsChangePassword(true)
        if (editName) {
            setEditName(false)
        }
    }
    const closeEditName = () => {
        setEditName(false)
    }
    const closeChangePassword = () => {
        setIsChangePassword(false)
    }

    return (
        <div className='flex gap-x-4 flex-col md:flex-row items-center'>
            <div className='text-center md:w-1/4  md:border-r md:border-white/10 flex justify-center items-center flex-col'>
                <div className='relative'>
                    <img key={auth.authProfile?.avatar_url} className='rounded-full w-24 h-24 object-cover border-2 border-light-gray ' src={auth.authProfile?.avatar_url} alt="avatar" />
                    <button className='absolute right-0 rounded-full flex items-center justify-center h-7 w-7
                                                     bg-[#242526] hover:bg-[#4e4f50] transition-all duration-200 
                                                      -translate-y-full z-[2] text-white'
                        onClick={() => setShowEditAvatar(true)}>
                        <IoIosCamera />
                    </button>
                </div>
                <div className='text-white mt-2'>{auth.authProfile?.first_name} {auth.authProfile?.last_name}</div>
                <div className='text-light-gray'>{auth.authProfile?.email}</div>
            </div>
            <div className='w-full mt-4 md:mt-0 md:w-3/4 text-white'>
                <div className='font-medium text-xl sm:text-2xl py-2 border-b border-white/10'>Profile settings</div>
                <div className='py-2'>
                    {
                        !editName ? (
                            <div className='flex items-center py-1 px-2 cursor-pointer hover:bg-[rgba(255,255,255,0.05)] group/edit' onClick={handleClickEditName}>
                                <div className='w-1/3 xs:w-1/4'>Name</div>
                                <div className='w-2/3 xs:w-3/4 flex'>
                                    <span className='text-light-gray'>{auth.authProfile?.first_name} {auth.authProfile?.last_name}</span>
                                    <span className='ml-auto text-[#54a2ff] font-light flex items-start gap-1 group-hover/edit:underline'><BiEditAlt className='hidden group-hover/edit:block' size={20} /> Edit</span>
                                </div>
                            </div>
                        ) : (
                            <EditName onCancel={closeEditName} onUpdateSuccess={closeEditName} />
                        )
                    }
                    <div className='mt-2 w-full h-[1px] bg-[rgba(255,255,255,0.05)]'></div>

                    {
                        !isChangePassword ? (
                            <div
                                className='mt-2 flex items-center py-1 px-2 cursor-pointer hover:bg-[rgba(255,255,255,0.05)] group/edit'
                                onClick={handleClickChangePassword}>
                                <div className='w-1/3 xs:w-1/4'>Password</div>
                                <div className='w-2/3 xs:w-3/4 flex'>
                                    <span className='text-light-gray'>{'*'.repeat(9)}</span>
                                    <span className='ml-auto text-[#54a2ff] font-light flex items-start gap-1 group-hover/edit:underline'><BiEditAlt className='hidden group-hover/edit:block' size={20} /> Edit</span>
                                </div>
                            </div>
                        ) : (
                            <ChangePassword onCancel={closeChangePassword} onChangeSuccess={closeChangePassword} />
                        )
                    }
                    <div className='mt-2 w-full h-[1px] bg-white/10'></div>
                </div>
            </div>
            {auth?.isLogged && showEditAvatar && <AvatarEdit auth={auth} onClose={() => setShowEditAvatar(false)} />}
        </div>
    )
}

export default AuthInfo
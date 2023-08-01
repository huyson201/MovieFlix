import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { BsCaretDownFill } from 'react-icons/bs'
import { FaUserAlt } from 'react-icons/fa'
import { MdOutlineFavorite } from 'react-icons/md'
import { Link } from 'react-router-dom'
import authServices from '../../services/axiosBackend/auth/auth.services'
import { useAuth } from '../../context/auth/auth.context'

type Props = {
    avatar_url: string,
    user_name: string
}

const UserDropdown = (props: Props) => {
    const [showDrop, setShowDrop] = useState(false)
    const dropRef = React.useRef<HTMLDivElement>(null)
    const auth = useAuth()

    useEffect(() => {

        const handleClickOutside = (event: any) => {
            if (dropRef.current && dropRef.current.contains(event.target)) return
            setShowDrop(false)
        }

        document.addEventListener("click", handleClickOutside)
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [])

    const handleToggleDrop = () => {
        setShowDrop(prev => !prev)
    }

    const handleLogout = async () => {
        try {
            await authServices.logout()
            auth?.logout()

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={classNames('relative ml-2 xs:ml-4 group text-white', { active: showDrop })} >
            <div className='flex items-center  gap-1  cursor-pointer' onClick={handleToggleDrop} ref={dropRef}>
                <div className='w-9 h-9'>
                    <img className='w-full h-full rounded-full object-cover' src={props.avatar_url} alt={props.user_name + '_avatar'} />
                </div>
                <div className='font-light hidden md:block'>
                    {props.user_name}
                </div>
                <div><BsCaretDownFill className='text-sm' /></div>
            </div>
            <div className='absolute min-w-[120px] top-0 opacity-0 invisible right-0 transition-all duration-300
                         bg-black/80 py-1 rounded-md shadow-[0px_-1px_4px_1px_rgba(255,255,255,0.1)]
                         group-[.active]:top-[calc(100%_+_4px)] group-[.active]:opacity-100 group-[.active]:visible'>
                <Link to={"/profile"} className='flex items-center gap-2 text-sm px-2 py-1 hover:opacity-50 border-b border-b-white/10 transition-all duration-300'>
                    <FaUserAlt className='text-base' />
                    Profile
                </Link>
                <Link to={"/favorites"} className='flex items-center gap-2 text-sm px-2 py-1 hover:opacity-50 border-b border-b-white/10 transition-all duration-300'>
                    <MdOutlineFavorite className='text-base' />
                    Favorites
                </Link>
                <Link to={"#"} className='flex items-center gap-1 text-sm px-2 py-1 hover:opacity-50 transition-all duration-300' onClick={handleLogout}>
                    <AiOutlineLogout className='text-base' />
                    Logout
                </Link>
            </div>
        </div>
    )
}

export default UserDropdown
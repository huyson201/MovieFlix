
import React from 'react'
import { MdVideoLibrary, MdSwitchAccount } from 'react-icons/md'
import SignInButton from '../SignInButton/SignInButton'
type Props = {
    content?: any
}

const RequireAuth = (props: Props) => {
    return (
        <div className='text-white flex flex-col items-center justify-center
         py-6 xs:py-12'>
            {props.content}
            <SignInButton className='mt-4 px-2 py-1' />
        </div>
    )
}

interface RequireAuthContentProps {
    icon: React.ReactNode,
    title: string,
    description: string
}

export const RequireAuthContent = ({ icon, title, description }: RequireAuthContentProps) => {
    return (
        <>
            <div className='text-[80px] xs:text-[100px]'>
                {icon}
            </div>
            <h1 className='font-medium text-xl'>{title}</h1>
            <p className='text-sm mt-2 text-center'>{description}</p>
        </>
    )
}


export default RequireAuth
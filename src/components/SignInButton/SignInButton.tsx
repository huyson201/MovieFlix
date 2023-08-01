
import classNames from 'classnames'
import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import withForm from '../../HOC/withForm'
import { FormContextType } from '../../context/form/form.context'

type Props = {
    className?: string,
    textClass?: string,
    iconClass?: string,
}

const SignInButton = ({ className, textClass, iconClass, form }: Props & { form: FormContextType | null }) => {
    const handleClickSignIn = () => {
        form?.requestOpenForm()
    }

    return (
        <button className={classNames(`flex text-white hover:text-dark-teal hover:border-dark-teal
         transition-all duration-300 ease-in-out items-center  rounded-3xl 
         border border-white/50 gap-1`, className)} onClick={handleClickSignIn}>
            <FaUserCircle className={classNames('text-2xl', iconClass)} />
            <span className={classNames(textClass)}>Sign in</span>
        </button>
    )
}

export default withForm(SignInButton)
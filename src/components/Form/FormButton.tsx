
import classNames from 'classnames'
import React from 'react'

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    buttonTitle?: string,
}

const FormButton = ({ buttonTitle = 'Button', className, ...props }: FormButtonProps) => {
    return (
        <button className={classNames(`text-white block bg-dark-teal rounded-xl 
        w-full py-1 mt-4 font-medium uppercase hover:opacity-80 transition-opacity duration-300`)} {...props}>
            {buttonTitle}
        </button>
    )
}

export default FormButton
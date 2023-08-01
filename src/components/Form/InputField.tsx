

import classNames from 'classnames'
import React, { forwardRef, useId } from 'react'
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    containerClass?: string,
    fieldTitle: string,
    isError?: boolean
    feedbackError?: string
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({ fieldTitle, feedbackError, isError, containerClass, className, id, ...props }, ref) => {
    const inputId = useId()
    return (
        <div className={classNames(containerClass)}>
            <label className='block capitalize text-dark-teal' htmlFor={inputId}>{fieldTitle}<span className='text-red-500 ml-1'>*</span></label>
            <input {...props} ref={ref} className={classNames(`bg-transparent w-full
            border-b-dark-teal border-b outline-none rounded py-1
            text-white mt-0.5 text-sm pb-1 [&.error]:border-b-red-600`, { error: isError })} id={classNames(id, inputId)} />
            {feedbackError && <div className='text-red-600 text-xs mt-2'>{feedbackError}</div>}
        </div>
    )
})

export default InputField
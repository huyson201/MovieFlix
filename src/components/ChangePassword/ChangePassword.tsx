
import React, { useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import authServices from '../../services/axiosBackend/auth/auth.services'
import axios from 'axios'
import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { ThreeDots } from 'react-loader-spinner'
interface Props {
    onCancel?: () => void,
    onChangeSuccess?: () => void
}

const schema = yup.object({
    old_password: yup.string().required("Current password is a required field").min(6, "Current password must be at least 6 characters"),
    new_password: yup.string().required("New password is a required field").min(6, "New password must be at least 6 characters"),
    retype_new: yup.string().required("Retype new password is a required field")
        .oneOf([yup.ref('new_password')], 'Retype passwords must match')
})

const ChangePassword = ({ onCancel, onChangeSuccess }: Props) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: "onBlur",
        reValidateMode: "onChange"
    })
    const [errorMessage, setErrorMessage] = useState('')

    const { mutate, isLoading } = useMutation({
        mutationFn: (data: { old_password: string, new_password: string }) => {
            return authServices.changePassword(data)
        },
        onSuccess(data, variables, context) {
            if (onChangeSuccess) {
                onChangeSuccess()
            }
        },
        onError(error, variables, context) {
            if (axios.isAxiosError(error)) {
                const parseError = error as AxiosError<{ message: string }>
                setErrorMessage(parseError.response?.data.message || '')
                return
            }
            console.log(error)
        },
    })
    const submitForm = handleSubmit(async (data) => {
        mutate({ old_password: data.old_password, new_password: data.new_password })

    })
    return (
        <div className='py-1 px-2 bg-[rgba(255,255,255,0.05)]'>
            <div className='w-1/3 xs:w-1/4'>Password</div>
            <form className='flex items-center justify-center flex-col' action='#' onSubmit={submitForm}>
                <div className='flex items-center gap-2 w-full'>
                    <label htmlFor='current-edit' className='w-[40%] text-right inline-block font-medium' >Current</label>
                    <input type="password" id='current-edit'
                        className='bg-black border-white/30 text-sm py-1 border outline-none px-2 rounded'
                        {...register("old_password")} />
                </div>
                <div className='flex items-center gap-2 w-full mt-2'>
                    <label htmlFor='new-edit' className='w-[40%] text-right inline-block font-medium' >New</label>
                    <input type="password" id='first_name-edit'
                        className='bg-black border-white/30 text-sm py-1 border outline-none px-2 rounded'
                        {...register('new_password')}
                    />
                </div>
                <div className='flex items-center gap-2 w-full my-2'>
                    <label htmlFor='retype-edit' className='w-[40%] text-right inline-block font-medium' >Retype new</label>
                    <input type="password" id='retype-edit'
                        className='bg-black border-white/30 text-sm py-1 border outline-none px-2 rounded'
                        {...register("retype_new")}
                    />
                </div>
                {errors.old_password && <div className='text-sm text-red-600'>{errors.old_password.message}</div>}
                {errors.new_password && <div className='text-sm text-red-600'>{errors.new_password.message}</div>}
                {errors.retype_new && <div className='text-sm text-red-600'>{errors.retype_new.message}</div>}
                {errorMessage !== '' && <div className='text-sm text-red-600'>{errorMessage}</div>}

                <div className='xs:w-[420px] mt-6 pb-1 flex items-center'>
                    <button
                        className='text-sm bg-dark-teal text-white rounded px-2 py-1
                 hover:bg-dark-teal/80 transition-opacity'
                        type='submit'>
                        Save changes
                    </button>
                    <button
                        className='text-sm ml-2 bg-black text-white border border-white/30
                 px-2 py-1 rounded hover:bg-black/50 transition-opacity'
                        onClick={onCancel}>
                        Cancel
                    </button>
                    {isLoading && <ThreeDots color='#00acc1' wrapperClass='ml-2' width={30} height={30} />}

                </div>
            </form>

        </div>
    )
}

export default ChangePassword
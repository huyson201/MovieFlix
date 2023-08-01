
import React, { useState } from 'react'
import withAuth from '../../HOC/withAuth'
import { AuthState } from '../../context/auth/auth.context'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import authServices from '../../services/axiosBackend/auth/auth.services'
import axios, { AxiosError } from 'axios'
import { ThreeDots } from 'react-loader-spinner'

interface Props {
    onCancel?: () => void,
    onUpdateSuccess?: () => void
}
const schema = yup.object({
    first_name: yup.string().required(),
    last_name: yup.string().required()
})

const EditName = ({ auth, onCancel, onUpdateSuccess }: Props & { auth: AuthState | null }) => {
    const { handleSubmit, formState: { errors }, register } = useForm({
        resolver: yupResolver(schema),
        mode: "onBlur",
        reValidateMode: "onChange"
    })
    const [errorMessage, setErrorMessage] = useState('')
    const queryClient = useQueryClient()


    const updateNameMutation = useMutation({
        mutationFn: (data: { first_name: string, last_name: string }) => authServices.updateName(data),
        onSuccess(data, variables, context) {
            queryClient.setQueryData(["profile"], data)
            auth?.setProfile(data.data)
            if (onUpdateSuccess) {
                onUpdateSuccess()
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

    const submitForm = handleSubmit((data) => {
        updateNameMutation.mutate(data)
    })

    return (
        <div className='py-1 px-2 bg-[rgba(255,255,255,0.05)]'>
            <div className='w-1/3 xs:w-1/4'>Name</div>
            <form className='flex items-center justify-center flex-col' action='#' onSubmit={submitForm}>
                <div className='flex items-center gap-2'>
                    <label htmlFor='first_name-edit' className='font-medium' >First name</label>
                    <div>
                        <input type="text" id='first_name-edit'
                            className='bg-black border-white/30 text-sm py-1 border outline-none px-2 rounded'
                            defaultValue={auth?.authProfile?.first_name} {...register("first_name")} />
                    </div>
                </div>
                <div className='flex items-center gap-2 mt-2'>
                    <label htmlFor='first_name-edit' className='font-medium' >Last name</label>
                    <input type="text" id='first_name-edit'
                        className='bg-black border-white/30 text-sm py-1 border outline-none px-2 rounded'
                        defaultValue={auth?.authProfile?.last_name} {...register("last_name")} />
                </div>
                <div className='mt-2'>
                    {errors.first_name && <div className='text-sm text-red-600'>{errors.first_name.message}</div>}
                    {errors.last_name && <div className='text-sm text-red-600'>{errors.last_name.message}</div>}
                    {errorMessage !== '' && <div className='text-sm text-red-600'>{errorMessage}</div>}
                </div>
                <div className='xs:w-[420px] mt-6 pb-1 flex items-center'>
                    <button
                        className='text-sm cursor-pointer bg-dark-teal text-white rounded px-2 py-1
                     hover:bg-dark-teal/80 transition-opacity disabled:opacity-70'
                        disabled={updateNameMutation.isLoading}>
                        Save changes
                    </button>
                    <button
                        className='text-sm cursor-pointer ml-2 bg-black text-white border border-white/30
                     px-2 py-1 rounded hover:bg-black/50 transition-opacity'
                        onClick={onCancel}>
                        Cancel
                    </button>
                    {updateNameMutation.isLoading && <ThreeDots color='#00acc1' wrapperClass='ml-2' width={30} height={30} />}
                </div>
            </form>

        </div>
    )
}

export default withAuth(EditName)
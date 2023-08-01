import React, { useState } from 'react'
import FormButton from './FormButton'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputField from './InputField'
import { AxiosError } from 'axios'
import SpinLoader from '../SpinLoader/SpinLoader'
import authServices from '../../services/axiosBackend/auth/auth.services'
import { useAuth } from '../../context/auth/auth.context'
import { useForm as useFormState } from '../../context/form/form.context'
interface RegisterFormProps {
    onClickLoginLink?: () => void
}

const schema = yup.object({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
    confirm_password: yup.string().required()
        .oneOf([yup.ref('password')], 'Passwords must match')
})

const RegisterForm = ({ onClickLoginLink }: RegisterFormProps) => {
    const [errorMessage, setErrorMessage] = useState('')
    const [isPending, setIsPending] = useState(false)
    const auth = useAuth()
    const formState = useFormState()
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onBlur',
        reValidateMode: 'onBlur'
    })

    const onSubmit = handleSubmit(async data => {
        setErrorMessage('')
        setIsPending(true)
        try {
            const res = await authServices.signUp(data)
            auth?.signIn(res.data)
            console.log(res.data)
            formState?.requestCloseForm()
        } catch (error) {
            if (error instanceof AxiosError) {
                const axiosError = (error as AxiosError)
                if (axiosError.response && axiosError.response.status !== 500) {
                    setErrorMessage(error.response?.data.message)
                }
            }
        }
        finally {
            setIsPending(false)
        }
    })

    return (
        <form action='#' className='w-full' onSubmit={onSubmit}>
            <div className='flex items-center gap-4'>
                <InputField {...register('first_name')} isError={errors.first_name !== undefined} feedbackError={errors.first_name?.message} type='text' fieldTitle='First Name' placeholder='First name' containerClass='w-2/4' />
                <InputField {...register('last_name')} isError={errors.last_name !== undefined} feedbackError={errors.last_name?.message} type='text' fieldTitle='Last Name' placeholder='Last name' containerClass='w-2/4' />
            </div>
            <InputField {...register('email')} isError={errors.email !== undefined} feedbackError={errors.email?.message} type='text' fieldTitle='email' placeholder='example@gmail.com' containerClass='mt-4' />
            <InputField {...register('password')} isError={errors.password !== undefined} feedbackError={errors.password?.message} type='password' fieldTitle='password' placeholder='Enter your password...' containerClass='mt-4' />
            <InputField {...register('confirm_password')} isError={errors.confirm_password !== undefined} feedbackError={errors.confirm_password?.message} type='password' fieldTitle='Confirm password' placeholder='Re-enter your password...' containerClass='mt-4' />
            {errorMessage !== '' && <div className='text-red-600 text-xs my-2 rounded-sm'>{errorMessage}</div>}
            {isPending ? <SpinLoader className='mt-4' /> : <FormButton buttonTitle='sign up' type='submit' />}
            <div className='text-white text-center text-sm mt-4'>Already have an account? <button onClick={onClickLoginLink} className='text-dark-teal'>Login</button></div>
        </form>
    )
}

export default RegisterForm
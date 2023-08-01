import React, { useState } from 'react'
import InputField from './InputField'
import FormButton from './FormButton'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import authServices from '../../services/axiosBackend/auth/auth.services'
import SpinLoader from '../SpinLoader/SpinLoader'
import { AxiosError } from 'axios'
import { AuthState, useAuth } from '../../context/auth/auth.context'
import { FormContextType, useForm as useFormState } from '../../context/form/form.context'
import withForm from '../../HOC/withForm'
import withAuth from '../../HOC/withAuth'

interface LoginFormProps {
    onClickCreateAccount?: () => void,
    form: FormContextType | null
}

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(6)
})

const LoginForm = ({ onClickCreateAccount, form, auth }: LoginFormProps & { auth: AuthState | null }) => {
    const [isPending, setIsPending] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onBlur',
        reValidateMode: 'onBlur'
    })

    const onSubmit = handleSubmit(async (data) => {
        setErrorMessage('')
        setIsPending(true)
        try {
            const response = await authServices.signIn(data)
            auth?.signIn(response.data)
            form?.requestCloseForm()

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
            <InputField type='text' fieldTitle='email' placeholder='example@gmail.com' {...register('email')} feedbackError={errors.email?.message} isError={errors.email !== undefined} />
            <InputField type='password' fieldTitle='password' placeholder='Enter your password...' containerClass='mt-4' {...register('password')} feedbackError={errors.password?.message} isError={errors.password !== undefined} />
            {errorMessage !== '' && <div className='text-red-600 text-xs my-2 rounded-sm'>{errorMessage}</div>}

            {isPending ? <SpinLoader className='mt-4' /> : <FormButton buttonTitle='Login' type='submit' />}
            <div className='text-white text-center text-sm mt-4'>Not registered? <button className='text-dark-teal' onClick={onClickCreateAccount}>Create an account</button></div>
        </form>
    )
}

export default withAuth(LoginForm)
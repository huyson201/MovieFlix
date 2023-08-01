import React from 'react'
import classNames from 'classnames'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { IoClose } from 'react-icons/io5'
import { FormContextType } from '../../context/form/form.context'
import withForm from '../../HOC/withForm'
export type FormType = 'login' | 'register'

interface FormProps {
}
const Form = ({ form }: FormProps & { form: FormContextType | null }) => {
    const [formType, setFormType] = React.useState<FormType>('login')

    const handleCloseForm = () => {
        form?.requestCloseForm()
    }

    React.useEffect(() => {
        if (form?.isOpen && formType === 'register') {
            setFormType('login')
        }
    }, [form?.isOpen])

    if (!form?.isOpen) return null

    return (
        <div className={classNames(`fixed top-2/4 left-2/4 z-[12] slide-animation
        w-[320px] p-4 xs:w-[400px] bg-black rounded xs:rounded-xl `, { active: form?.isOpen })}>
            <button className='absolute right-4 top-4' onClick={handleCloseForm}><IoClose size={26} color='#fff' /></button>
            <h2 className='text-center text-2xl xs:text-3xl mb-4 font-medium text-white'>Movie<span className='text-dark-teal'>Flix</span></h2>
            {formType === 'login' ? <LoginForm form={form} onClickCreateAccount={() => setFormType('register')} /> : <RegisterForm onClickLoginLink={() => setFormType('login')} />}
        </div>
    )
}

export default withForm(Form)
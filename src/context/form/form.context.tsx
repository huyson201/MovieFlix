import React, { useState } from "react"
import { useBackdrop } from "../backdrop/backdrop.context";

const FormContext = React.createContext<FormContextType | null>(null)
export const useForm = () => React.useContext(FormContext)


export interface FormContextType {
    isOpen: boolean;
    requestCloseForm: () => void;
    requestOpenForm: () => void
}

export const FormProvider = ({ children }: { children: any }) => {
    const [isOpen, setIsOpen] = useState(false)
    const backdropState = useBackdrop()

    const requestCloseForm = () => {

        setIsOpen(false)
        backdropState?.hiddenBackdrop()
    }

    const requestOpenForm = () => {
        setIsOpen(true)
        backdropState?.showBackdrop()
    }
    return (
        <FormContext.Provider value={{ isOpen, requestCloseForm, requestOpenForm }}>
            {children}
        </FormContext.Provider>
    )
}
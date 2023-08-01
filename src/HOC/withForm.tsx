import { ComponentType } from "react";
import { FormContextType, useForm } from "../context/form/form.context";

interface WithFormProps {
    form: FormContextType | null
}

function withForm<T extends object>(WrapperComponent: ComponentType<T & WithFormProps>) {
    return (props: T) => {
        const form = useForm()
        return <WrapperComponent {...props} form={form} />
    }
}


export default withForm;

import React from 'react'
import { FormProvider } from './form/form.context'
import { BackdropProvider } from './backdrop/backdrop.context'
import { AuthProvider } from './auth/auth.context'
import RotatingLoaderProvider from './RotatingLoader/RotatingLoader.context'

const ContextProvider = ({ children }: { children: any }) => {
    return (
        <>
            <BackdropProvider>
                <FormProvider>
                    <AuthProvider>
                        <RotatingLoaderProvider>
                            {children}
                        </RotatingLoaderProvider>
                    </AuthProvider>
                </FormProvider>
            </BackdropProvider>

        </>
    )
}

export default ContextProvider

import React from 'react'
import { FormProvider } from './form/form.context'
import { BackdropProvider } from './backdrop/backdrop.context'
import { AuthProvider } from './auth/auth.context'
import RotatingLoaderProvider from './RotatingLoader/RotatingLoader.context'
import VideoModalProvider from './VideoModal/VideoModal.context'

const ContextProvider = ({ children }: { children: any }) => {
    return (
        <>
            <BackdropProvider>
                <FormProvider>
                    <AuthProvider>
                        <RotatingLoaderProvider>
                            <VideoModalProvider>
                                {children}
                            </VideoModalProvider>
                        </RotatingLoaderProvider>
                    </AuthProvider>
                </FormProvider>
            </BackdropProvider>

        </>
    )
}

export default ContextProvider